'use client';

import { LineSection, Stop } from "@/app/lib/definitions";
import 'mapbox-gl/dist/mapbox-gl.css';
import client from '@mapbox/mapbox-sdk';
import mapMatching, { MapMatchingPoint } from '@mapbox/mapbox-sdk/services/map-matching';
import { FeatureCollection, LineString, Point, Position as GeoPosition, Feature } from "geojson";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MapComponent, { Layer, MapRef, MarkerDragEvent, Source } from "react-map-gl/mapbox";
import AnchorMarker from "../base/markers/anchormarker";
import { geoJsonPositionToCoordinates, positionToCoordinates, positionToGeoPosition } from "@/app/lib/utils";
import { lineString, nearestPointOnLine, point } from "@turf/turf";
import { GeoJSONSource, MapMouseEvent } from "mapbox-gl";
import Image from "next/image";
import { AddAnchorAction, AddStopAction, MapAction } from "./mapEditorActions";

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


  const baseClient = client({accessToken: "pk.eyJ1IjoicmFmYWVsLXQiLCJhIjoiY203bjA4ZmQzMDR2OTJucHVyMXl3cjd1bCJ9.NYY1s32Lp4Hip91i5bJVEA"});
  const mapMatchingService = mapMatching(baseClient);

  const stopCollection: FeatureCollection<Point> = {
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
  }

  const [hoverMarker, setHoverMarker] = useState<HoverMarker | null>(null);
  const [isHoverMarkerDragged, setIsHoverMarkerDragged] = useState(false);
  const [undoStack, setUndoStack] = useState<MapAction[]>([]);

  const mapRef = useRef<MapRef | null>(null);
  const prevFeatureCollectionRef = useRef<FeatureCollection<LineString, LineSection> | null>(initialFeatureCollection)

  const [viewState, setViewState] = React.useState({
    longitude: -103.29696486553104,
    latitude: 20.682718735053065,
    zoom: 14,
  });

  const mapRefCallback = useCallback((ref: MapRef | null) => {
    if (ref !== null) {
      //Set the actual ref we use elsewhere
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
    
      //TODO need this?
      map.on("styleimagemissing", (e) => {
        const id = e.id; // id of the missing image
        console.log(id);
        loadImage();
      });
    }
  }, []);

  useEffect(() => {
    prevFeatureCollectionRef.current = initialFeatureCollection
  }, [initialFeatureCollection])

  const handleUndo = useCallback(() => {
    if (undoStack.length > 0) {
      const lastAction = undoStack.pop();
      if (lastAction) {
        lastAction.undo();
        setUndoStack([...undoStack])
      }
    }
  }, [undoStack])

  const areCoordinatesClose = (coord1: GeoPosition | undefined, coord2: GeoPosition | undefined, tolerance = 0.01): boolean => {
    if (!coord1 || !coord2) return false;
    return Math.abs(coord1[0] - coord2[0]) <= tolerance && Math.abs(coord1[1] - coord2[1]) <= tolerance;
  };

  const getGeometry = async (
    {
      startStop, 
      endStop, 
      anchors
    } : {
      startStop: Stop,
      endStop: Stop,
      anchors?: GeoPosition[]
    }) => {
      const points = [
        { coordinates: positionToCoordinates(startStop?.position) },
        ...((anchors?.map(anchor => ({ coordinates: geoJsonPositionToCoordinates(anchor) })) ?? []) as MapMatchingPoint[]),
        { coordinates: positionToCoordinates(endStop?.position) }
      ];

      try {
        const response = await mapMatchingService.getMatch({
          points: points,
          geometries: "geojson",
          overview: "full"
        }).send()

        // Confirm resulting line was correctly constructed
        if (response.body.code !== "Ok") return null

        const geometry = response.body.matchings[0].geometry as unknown as LineString;

        const isValid = areCoordinatesClose(geometry.coordinates[0], positionToCoordinates(startStop?.position)) && 
        areCoordinatesClose(geometry.coordinates[geometry.coordinates.length - 1], positionToCoordinates(endStop?.position));

        if (!isValid) return null

        return geometry
      } catch {
        return null
      }
  }

  const addNewFeature = ({
    startStop,
    endStop,
    geometry = { type: "LineString", coordinates: [] },
  }: {
    startStop: Stop;
    endStop?: Stop;
    geometry?: LineString;
  }) => {
    const newFeature: Feature<LineString, LineSection> = {
      type: "Feature",
      id: initialFeatureCollection.features.length,
      properties: { startStop, ...(endStop && { endStop }) },
      geometry
    };

    const newCollection = {
      ...initialFeatureCollection,
      features: [...initialFeatureCollection.features, newFeature]
    };

    setUndoStack((prev) => [
      ...prev,
      new AddStopAction(newCollection, onFeatureCollectionUpdate)
    ]);
    onFeatureCollectionUpdate(newCollection)
  }

  const updateLastFeature = ({
    endStop,
    geometry
  }: {
    endStop: Stop,
    geometry: LineString
  }) => {
    const updatedFeatures = initialFeatureCollection.features.map((feature, index) =>
      index === initialFeatureCollection.features.length - 1
        ? {
          ...feature,
          properties: { ...feature.properties, endStop },
          geometry
        }
        : feature
    )

    const newCollection = { ...initialFeatureCollection, features: updatedFeatures }

    setUndoStack((prev) => [
      ...prev,
      new AddStopAction(newCollection, onFeatureCollectionUpdate),
    ]);
    onFeatureCollectionUpdate(newCollection);
  };

  const updateFeatureAtIndex = ({
    selectedIndex,
    anchors,
    geometry
  }: {
    selectedIndex: number,
    anchors: GeoPosition[],
    geometry: LineString
  }) => {
    const previousFeature = initialFeatureCollection.features[selectedIndex]
    const updatedFeatures = initialFeatureCollection.features.map((feature, index) =>
      index === selectedIndex
        ? {
          ...feature,
          properties: { 
            ...feature.properties, 
            anchors: anchors 
          },
          geometry
        }
        : feature
    )

    const newCollection = { ...initialFeatureCollection, features: updatedFeatures }

    setUndoStack((prev) => [
      ...prev,
      new AddAnchorAction(selectedIndex, previousFeature, newCollection, onFeatureCollectionUpdate),
    ]);
    onFeatureCollectionUpdate(newCollection);
  };

  /** Whenever a stop  is added to the line */
  const handleStopSelected = async(stop: Stop) => {
    const lastFeature = prevFeatureCollectionRef.current?.features.at(-1);
  
    if (!lastFeature) {
      addNewFeature({ startStop: stop });
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
      if (geometry) addNewFeature({startStop: endStop, endStop: stop, geometry });
    }
  };

  const handleOnMapClick = (event: MapMouseEvent) => {
    if (!event.features || event.features.length === 0) return;

    const feature = event.features[0]; // Get the first feature
    const clusterId = feature.properties?.cluster_id; // If it's a cluster, this exists

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

    if (initialFeatureCollection.features.length <= 0) return;

    const { lngLat, point } = event;

    const features = event.target.queryRenderedFeatures(point, {
      layers: ["route"],
    });

    if (features.length > 0) {
      const feature = features[0];

      setHoverMarker({
        sectionId: feature.id,
        properties: {
          ...feature.properties as LineSection,
          startStop: JSON.parse(feature.properties?.startStop),
          endStop: JSON.parse(feature.properties?.endStop),
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

    const featureId = marker.sectionId as number
    const line = lineString(marker.geometry.coordinates)
    const newPoint = point(marker.position)
    const nearestPoint = nearestPointOnLine(line, newPoint);
    const nearestIndex = nearestPoint.properties.index;

    const newAnchor: GeoPosition = [
      parseFloat(newPoint.geometry.coordinates[0].toFixed(6)), 
      parseFloat(newPoint.geometry.coordinates[1].toFixed(6))
    ]

    const updatedAnchors = [
      ...(marker.properties.anchors ? marker.properties.anchors?.slice(0, nearestIndex): [] as GeoPosition[]),
      newAnchor,
      ...(marker.properties.anchors? marker.properties.anchors?.slice(nearestIndex) : [] as GeoPosition[] )
    ];

    const geometry = await getGeometry({ 
      startStop: marker.properties.startStop!, 
      endStop: marker.properties.endStop!, 
      anchors: updatedAnchors
    })

    if (geometry) updateFeatureAtIndex({selectedIndex: featureId, anchors: updatedAnchors, geometry: geometry})
  }

  /** Whenever a existing anchor changes position */
  const handleAnchorMarkerPlaced = async(featureIndex: number, anchorIndex: number, newPosition: GeoPosition) => {

    const feature = initialFeatureCollection.features[featureIndex]
   
    const updatedAnchors = feature.properties.anchors?.map((anchor, index) =>
      index == anchorIndex ? newPosition : anchor
    )

    const geometry = await getGeometry({ startStop: feature.properties.startStop!, endStop: feature.properties.endStop!, anchors: updatedAnchors })
    if (geometry) updateFeatureAtIndex({selectedIndex: featureIndex, anchors: updatedAnchors!, geometry: geometry})
  };

  /** Whenever a existing anchor is deleted */
  const handleAnchorDeleted = async(featureIndex: number, anchorIndex: number) => {

    const feature = initialFeatureCollection.features[featureIndex]
   
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
      mapboxAccessToken="pk.eyJ1IjoicmFmYWVsLXQiLCJhIjoiY203bjA4ZmQzMDR2OTJucHVyMXl3cjd1bCJ9.NYY1s32Lp4Hip91i5bJVEA"
      onMove={ evt => setViewState(evt.viewState)}
      style={{height: "60vh", width: "100%"}}
      mapStyle={"mapbox://styles/mapbox/streets-v12"}
      interactiveLayerIds={["clusters", "unclustered-point"]}
      onMouseMove={handleOnMouseOver}
      onClick={handleOnMapClick}
    >
      <MapEvents
        onUndo={handleUndo}
      />

      {initialFeatureCollection && 
        <Source id="route" type="geojson" data={initialFeatureCollection}>
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

      {initialFeatureCollection.features.map((feature) => 
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
            onDragEnd={e => handleAnchorMarkerPlaced(feature.id, anchorIndex, [e.lngLat.lng, e.lngLat.lat])}
            onDbClick={e => handleAnchorDeleted(feature.id, anchorIndex)}
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