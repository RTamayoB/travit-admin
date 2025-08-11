'use client';

import { LineSection, Segment, Stop, TripBuilder } from "@/app/lib/definitions";
import 'mapbox-gl/dist/mapbox-gl.css';
import { FeatureCollection, LineString, Point, Position as GeoPosition } from "geojson";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MapComponent, { Layer, MapRef, MarkerDragEvent, Source } from "react-map-gl/mapbox";
import AnchorMarker from "../base/markers/anchormarker";
import { positionToGeoPosition } from "@/app/lib/utils";
import { lineString, nearestPointOnLine, point } from "@turf/turf";
import { GeoJSONSource, MapMouseEvent } from "mapbox-gl";
import Image from "next/image";
import { getGeometry } from "@/utils/mapbox/getGeometry";
import { AddFirstSegmentParams, AddSegmentParams, UpdateLastSegmentParams, UpdateSegmentAtIndexParams } from "./useSegmentEditor";

type HoverMarker = {
  segmentId: string | number | undefined,
  properties: LineSection,
  position: GeoPosition,
  geometry: LineString
}

interface NewRouteEditMapProps {
  stops: Stop[];
  tripBuilders: Record<number, TripBuilder>;
  focusedTripId: number | null;
  onBuilderUpdate: (updatedSegment: Segment[], focusedIndex: number) => void;
}

/**
 * TC: Now, we need to do various things:
 * [x] Use the tripBuilder to create the featureCollections
 * [x] Use the focusIndex to only allow edits to a specific tripBuilder
 * [x] Send the information back to the form to update said tripBuilder from the list
 * [] Make all actions work (add and remove stops, create and delete anchors, move anchors, undo, etc.)
 */
