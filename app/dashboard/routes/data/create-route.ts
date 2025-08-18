"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Segment } from "@/app/lib/definitions";
import { RouteSchema } from "@/app/lib/schemas";
import { z } from "zod";
import { buildPolyline, buildShapePointsFromSegments, buildStopsFromSegments, RouteActionResponse, RoutePayload, TripPayload } from "./payload-utils";

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

  revalidatePath("/dashboard/routes");
  redirect("/dashboard/routes");
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
