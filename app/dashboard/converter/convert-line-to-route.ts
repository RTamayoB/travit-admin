"use server";

import { createClient } from "@/utils/supabase/server";
import { FeatureCollection, LineString, Position } from "geojson";
import { Line, LineSection, Segment, Stop } from "@/app/lib/definitions";

export async function convertLineToRoute(params: { lineId: number; splitStopId: number }) {
  const { lineId, splitStopId } = params;
  const supabase = await createClient();

  // 1) Fetch the Line by ID
  const { data, error } = await supabase
    .from("lines")
    .select(`
      id,
      line_number,
      legacy_line_number,
      units,
      agency_id,
      transport_type,
      line_type,
      route_points,
      route
    `)
    .eq("id", lineId)
    .single();

  if (error || !data) {
    return { success: false, message: "No se pudo obtener la linea seleccionada" };
  }

  const line: Line = data as Line;

  // 2) Map simple fields Line -> Route form data
  const short_name = line.line_number;
  const long_name = line.legacy_line_number;
  const agency_id = line.agency_id;
  const transport_type = "bus" as const; // defaulting to bus; adjust if mapping exists

  // Map line_type -> route_type and colors
  const route_type = mapLineTypeToRouteType(line.line_type);
  const colorScheme = route_type === "trunk"
    ? { color: "#D40000", text_color: "#FFFFFF" }
    : { color: "#4C8D2B", text_color: "#000000" };

  // 3) Convert FeatureCollection (Line.route) into two trips using splitStopId
  const fc: FeatureCollection<LineString, LineSection> = line.route ?? { type: "FeatureCollection", features: [] };
  const { inbound, outbound } = splitFeatureCollectionIntoTrips(fc, splitStopId);

  if (!inbound || !outbound) {
    return { success: false, message: "No se pudo dividir la linea en dos viajes con la parada seleccionada" };
  }

  // 4) Build trips payloads as expected by the RPC insert_route_with_trips
  const inboundTrip = buildTripFromFeatureCollection(inbound, "inbound", short_name);
  const outboundTrip = buildTripFromFeatureCollection(outbound, "outbound", short_name);

  const routePayload: RoutePayload = {
    agency_id,
    short_name,
    long_name,
    description: long_name ?? "",
    type: transport_type,
    color: colorScheme.color,
    text_color: colorScheme.text_color,
    public_id: short_name.toLowerCase(),
    trips: [inboundTrip, outboundTrip]
  };

  const { data: routeId, error: rpcError } = await supabase.rpc(
    "insert_route_with_trips",
    { payload: routePayload }
  );

  if (rpcError) {
    console.error(rpcError);
    return { success: false, message: "Error insertando la Ruta y sus viajes" };
  }

  return { success: true, message: `Ruta creada (id: ${routeId}) con 2 viajes` };
}

function mapLineTypeToRouteType(line_type: string): "trunk" | "complementary" | "feeder_line" {
  switch (line_type) {
    case "troncal":
      return "trunk";
    case "complementaria":
      return "complementary";
    case "alimentadora":
      return "feeder_line";
    default:
      return "complementary";
  }
}

function splitFeatureCollectionIntoTrips(
  fc: FeatureCollection<LineString, LineSection>,
  splitStopId: number
): { inbound?: FeatureCollection<LineString, LineSection>; outbound?: FeatureCollection<LineString, LineSection> } {
  // Assumption: features are ordered sequentially from start to end.
  // We split at the feature whose endStop (or startStop) matches splitStopId.
  const features = fc.features ?? [];
  let splitIndex = -1;

  for (let i = 0; i < features.length; i++) {
    const p = features[i].properties ?? {};
    const endId = p.endStop?.id;
    const startId = p.startStop?.id;
    if (endId === splitStopId || startId === splitStopId) {
      splitIndex = i;
      break;
    }
  }

  if (splitIndex < 0) {
    return {};
  }

  const firstHalf = features.slice(0, splitIndex + 1);
  const secondHalf = features.slice(splitIndex + 1);

  if (firstHalf.length === 0 || secondHalf.length === 0) {
    return {};
  }

  return {
    inbound: { type: "FeatureCollection", features: firstHalf },
    outbound: { type: "FeatureCollection", features: secondHalf },
  };
}

function buildTripFromFeatureCollection(
  fc: FeatureCollection<LineString, LineSection>,
  direction: "inbound" | "outbound",
  routeShortName: string
): TripPayload {
  // Convert FC to Segment[]
  const segments: Segment[] = (fc.features ?? []).map((f, idx) => ({
    id: idx,
    startStop: f.properties?.startStop as Stop | undefined,
    endStop: f.properties?.endStop as Stop | undefined,
    anchors: f.properties?.anchors as Position[] | undefined,
    geometry: f.geometry,
  }));

  const polyline: GeoJSON.LineString = {
    type: "LineString",
    coordinates: segments.flatMap((s) => s.geometry?.coordinates ?? []),
  };

  const publicId = `${routeShortName.toLowerCase()}_${direction}`;

  // Headsign and short_name fallbacks using endStop/startStop names.
  const headsign = direction === "inbound"
    ? segments.at(-1)?.endStop?.name ?? routeShortName
    : segments[0]?.startStop?.name ?? routeShortName;

  return {
    headsign,
    short_name: routeShortName,
    direction,
    polyline,
    trip_builder: segments,
    public_id: publicId,
    shape_public_id: publicId + "_shp",
    stops: buildStopsFromSegments(segments),
    shape_points: buildShapePointsFromSegments(segments),
  };
}

function buildStopsFromSegments(segments: Segment[]): TripStop[] {
  const stops: Stop[] = [];
  const firstStart = segments[0]?.startStop;
  if (firstStart) stops.push(firstStart);
  for (const seg of segments) {
    if (seg.endStop) stops.push(seg.endStop);
  }
  return stops.map((stop, i) => ({
    stop_id: stop.id,
    sequence: i,
    distance_traveled: 0.0,
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
        distance_traveled: 0.0,
      });
    }
  }

  return shapePoints;
}

// Types copied locally to avoid importing server-only helpers

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

type RoutePayload = {
  agency_id: number;
  short_name: string;
  long_name: string;
  description: string;
  type: string;
  color: string;
  text_color: string;
  public_id: string;
  trips: TripPayload[];
};