function NewRouteEditMap({
  stops,
  tripBuilders,
  focusedTripId,
  onBuilderUpdate,
}: NewRouteEditMapProps) {

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

  const selectedBuilder = useMemo(() => {
    if (focusedTripId === null) return null;
    return tripBuilders[focusedTripId] ?? null;
  }, [focusedTripId, tripBuilders]);

  const selectedStopIds = useMemo(() => {
    if (!selectedBuilder) return new Set<number>();
    const ids = selectedBuilder.flatMap(segment => [
      segment.startStop?.id,
      segment.endStop?.id,
    ]).filter(Boolean);
    return new Set(ids as number[]);
  }, [selectedBuilder]);

  const selectedStops = stops.filter(stop => selectedStopIds.has(stop.id));
  const otherStops = stops.filter(stop => !selectedStopIds.has(stop.id));

  const selectedStopCollection: FeatureCollection<Point> = {
    type: "FeatureCollection",
    features: selectedStops.map((stop) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: positionToGeoPosition(stop.position) },
      properties: {
        id: stop.id,
        name: stop.name,
        description: stop.description,
        position: stop.position
      },
    }))
  };

  const otherStopCollection: FeatureCollection<Point> = {
    type: "FeatureCollection",
    features: otherStops.map((stop) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: positionToGeoPosition(stop.position) },
      properties: {
        id: stop.id,
        name: stop.name,
        description: stop.description,
        position: stop.position
      },
    }))
  };

  /** ---------------------------------------------------------------------- */

  const onSegmentUpdateNew = (newBuilder: Segment[], prevBuilder: Segment[]) => {
  }

  const addFirstSegmentNew = ({ startStop } : AddFirstSegmentParams) => {
    if (selectedBuilder == null || focusedTripId == null) return;
    const prevBuilderSegments = [...selectedBuilder];
  
    const newSegment: Segment = {
        id: selectedBuilder.length,
        startStop: startStop
    };
  
    const newBuilder = [...prevBuilderSegments, newSegment];

    onBuilderUpdate(newBuilder, focusedTripId);
  };

  const updateLastSegmentNew = ({ endStop, geometry }: UpdateLastSegmentParams) => {
    if (selectedBuilder == null || focusedTripId == null) return

    const lastSegmentIndex = selectedBuilder.length - 1;
    if (lastSegmentIndex < 0) return;
  
    const updatedBuilder = selectedBuilder.map((segment, index) => 
      index === lastSegmentIndex
      ? {
          ...segment,
          endStop: endStop,
          geometry: geometry
        }: segment
      );
  
      onBuilderUpdate(updatedBuilder, focusedTripId);
  };
  
  const addSegmentNew = ({ startStop, endStop, geometry = { type: "LineString", coordinates: [] }} : AddSegmentParams) => {
    if (selectedBuilder == null || focusedTripId == null) return;

    const prevBuilderSegments = [...selectedBuilder];
  
    const newSegment: Segment = {
      id: selectedBuilder.length,
      startStop: startStop,
      endStop: endStop,
      geometry: geometry
    };
  
    const newBuilder = [...prevBuilderSegments, newSegment]

    onBuilderUpdate(newBuilder, focusedTripId);
  };

  const updateSegmentAtNew = ({ selectedIndex, anchors, geometry } : UpdateSegmentAtIndexParams) => {
    if (selectedBuilder == null || focusedTripId == null) return;

    console.log("Updating:...")
    console.log("Index", selectedIndex)
    console.log(anchors);

    const updatedBuilder = selectedBuilder.map((segment, index) => 
      index == selectedIndex
      ? {
        ...segment,
        anchors: anchors,
        geometry: geometry
      }: segment
    );

    onBuilderUpdate(updatedBuilder, focusedTripId)
  }

  /** ---------------------------------------------------------------------- */

  const derivedFCByTripId = useMemo(() => {
    const byId: Record<number, FeatureCollection<LineString, LineSection>> = {};
    Object.entries(tripBuilders).forEach(([idStr, tb]) => {
      const id = parseInt(idStr, 10);
      byId[id] = {
        type: "FeatureCollection",
        features: tb.filter(s => s.geometry).map(s => ({
          id: s.id, type: "Feature", geometry: s.geometry!, properties: {
            startStop: s.startStop, endStop: s.endStop, anchors: s.anchors,
          },
        })),
      };
    });
    return byId;
  }, [tripBuilders]);

  const derivedFeatureCollections: { tripId: number, collection: FeatureCollection<LineString, LineSection> }[] = useMemo(() =>
    Object.entries(tripBuilders).map(([tripIdStr, tripBuilder]) => ({
      tripId: parseInt(tripIdStr, 10),
      collection: {
        type: "FeatureCollection",
        features: tripBuilder.map((segment) => ({
          id: segment.id,
          type: "Feature",
          geometry: segment.geometry!,
          properties: {
            startStop: segment.startStop,
            endStop: segment.endStop,
            anchors: segment.anchors,
          },
        })),
      },
    })),
  [tripBuilders]);

  //GPT, this doesnt work
  /*const derivedFeatureCollectionsOld: FeatureCollection<LineString, LineSection>[] = useMemo(() => tripBuilders.map((tripBuilder) => ({
    type: "FeatureCollection",
    features: tripBuilder.map((segment) => ({
      id: segment.id,
      type: "Feature",
      geometry: segment.geometry!,
      properties: {
        startStop: segment.startStop,
        endStop: segment.endStop,
        anchors: segment.anchors
      }
    }))
  })), [tripBuilders]);*/

  const mapRef = useRef<MapRef | null>(null);

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
        loadImage();
      });
    }
  }, []);

  /** Whenever a stop  is added to the line */
  const handleStopSelected = async(stop: Stop) => {
    if (!selectedBuilder) return
    const lastSegment = selectedBuilder.at(-1);
  
    if (!lastSegment) {
      addFirstSegmentNew({ startStop: stop })
      return;
    }
    
    const { startStop, endStop } = lastSegment;
  
    if (startStop && !endStop) {
      if (startStop.id === stop.id) return;

      const firstPoint = positionToGeoPosition(startStop.position)
      const secondPoint = positionToGeoPosition(stop.position)
      const geometry = await getGeometry({ startPoint: firstPoint, endPoint: secondPoint});
      if (geometry) {
        updateLastSegmentNew({ endStop: stop, geometry});
      }
      return;
    }
  
    if (endStop?.id === stop.id) return;
  
    if(endStop) {
      const firstPoint = lastSegment.geometry?.coordinates.at(-1)!!
      const secondPoint = positionToGeoPosition(stop.position)
      const geometry = await getGeometry({startPoint: firstPoint, endPoint: secondPoint})
      if (geometry) {
        addSegmentNew({ startStop: endStop, endStop: stop, geometry });
      }
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

    if (focusedTripId == null) return;
    const fc = derivedFCByTripId[focusedTripId];
    if (!fc || fc.features.length <= 0) return;

    if (!mapRef.current) return;

    const { lngLat, point } = event;

    const features = event.target.queryRenderedFeatures(point, {
      layers: [`trip_${focusedTripId}`],
    });

    if (features.length > 0) {
      const feature = features[0];

      setHoverMarker({
        segmentId: feature.id,
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

    const segmentId = marker.segmentId as number
    const line = lineString(marker.geometry.coordinates)
    const newPoint = point(marker.position)
    const nearestPoint = nearestPointOnLine(line, newPoint);
    const nearestIndex = nearestPoint.properties.index;

    const updatedAnchors: GeoPosition[] = [
      ...(marker.properties.anchors ? marker.properties.anchors.slice(0, nearestIndex) : []),
      newPoint.geometry.coordinates,
      ...(marker.properties.anchors ? marker.properties.anchors.slice(nearestIndex) : [])
    ];

    const geometry = await getGeometry({ 
      startPoint: positionToGeoPosition(marker.properties.startStop!.position),
      endPoint: positionToGeoPosition(marker.properties.endStop!.position),
      anchors: updatedAnchors
    })

    if (geometry) {
      updateSegmentAtNew({ selectedIndex: segmentId, anchors: updatedAnchors, geometry: geometry });
    }
  }

  /** Whenever a existing anchor changes position */
  const handleAnchorMarkerPlaced = async(segmentIndex: number, anchorIndex: number, newPosition: GeoPosition) => {

    if (!selectedBuilder) return

    const segment = selectedBuilder[segmentIndex]
   
    const updatedAnchors = segment.anchors?.map((anchor, index) =>
      index == anchorIndex ? newPosition : anchor
    )

    const geometry = await getGeometry({ 
      startPoint: positionToGeoPosition(segment.startStop!.position),
      endPoint: positionToGeoPosition(segment.endStop!.position),
      anchors: updatedAnchors 
    })
    if (geometry) {
      updateSegmentAtNew({ selectedIndex: segmentIndex, anchors: updatedAnchors!, geometry: geometry });
    }
  };

  /** Whenever a existing anchor is deleted */
  const handleAnchorDeleted = async(segmentIndex: number, anchorIndex: number) => {

    if (!selectedBuilder) return

    const segment = selectedBuilder[segmentIndex]
   
    const updatedAnchors = segment.anchors?.filter((_, index) =>
      index !== anchorIndex
    )

    const geometry = await getGeometry({
      startPoint: positionToGeoPosition(segment.startStop!.position),
      endPoint: positionToGeoPosition(segment.endStop!.position),
      anchors: updatedAnchors
    })
    if (geometry)  {
      updateSegmentAtNew({ selectedIndex: segmentIndex, anchors: updatedAnchors!, geometry: geometry });
    }
  };

  function MapEvents({
    onUndo,
  }: {
    onUndo: () => void;
  }) {
  
    useEffect(() => {
  
      const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === "D" && event.shiftKey) {
          //onUndoSegment();
        }
      };
  
      document.addEventListener("keydown", handleKeyPress);
  
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }, [mapRef, onUndo, /*(onUndoSegment)*/]);
  
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
        onUndo={() => {}/*onUndoSegment*/}
      />

      {Object.entries(derivedFCByTripId).map(([idStr, collection]) => {
        const tripId = Number(idStr);
        return (
          <Source key={`trip_${tripId}`} id={`trip_${tripId}`} type="geojson" data={collection}>
            <Layer id={`trip_${tripId}`} type="line" paint={{
              "line-color": "#d04116",
              "line-width": tripId === focusedTripId ? 4 : 3,
              "line-opacity": tripId === focusedTripId ? 1.0 : 0.4,
            }}/>
          </Source>
        );
      })}

      {/* Other (default) stops with clusters */}
      <Source
        id="stops"
        type="geojson"
        data={otherStopCollection}
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
            'icon-size': 0.6,
            'icon-allow-overlap': true,
          }}
        />
      </Source>

      {/* Selected stops (larger + orange) */}
      <Source
        id="selected-stops"
        type="geojson"
        data={selectedStopCollection}
      >
        <Layer
          id='selected-stops-layer'
          type='symbol'
          layout={{
            'icon-image': 'bus-stop',
            'icon-size': 0.9,
            'icon-allow-overlap': true,
          }}
          paint={{
            'icon-color': '#f97316' // orange-500
          }}
        />
      </Source>

      {selectedBuilder?.map((segment, segmentIndex) => 
        segment.anchors?.map((anchor, anchorIndex) => (
          <AnchorMarker
            key={`${segment.id}-${anchorIndex}`}
            position={anchor}
            icon={
              <Image 
                src={"/icons/dot.svg"} 
                alt="Nothing" 
                width={18} 
                height={18}
              />
            }
            onDragEnd={e => handleAnchorMarkerPlaced(segmentIndex, anchorIndex, [e.lngLat.lng, e.lngLat.lat])}
            onDbClick={e => handleAnchorDeleted(segmentIndex, anchorIndex)}
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

export default NewRouteEditMap;