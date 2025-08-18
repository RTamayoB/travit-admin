import { Segment } from "@/app/lib/definitions";
import { RouteSchema } from "@/app/lib/schemas";
import { Position } from "geojson";
import { z } from "zod";

type RouteFormData = z.infer<typeof RouteSchema>

export function buildStopsFromSegments(segments: Segment[]): TripStop[] {
  const stops = segments.map(s => s.startStop!).concat(segments.at(-1)!.endStop!);
  return stops.map((stop, i) => ({
    stop_id: stop.id,
    sequence: i,
    distance_traveled: 0.0
  }));
}

export function buildShapePointsFromSegments(segments: Segment[]): ShapePoint[] {
  const shapePoints: ShapePoint[] = [];
  let sequence = 0;

  for (const segment of segments) {
    for (const [lng, lat] of segment.geometry?.coordinates ?? []) {
      shapePoints.push({
        point_geometry: { type: "Point", coordinates: [lng, lat] },
        point_sequence: sequence++,
        distance_traveled: 0.0
      });
    }
  }

  return shapePoints;
}

export function buildPolyline(segments: Segment[]): GeoJSON.LineString {
  const coordinates : Position[] = [];

  for (const segment of segments) {
    coordinates.push(...(segment.geometry?.coordinates ?? []));
  }

  return {
    type: "LineString",
    coordinates
  }
}

export type RoutePayload = {
  agency_id: number,
  short_name: string,
  long_name: string,
  description: string,
  type: string,
  color: string,
  text_color: string
  public_id: string
  trips: TripPayload[]
}

export type TripStop = {
  stop_id: number;
  sequence: number;
  distance_traveled: number;
};

export type ShapePoint = {
  point_geometry: GeoJSON.Point;
  point_sequence: number;
  distance_traveled: number;
};

export type TripPayload = {
  id?: number;
  headsign: string;
  short_name: string;
  direction: string;
  polyline: GeoJSON.LineString;
  trip_builder: Segment[];
  public_id: string;
  shape_public_id: string;
  stops: TripStop[];
  shape_points: ShapePoint[];
};

export interface RouteActionResponse {
  success: boolean;
  message: string;
  inputs?: RouteFormData;
}