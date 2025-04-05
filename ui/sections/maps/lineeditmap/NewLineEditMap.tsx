'use client';

import { LineSection, Stop } from "@/app/lib/definitions";
import 'mapbox-gl/dist/mapbox-gl.css';
import client from '@mapbox/mapbox-sdk';
import mapMatching, { MapMatchingPoint } from '@mapbox/mapbox-sdk/services/map-matching';
import { FeatureCollection, LineString, Point, Position } from "geojson";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MapComponent, { Layer, MapRef, MarkerDragEvent, Source } from "react-map-gl/mapbox";
import AnchorMarker from "../base/markers/anchormarker";
import { geoJsonPositionToCoordinates, positionToCoordinates, positionToGeoPosition } from "@/app/lib/utils";
import { lineString, nearestPointOnLine, point } from "@turf/turf";
import { GeoJSONSource, MapMouseEvent } from "mapbox-gl";
import Image from "next/image";

type LineChange = {
  index: number,
  section: LineSection,
  isAddition: boolean
}

type HoverMarker = {
  sectionId: string | number | undefined,
  properties: LineSection,
  position: Position,
  geometry: LineString
}

interface NewLineEditMapProps {
  stops: Stop[];
  featureCollection: FeatureCollection<LineString, LineSection>;
  onFeatureCollectionUpdate: (updateFn: (prevCollection: FeatureCollection<LineString, LineSection>) => FeatureCollection<LineString, LineSection>) => void;
}

