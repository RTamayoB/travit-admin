'use client';

import { LineSection, Stop } from "@/app/lib/definitions";
import 'mapbox-gl/dist/mapbox-gl.css';
import client from '@mapbox/mapbox-sdk';
import mapMatching, { MapMatchingPoint } from '@mapbox/mapbox-sdk/services/map-matching';
import { FeatureCollection, LineString, Position } from "geojson";
import { useEffect, useMemo, useRef, useState } from "react";
import MapComponent, { Layer, Marker, MarkerDragEvent, Source } from "react-map-gl/mapbox";
import AnchorMarker from "../base/markers/anchormarker";
import { geoJsonPositionToCoordinates, positionToCoordinates } from "@/app/lib/utils";
import { lineString, nearestPointOnLine, point } from "@turf/turf";
import { MapMouseEvent } from "mapbox-gl";

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
  initialFeatureCollection: FeatureCollection<LineString, LineSection>;
  onFeatureCollectionUpdate: (featureCollection: FeatureCollection<LineString, LineSection>) => void;
}

function NewLineEditMap({
  stops,
  initialFeatureCollection,
  onFeatureCollectionUpdate
}: NewLineEditMapProps) {


  const baseClient = client({accessToken: "pk.eyJ1IjoicmFmYWVsLXQiLCJhIjoiY203bjA4ZmQzMDR2OTJucHVyMXl3cjd1bCJ9.NYY1s32Lp4Hip91i5bJVEA"});
  const mapMatchingService = mapMatching(baseClient);

  const initialRouteSections = useMemo(() => {
    return initialFeatureCollection.features.map((feature) => ({
      ...feature.properties
    }))
  }, [initialFeatureCollection]);

  const [featureCollection, setFeatureCollection] = useState<FeatureCollection<LineString, LineSection>>(initialFeatureCollection);
  const [lineSections, setLineSections] = useState<LineSection[]>(initialRouteSections);
  const [hoverMarker, setHoverMarker] = useState<HoverMarker | null>(null);
  const [lastAnchorPlaced, setLastAnchorPlaced] = useState<Position | null>(null);
  const [isHoverMarkerDragged, setIsHoverMarkerDragged] = useState(false);

  const mapRef = useRef(null);
  const prevLineSectionsRef = useRef<LineSection[]>([])

  const stopMarkers = useMemo(
    () => stops.map((stop) => (
      <Marker
        key={stop.id}
        latitude={stop.position.lat}
        longitude={stop.position.lng}
        onClick={e => {
          e.originalEvent.stopPropagation();
          handleStopSelected({
            id: stop.id,
            name: stop.name,
            description: stop.description,
            position: stop.position
          })
        }}
      />
    )), []
  );

  /** In charge of rendering the bus line whenever the lineSections changes  */
  useEffect(() => {

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

    console.log(geometry)

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

    console.log("Checking valididty:")
    console.log("Start:", JSON.stringify(geometry.coordinates[0]) + " - " + JSON.stringify(positionToCoordinates(startStop?.position)))
    console.log("End:", JSON.stringify(geometry.coordinates[geometry.coordinates.length - 1]) + " - " + JSON.stringify(positionToCoordinates(endStop?.position)))

    const areCoordinatesClose = (coord1: Position | undefined, coord2: Position | undefined, tolerance = 0.01): boolean => {
      if (!coord1 || !coord2) return false;
      console.log("Valid?: ",  Math.abs(coord1[0] - coord2[0]) <= tolerance && Math.abs(coord1[1] - coord2[1]) <= tolerance);
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
      setFeatureCollection((prevCollection) => {
        return {
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
        }
      })
    } else {
      setFeatureCollection((prevCollection) => {
        return {
          ...prevCollection,
          features: prevCollection.features.map((feature) => 
            lineChange?.index === feature.id ? 
            {
              ...feature, 
              properties: lineChange?.section!!, 
              geometry: geometry
            } : feature
          )
        }
      })
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

    const newAnchor: Position = [newPoint.geometry.coordinates[0], newPoint.geometry.coordinates[1]]

    setLastAnchorPlaced(newAnchor)

    const updatedAnchors = [
      ...(oldSection.anchors ? oldSection.anchors?.slice(0, nearestIndex): [] as Position[]),
      newAnchor,
      ...(oldSection.anchors? oldSection.anchors?.slice(nearestIndex) : [] as Position[] )
    ];

    return {...oldSection, anchors: updatedAnchors }
  }

  /** Whenever a existing anchor changes position */
  const handleAnchorMarkerPlaced = (featureIndex: number, anchorIndex: number, newPosition: Position) => {

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
  const handleAnchorDeleted = (featureIndex: number, anchorIndex: number) => {

    setLineSections((prevSection) => {
      return prevSection.map((section, index) => {
        if (index !== featureIndex) return section; // Keep other features unchanged
    
        if (!section.anchors) return section;
    
        // Remove the anchor at the specific index
        const updatedAnchors = section.anchors.filter((_, aIndex) => aIndex !== anchorIndex);
    
        return {
          ...section,
          anchors: updatedAnchors
        };
      });
    })
  };

  return (
    // TODO: Create a new base map component for eventual full Mapbox integration
    <MapComponent
      ref={mapRef}
      mapboxAccessToken="pk.eyJ1IjoicmFmYWVsLXQiLCJhIjoiY203bjA4ZmQzMDR2OTJucHVyMXl3cjd1bCJ9.NYY1s32Lp4Hip91i5bJVEA"
      initialViewState={{
        longitude: -103.29696486553104,
        latitude: 20.682718735053065,
        zoom: 14,
        bearing: 0,
        pitch: 0
      }}
      style={{height: "100vh", width: "100vw"}}
      mapStyle={"mapbox://styles/mapbox/streets-v12"}
      onMouseMove={handleOnMouseOver}
    >
      {/* TODO: Investiage clusters in Mapbox */}
      {stopMarkers}

      {featureCollection && 
        <Source id="route" type="geojson" data={featureCollection}>
          <Layer
            id="route"
            type="line"
            layout={{ "line-join": "round", "line-cap": "round" }}
            paint={{ "line-color": "#ff0000", "line-width": 4 }}
          />
        </Source>
      }

      {featureCollection.features.map((feature, featureIndex) => 
        feature.properties?.anchors?.map((anchor, anchorIndex) => (
          <AnchorMarker
            key={`${featureIndex}-${anchorIndex}`}
            position={anchor}
            onDragEnd={e => handleAnchorMarkerPlaced(featureIndex, anchorIndex, [e.lngLat.lng, e.lngLat.lat])}
            onDbClick={e => handleAnchorDeleted(featureIndex, anchorIndex)}
          />
        ))
      )}

      {hoverMarker && (
        <AnchorMarker
          position={hoverMarker.position}
          onDrag={handleHoverMarkerDrag}
          onDragEnd={e => handleHoverMarkerPlaced(e, hoverMarker)}
        />
      )}
    </MapComponent>
  )
}

export default NewLineEditMap;