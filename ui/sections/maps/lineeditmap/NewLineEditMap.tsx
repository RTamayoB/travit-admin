'use client';

import { LineSection, Stop } from "@/app/lib/definitions";
import 'mapbox-gl/dist/mapbox-gl.css';
import { FeatureCollection, LineString, Point, Position as GeoPosition, Feature } from "geojson";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MapComponent, { Layer, MapRef, MarkerDragEvent, Source } from "react-map-gl/mapbox";
import AnchorMarker from "../base/markers/anchormarker";
import { positionToGeoPosition } from "@/app/lib/utils";
import { lineString, nearestPointOnLine, point } from "@turf/turf";
import { GeoJSONSource, MapMouseEvent } from "mapbox-gl";
import Image from "next/image";
import { useLineEditor } from "./useLineEditor";
import { getGeometry } from "@/utils/mapbox/getGeometry";
import { number } from "zod";

type HoverMarker = {
  sectionId: string | number | undefined,
  properties: LineSection,
  position: GeoPosition,
  geometry: LineString
}

interface NewLineEditMapProps {
  stops: Stop[];
  initialFeatureCollection: FeatureCollection<LineString, LineSection>;
  onFeatureCollectionUpdate: (updatedFeatureCollection : FeatureCollection<LineString, LineSection>) => void;
}