function NewLineEditMap({
  stops,
  featureCollection,
  onFeatureCollectionUpdate
}: NewLineEditMapProps) {


  const baseClient = client({accessToken: "pk.eyJ1IjoicmFmYWVsLXQiLCJhIjoiY203bjA4ZmQzMDR2OTJucHVyMXl3cjd1bCJ9.NYY1s32Lp4Hip91i5bJVEA"});
  const mapMatchingService = mapMatching(baseClient);

  const initialRouteSections = useMemo(() => {
    console.log("Memo feature", featureCollection)
    return featureCollection.features.map((feature) => ({
      ...feature.properties
    }))
  }, [featureCollection]);

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

  const [lineSections, setLineSections] = useState<LineSection[]>(initialRouteSections);
  const [hoverMarker, setHoverMarker] = useState<HoverMarker | null>(null);
  const [lastAnchorPlaced, setLastAnchorPlaced] = useState<Position | null>(null);
  const [isHoverMarkerDragged, setIsHoverMarkerDragged] = useState(false);

  const mapRef = useRef<MapRef | null>(null);
  const isFirstRender = useRef(true);
  const prevLineSectionsRef = useRef<LineSection[]>([])

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

  /** In charge of rendering the bus line whenever the lineSections changes  */
  useEffect(() => {

    if(isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      const prevLineSectionsMap = new Map<number, LineSection>(
        prevLineSectionsRef.current.map((section, index) => [index, section])
      );
  
      let lineChange: LineChange | null = null;
  
      lineSections.forEach((section, index) => {
        const prevSection = prevLineSectionsMap.get(index);
  
        if (!prevSection) {
          
          if (section.startStop && section.endStop) {
            lineChange = { index, section, isAddition: true };
          }
        } else if (JSON.stringify(prevSection) !== JSON.stringify(section)) {
          if (prevSection.startStop && !prevSection.endStop) {
            lineChange = { index, section, isAddition: true };
          } else if (section.startStop && section.endStop) {
            lineChange = { index, section, isAddition: false };
          }
        }
      })
      
      if (lineChange) {
        updateCollection(lineChange);
      }
    }
    prevLineSectionsRef.current = lineSections;
  }, [lineSections])


  const updateCollection = async (lineChange: LineChange) => {
    const { startStop, endStop, anchors } = lineChange.section as LineSection;
    const points: MapMatchingPoint[] = lineChange.isAddition
      ? [
        { coordinates: positionToCoordinates(startStop?.position) },
        { coordinates: positionToCoordinates(endStop?.position) }
      ]
      : [
        { coordinates: positionToCoordinates(startStop?.position) },
        ...((anchors?.map(anchor => ({ coordinates: geoJsonPositionToCoordinates(anchor) })) ?? []) as MapMatchingPoint[]),
        { coordinates: positionToCoordinates(endStop?.position) }
      ];

    const response = await getMatchingResponse(points)

    const geometry = response?.body.matchings[0]?.geometry as unknown as LineString;

    if (response?.body.code !== "Ok") {
      if (!lineChange?.isAddition) {
        setLineSections((prevSections) => {
          return prevSections.map((section, index) => {
            if (index !== lineChange?.index) return section
            
            return {
              ...section,
              anchors: section.anchors?.filter(
                (anchor) => JSON.stringify(anchor) !== JSON.stringify(lastAnchorPlaced)
              ) ?? []
            }
          })
        })
      }
      return;
    }

    const areCoordinatesClose = (coord1: Position | undefined, coord2: Position | undefined, tolerance = 0.01): boolean => {
      if (!coord1 || !coord2) return false;
      return Math.abs(coord1[0] - coord2[0]) <= tolerance && Math.abs(coord1[1] - coord2[1]) <= tolerance;
    };

    const isValid = areCoordinatesClose(geometry.coordinates[0], positionToCoordinates(startStop?.position)) && 
      areCoordinatesClose(geometry.coordinates[geometry.coordinates.length - 1], positionToCoordinates(endStop?.position));

    if (!isValid) {
      if (!lineChange?.isAddition) {
        setLineSections((prevSections) => {
          return prevSections.map((section, index) => {
            if (index !== lineChange?.index) return section

            return {
              ...section,
              anchors: section.anchors?.filter(
                (anchor) => JSON.stringify(anchor) !== JSON.stringify(lastAnchorPlaced)
              ) ?? []
            }
          })
        })
      }
      return;
    }

    if (lineChange?.isAddition) {
      onFeatureCollectionUpdate((prevCollection) => ({
        ...prevCollection,
        features: [
          ...prevCollection.features,
          {
            type: "Feature",
            id: lineChange?.index,
            properties: lineChange?.section!!,
            geometry: geometry
          }
        ]
      }));
    } else {
      onFeatureCollectionUpdate((prevCollection) => ({
        ...prevCollection,
        features: prevCollection.features.map((feature) => 
          lineChange?.index === feature.id ? 
          {
            ...feature, 
            properties: lineChange?.section!!, 
            geometry: geometry
          } : feature
        )
      }));
    }
  }

  // TODO: Move function upwards to corresponding folder
  const getMatchingResponse = async (points: MapMatchingPoint[]) => {
    try {
      const response = await mapMatchingService.getMatch({
        points: points,
        geometries: "geojson",
        overview: "full"
      }).send()
      return response
    } catch {
      return null
    }
  }

  /** Whenever a stop  is added to the line */
  const handleStopSelected = async(stop: Stop) => {
    setLineSections((prevSections) => {
      const lastSection = prevSections[prevSections.length - 1];

      if (!lastSection) {
        return [
          ...prevSections, { startStop: stop }
        ]
      }

      if (lastSection?.startStop && !lastSection?.endStop) {
        if (lastSection.startStop.id === stop.id) return prevSections

        return prevSections.map((section, index) =>
          index === prevSections.length - 1 ? { ...section, endStop: stop} : section
        )
      }

      if (lastSection?.endStop?.id === stop.id) return prevSections;

      return [
        ...prevSections,
        { startStop: lastSection.endStop,
          endStop: stop
        }
      ]
    })
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

    if (featureCollection.features.length <= 0) return;

    const { lngLat, point } = event;

    const features = event.target.queryRenderedFeatures(point, {
      layers: ["route"],
    });

    if (features.length > 0) {
      const feature = features[0];

      setHoverMarker({
        sectionId: feature.id,
        properties: feature.properties as LineSection,
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
  const handleHoverMarkerPlaced = (e: MarkerDragEvent, marker: HoverMarker) => {

    setIsHoverMarkerDragged(false)

    setLineSections((prevSection) => {
      const sectionId = marker.sectionId as number
      const oldSection = prevSection[sectionId]
      const newSection = insertAnchorAtSection(oldSection, marker)

      if (JSON.stringify(oldSection) === JSON.stringify(newSection)) {
        return prevSection;
      }

      return prevSection.map((section, idx) => 
        idx === sectionId ? newSection : section
      )
    })
  }

  /** Returns a update LineSection with an anchor */
  const insertAnchorAtSection = (oldSection: LineSection, marker: HoverMarker) => {
    const line = lineString(marker.geometry.coordinates);
    const newPoint = point(marker.position);
    const nearestPoint = nearestPointOnLine(line, newPoint);
    const nearestIndex = nearestPoint.properties.index;

    const newAnchor: Position = [
      parseFloat(newPoint.geometry.coordinates[0].toFixed(6)), 
      parseFloat(newPoint.geometry.coordinates[1].toFixed(6))
    ]

    setLastAnchorPlaced(newAnchor)

    const updatedAnchors = [
      ...(oldSection.anchors ? oldSection.anchors?.slice(0, nearestIndex): [] as Position[]),
      newAnchor,
      ...(oldSection.anchors? oldSection.anchors?.slice(nearestIndex) : [] as Position[] )
    ];

    return {...oldSection, anchors: updatedAnchors }
  }

  /** Whenever a existing anchor changes position */
  const handleAnchorMarkerPlaced = (featureIndex: string | number | undefined, anchorIndex: number, newPosition: Position) => {

    setLineSections((prevSections) => {
      return prevSections.map((section, index) => {
        if (index !== featureIndex) return section;

        if (!section.anchors) return section;

        const updatedAnchors = section.anchors.map((anchor, index) => 
          index === anchorIndex ? newPosition : anchor
        );

        return {
          ...section,
          anchors: updatedAnchors
        }
      });
    });
  };

  /** Whenever a existing anchor is deleted */
  const handleAnchorDeleted = (featureIndex: string | number | undefined, anchorIndex: number) => {
    setLineSections((prevSection) => {
      return prevSection.map((section, index) => {
        if (index !== featureIndex) return section; // Keep other features unchanged
    
        if (!section.anchors) return section;

        console.log("Changing index", index)
  
        // Remove the anchor at the specific index
        const updatedAnchors = section.anchors.filter((_, aIndex) => aIndex !== anchorIndex);
    
        return {
          ...section,
          anchors: updatedAnchors
        };
      });
    })
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
        onUndo={() => {
          }
        }
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

      {featureCollection.features.map((feature) => 
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
          onDragEnd={e => handleHoverMarkerPlaced(e, hoverMarker)}
        />
      )}
    </MapComponent>
  )
}

export default NewLineEditMap;