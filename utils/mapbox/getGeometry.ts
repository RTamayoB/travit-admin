import client from '@mapbox/mapbox-sdk';
import { Coordinates } from "@mapbox/mapbox-sdk/lib/classes/mapi-request";
import mapMatching, { MapMatchingPoint } from "@mapbox/mapbox-sdk/services/map-matching";
import { LineString, Position as GeoJsonPosition } from "geojson";
import { normalizeLongitude } from '@/app/lib/utils';

export const getGeometry = async (
  {
    startPoint, 
    endPoint, 
    anchors
  } : {
    startPoint: GeoJsonPosition,
    endPoint: GeoJsonPosition,
    anchors?: GeoJsonPosition[]
  }
) => {

  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!
  const baseClient = client({accessToken: accessToken});
  const mapMatchingService = mapMatching(baseClient);

  const geoJsonPositionToCoordinates = (pos?: GeoJsonPosition): Coordinates => {
    if (!pos || pos.length !== 2) return [0, 0];

    const lng = parseFloat(normalizeLongitude(pos[0]).toFixed(6));
    const lat = parseFloat(pos[1].toFixed(6));

    return [lng, lat];
  };

  const areCoordinatesClose = (coord1: GeoJsonPosition | undefined, coord2: GeoJsonPosition | undefined, tolerance = 0.01): boolean => {
    if (!coord1 || !coord2) return false;
    return Math.abs(coord1[0] - coord2[0]) <= tolerance && Math.abs(coord1[1] - coord2[1]) <= tolerance;
  };

  const points = [
    { coordinates: geoJsonPositionToCoordinates(startPoint) },
    ...((anchors?.map(anchor => ({ coordinates: geoJsonPositionToCoordinates(anchor) })) ?? []) as MapMatchingPoint[]),
    { coordinates: geoJsonPositionToCoordinates(endPoint) }
  ];

  console.log("Points to send to mapbox", points)

  try {
    const response = await mapMatchingService.getMatch({
      points: points,
      geometries: "geojson",
      overview: "full",
      steps: true,
      language: "es-MX"
    }).send()

    // Confirm resulting line was correctly constructed
    if (response.body.code !== "Ok") return null

    const geometry = response.body.matchings[0].geometry as unknown as LineString;

    const isValid = areCoordinatesClose(geometry.coordinates[0], geoJsonPositionToCoordinates(startPoint)) && 
    areCoordinatesClose(geometry.coordinates[geometry.coordinates.length - 1], geoJsonPositionToCoordinates(endPoint));

    if (!isValid) return null

    return geometry
  } catch {
    return null
  }
}