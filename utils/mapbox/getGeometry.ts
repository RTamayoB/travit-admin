import client from '@mapbox/mapbox-sdk';
import { Position, Stop } from "@/app/lib/definitions";
import { Coordinates } from "@mapbox/mapbox-sdk/lib/classes/mapi-request";
import mapMatching, { MapMatchingPoint } from "@mapbox/mapbox-sdk/services/map-matching";
import { LineString, Position as GeoJsonPosition } from "geojson";
import { normalizeLongitude } from '@/app/lib/utils';

export const getGeometry = async (
  {
    startStop, 
    endStop, 
    anchors
  } : {
    startStop: Stop,
    endStop: Stop,
    anchors?: GeoJsonPosition[]
  }
) => {

  const baseClient = client({accessToken: "pk.eyJ1IjoicmFmYWVsLXQiLCJhIjoiY203bjA4ZmQzMDR2OTJucHVyMXl3cjd1bCJ9.NYY1s32Lp4Hip91i5bJVEA"});
  const mapMatchingService = mapMatching(baseClient);

  const geoJsonPositionToCoordinates = (pos?: GeoJsonPosition): Coordinates => {
    if (!pos || pos.length !== 2) return [0, 0];
    return [pos[0], pos[1]];
  };

  const positionToCoordinates = (pos?: Position): Coordinates => {
    if (!pos) return [0, 0];
      
    const lng = parseFloat(normalizeLongitude(pos.lng).toFixed(6));
    const lat = parseFloat(pos.lat.toFixed(6));
    return [lng, lat];
  };

  const areCoordinatesClose = (coord1: GeoJsonPosition | undefined, coord2: GeoJsonPosition | undefined, tolerance = 0.01): boolean => {
    if (!coord1 || !coord2) return false;
    return Math.abs(coord1[0] - coord2[0]) <= tolerance && Math.abs(coord1[1] - coord2[1]) <= tolerance;
  };

  const points = [
    { coordinates: positionToCoordinates(startStop?.position) },
    ...((anchors?.map(anchor => ({ coordinates: geoJsonPositionToCoordinates(anchor) })) ?? []) as MapMatchingPoint[]),
    { coordinates: positionToCoordinates(endStop?.position) }
  ];

  console.log("Points to send to mapbox", points)

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