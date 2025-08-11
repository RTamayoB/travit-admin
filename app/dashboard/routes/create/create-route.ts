"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Segment } from "@/app/lib/definitions";
import { RouteSchema } from "@/app/lib/schemas";
import { Position } from "geojson"
import { z } from "zod";

type RouteFormData = z.infer<typeof RouteSchema>

export async function createRoute(routeFormData: RouteFormData): Promise<RouteActionResponse> {

  try {
    const supabase = await createClient();

    const validatedData = RouteSchema.safeParse(routeFormData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Arregle los errores en el formulario",
        inputs: routeFormData
      };
    }

    // From here, we need to form our RoutePayload

    const colorScheme = validatedData.data.route_type === 'trunk'
      ? { color: '#D40000', text_color: '#FFFFFF' }
      : { color: '#4C8D2B', text_color: '#000000' };

    const routePayload: RoutePayload = {
      agency_id: validatedData.data.agency_id,
      short_name: validatedData.data.short_name,
      long_name: validatedData.data.long_name!,
      description: validatedData.data.description!,
      type: validatedData.data.transport_type,
      color: colorScheme.color,
      text_color: colorScheme.text_color,
      public_id: validatedData.data.short_name.toLowerCase(),
      trips: validatedData.data.trips.map(trip => buildTripPayload(trip, trip.trip_builder, validatedData.data.short_name))
    }

    const { data: routeId, error: rpcError } = await supabase.rpc(
      "insert_route_with_trips",
      {
        payload: routePayload
      }
    )

    if (rpcError) {
      throw rpcError;
    }

  } catch(error) {
    console.log(error)
    return {
      success: false,
      message: "Failed to create Line.",
    };
  }

  revalidatePath("/dashboard/routes/create");
  redirect("/dashboard/routes/create");
}

function buildStopsFromSegments(segments: Segment[]): TripStop[] {
  const stops = segments.map(s => s.startStop!).concat(segments.at(-1)!.endStop!);
  return stops.map((stop, i) => ({
    stop_id: stop.id,
    sequence: i,
    distance_traveled: 0.0
  }));
}

function buildShapePointsFromSegments(segments: Segment[]): ShapePoint[] {
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

function buildPolyline(segments: Segment[]): GeoJSON.LineString {
  const coordinates : Position[] = [];

  for (const segment of segments) {
    coordinates.push(...(segment.geometry?.coordinates ?? []));
  }

  return {
    type: "LineString",
    coordinates
  }
}

function buildTripPayload(trip: RouteFormData["trips"][0], tripBuilder: Segment[], routeShortName: string): TripPayload {
  const tripPublicId = `${routeShortName.toLowerCase()}_${trip.direction}`;

  return {
    headsign: trip.headsign!,
    short_name: trip.short_name!,
    direction: trip.direction!,
    polyline: buildPolyline(tripBuilder),
    trip_builder: tripBuilder,
    public_id: tripPublicId,
    shape_public_id: tripPublicId + "_shp",
    stops: buildStopsFromSegments(tripBuilder),
    shape_points: buildShapePointsFromSegments(tripBuilder)
  }
}

type RoutePayload = {
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

type TripStop = {
  stop_id: number;
  sequence: number;
  distance_traveled: number;
};

type ShapePoint = {
  point_geometry: GeoJSON.Point;
  point_sequence: number;
  distance_traveled: number;
};

type TripPayload = {
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
  inputs?: RouteFormData
}