function NewLineEditMap({
  stops,
  initialFeatureCollection,
  onFeatureCollectionUpdate
}: NewLineEditMapProps) {

  const stopCollection: FeatureCollection<Point> = useMemo(() => ({
    type: "FeatureCollection",
    features: stops.map((stop) => ({
      type: "Feature",
        geometry: { type: "Point", coordinates: positionToGeoPosition(stop.position) },
        properties: {
          id: stop.id,
          name: stop.name,
          description: stop.description,
          position: stop.position
        },
    })),
  }), [stops]);

  const [hoverMarker, setHoverMarker] = useState<HoverMarker | null>(null);
  const [isHoverMarkerDragged, setIsHoverMarkerDragged] = useState(false);
  const {
    featureCollection,
    addFeature,
    updateLastFeature,
    updateFeatureAtIndex,
    onUndo
  } = useLineEditor(initialFeatureCollection, onFeatureCollectionUpdate);
  

  const mapRef = useRef<MapRef | null>(null);
  const prevFeatureCollectionRef = useRef<FeatureCollection<LineString, LineSection> | null>(initialFeatureCollection)

  const [viewState, setViewState] = React.useState({
    longitude: -103.29696486553104,
    latitude: 20.682718735053065,
    zoom: 14,
  });

  const mapRefCallback = useCallback((ref: MapRef | null) => {
    if (ref !== null) {
      mapRef.current = ref;
      const map = ref;
   
      const loadImage = () => {
        if (!map.hasImage("bus-stop")) {
          map.loadImage("/icons/bus-stop.png", (error, image) => {
            if (error || !image) throw error;
              map.addImage("bus-stop", image);
            });
        }
      };
    
      loadImage();
    
      map.on("styleimagemissing", (e) => {
        const id = e.id;
        console.log(id);
        loadImage();
      });
    }
  }, []);

  useEffect(() => {
    prevFeatureCollectionRef.current = featureCollection
  }, [featureCollection])

  /** Whenever a stop  is added to the line */
  const handleStopSelected = async(stop: Stop) => {
    const lastFeature = prevFeatureCollectionRef.current?.features.at(-1);
  
    if (!lastFeature) {
      addFeature({ startStop: stop });
      return;
    }
    
    const { startStop, endStop } = lastFeature.properties;
  
    if (startStop && !endStop) {
      if (startStop.id === stop.id) return;
  
      const geometry = await getGeometry({ startStop, endStop: stop});
      if (geometry) updateLastFeature({ endStop: stop, geometry});
      return;
    }
  
    if (endStop?.id === stop.id) return;
  
    if(endStop) {
      const geometry = await getGeometry({startStop: endStop, endStop: stop})
      if (geometry) addFeature({startStop: endStop, endStop: stop, geometry });
    }
  };

  const handleOnMapClick = (event: MapMouseEvent) => {
    if (!event.features || event.features.length === 0) return;

    const feature = event.features[0];
    const clusterId = feature.properties?.cluster_id;

    if (clusterId) {
      // Clicked a cluster → Expand it
      const mapboxSource = mapRef.current?.getSource("stops") as GeoJSONSource;
  
      if (mapboxSource && "getClusterExpansionZoom" in mapboxSource) {
        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;

          const point = feature.geometry as Point
  
          if (zoom != null) {
            mapRef.current?.easeTo({
              center: [point.coordinates[0], point.coordinates[1]],
              zoom: zoom,
            });
          }
          
        });
      }
    } else {
      // Clicked an individual point
      handleStopSelected({
        id: feature.properties?.id,
        name: feature.properties?.name,
        description: feature.properties?.description,
        position: JSON.parse(feature.properties?.position)
      })
    }
  };

  /** Whenever the mouse is over our bus line */
  const handleOnMouseOver = (event: MapMouseEvent) => {
    if (!mapRef.current) return;

    if (featureCollection.features.length <= 0) return;

    const { lngLat, point } = event;

    const features = event.target.queryRenderedFeatures(point, {
      layers: ["route"],
    });

    if (features.length > 0) {
      const feature = features[0];

      setHoverMarker({
        sectionId: feature.id,
        properties: {
          startStop: JSON.parse(feature.properties?.startStop),
          endStop: JSON.parse(feature.properties?.endStop),
          anchors: feature.properties?.anchors ? JSON.parse(feature.properties?.anchors) : []
        },
        position: [lngLat.lng, lngLat.lat],
        geometry: feature.geometry as LineString
      });
    } else {
      if(!isHoverMarkerDragged) {
        setHoverMarker(null)
      }
    }
  }

  /** Whenever the hover marker is being dragged */
  const handleHoverMarkerDrag = (e: MarkerDragEvent) => {
    setIsHoverMarkerDragged(true)
    setHoverMarker((prevHoverMarker) => prevHoverMarker ? {...prevHoverMarker, position: [e.lngLat.lng, e.lngLat.lat]}: null )
  }

  /** Whenever the hover marker is placed */
  const handleHoverMarkerPlaced = async (marker: HoverMarker) => {

    setIsHoverMarkerDragged(false)

    console.log("Coordinates before marker", marker.geometry.coordinates)
    const featureId = marker.sectionId as number
    const line = lineString(marker.geometry.coordinates)
    const newPoint = point(marker.position)
    const nearestPoint = nearestPointOnLine(line, newPoint);
    const nearestIndex = nearestPoint.properties.index;

    console.log("Nearest index obtained", nearestIndex)
    
    console.log("New anchor", newPoint)
    console.log("Previous anchors", marker.properties.anchors)

    const updatedAnchors: GeoPosition[] = [
      ...(marker.properties.anchors ? marker.properties.anchors.slice(0, nearestIndex) : []),
      newPoint.geometry.coordinates,
      ...(marker.properties.anchors ? marker.properties.anchors.slice(nearestIndex) : [])
    ];

    const geometry = await getGeometry({ 
      startStop: marker.properties.startStop!, 
      endStop: marker.properties.endStop!, 
      anchors: updatedAnchors
    })

    if (geometry) updateFeatureAtIndex({selectedIndex: featureId, anchors: updatedAnchors, geometry: geometry})
  }

  /** Whenever a existing anchor changes position */
  const handleAnchorMarkerPlaced = async(featureIndex:  number, anchorIndex: number, newPosition: GeoPosition) => {

    const feature = featureCollection.features[featureIndex]
   
    const updatedAnchors = feature.properties.anchors?.map((anchor, index) =>
      index == anchorIndex ? newPosition : anchor
    )

    const geometry = await getGeometry({ startStop: feature.properties.startStop!, endStop: feature.properties.endStop!, anchors: updatedAnchors })
    if (geometry) updateFeatureAtIndex({selectedIndex: featureIndex, anchors: updatedAnchors!, geometry: geometry})
  };

  /** Whenever a existing anchor is deleted */
  const handleAnchorDeleted = async(featureIndex: number, anchorIndex: number) => {

    const feature = featureCollection.features[featureIndex]
   
    const updatedAnchors = feature.properties.anchors?.filter((_, index) =>
      index !== anchorIndex
    )

    const geometry = await getGeometry({ startStop: feature.properties.startStop!, endStop: feature.properties.endStop!, anchors: updatedAnchors })
    if (geometry) updateFeatureAtIndex({selectedIndex: featureIndex, anchors: updatedAnchors!, geometry: geometry})
  };

  function MapEvents({
    onUndo,
  }: {
    onUndo: () => void;
  }) {
  
    useEffect(() => {
  
      const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === "D" && event.shiftKey) {
          onUndo();
        }
      };
  
      document.addEventListener("keydown", handleKeyPress);
  
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }, [mapRef, onUndo]);
  
    return null;
  }

  return (
    // TODO: Create a new base map component for eventual full Mapbox integration
    <MapComponent
      {...viewState}
      ref={mapRefCallback}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      onMove={ evt => setViewState(evt.viewState)}
      style={{height: "60vh", width: "100%"}}
      mapStyle={"mapbox://styles/mapbox/streets-v12"}
      interactiveLayerIds={["clusters", "unclustered-point"]}
      onMouseMove={handleOnMouseOver}
      onClick={handleOnMapClick}
    >
      <MapEvents
        onUndo={onUndo}
      />

      {featureCollection && 
        <Source id="route" type="geojson" data={featureCollection}>
          <Layer
            id="route"
            type="line"
            layout={{ "line-join": "round", "line-cap": "round" }}
            paint={{ "line-color": "#d04116", "line-width": 4 }}
          />
        </Source>
      }

      {stopCollection.features.length > 0 &&
        <Source 
          key={JSON.stringify(stops)}
          id="stops" 
          type="geojson" 
          data={stopCollection}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer
            id="clusters"
            type="circle"
            source="stops"
            filter={['has', 'point_count']}
            paint={{
              'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
              'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
            }}
          />
          <Layer
              id='cluster-count'
              type='symbol'
              source='stops'
              filter={['has', 'point_count']}
              layout={{
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
              }}
          />
          <Layer
            id='unclustered-point'
            type='symbol'
            source='stops'
            filter={['!', ['has', 'point_count']]}
            layout={{
              'icon-image': 'bus-stop',
              'icon-size' : 0.6,
              "icon-allow-overlap": true,
            }}
          />
        </Source>
      }

      {featureCollection.features.map((feature, index) => 
        feature.properties?.anchors?.map((anchor, anchorIndex) => (
          <AnchorMarker
            key={`${feature.id}-${anchorIndex}`}
            position={anchor}
            icon={
              <Image 
                src={"/icons/dot.svg"} 
                alt="Nothing" 
                width={18} 
                height={18}
              />
            }
            onDragEnd={e => handleAnchorMarkerPlaced(index, anchorIndex, [e.lngLat.lng, e.lngLat.lat])}
            onDbClick={e => handleAnchorDeleted(index, anchorIndex)}
          />
        ))
      )}

      {hoverMarker && (
        <AnchorMarker
          position={hoverMarker.position}
          icon={
            <Image 
              src={"/icons/dot.svg"} 
              alt="Nothing" 
              width={18} 
              height={18}
              style={{ opacity: 0.5 }}
            />
          }
          onDrag={handleHoverMarkerDrag}
          onDragEnd={e => handleHoverMarkerPlaced(hoverMarker)}
        />
      )}
    </MapComponent>
  )
}

export default NewLineEditMap;