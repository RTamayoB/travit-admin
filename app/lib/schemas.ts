import { z } from "zod";

export const LineSchema = z.object({
  id: z.number(),
  line_number: z.string({
    required_error: "Numero de Linea es requerido.",
  }).min(1, "Numero de Linea es requerido."),
  legacy_line_number: z.string({
    required_error: "Numero Anterior de Linea es requerido.",
  }).min(1, "Numero Anterior de Linea es requerido."),
  units: z.coerce.number().min(1, "Numero de unidades debe ser al menos 1"),
  agency_id: z.coerce.number({
    invalid_type_error: "Por favor escoja una concesionaria.",
  }).gt(0, "Por favor escoja una concesionaria."),
  transport_type: z.string(),
  line_type: z.enum(["troncal", "complementaria", "alimentadora", "linea"]),
});

export const AgencySchema = z.object({
  id: z.number(),
  name: z.string({
    required_error: "Nombre de Concesionaria es requerido.",
  }).min(1, "Nombre de Concesionaria es requerido."),
});

export const StopSchema = z.object({
  id: z.number(),
  name: z.string({
    required_error: "Nombre de la Parada es requerido.",
  }).min(1, "Nombre de la Parada es requerido."),
  description: z.string({
    required_error: "Descripcion de la Parada es requerido.",
  }).min(1, "Descripcion de la Parada es requerido."),
  lat: z.string(),
  lng: z.string(),
});

// New version schemas

const PositionArray2 = z.array(z.number()).length(2);
const PositionObjectSchema = z.object({ lat: z.number(), lng: z.number() });

// Stop
const NewStopSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  position: PositionObjectSchema,
});

// Segment
export const SegmentSchema = z.object({
  id: z.number(),
  startStop: NewStopSchema.optional(),
  endStop: NewStopSchema.optional(),
  anchors: z.array(PositionArray2).optional(),
  geometry: z.object({
    type: z.literal("LineString"),
    coordinates: z.array(PositionArray2),
  }).optional(),
});

export const TripSchema = z.object({
  formId: z.number(),
  id: z.number().optional(),
  headsign: z.string().optional(),
  short_name: z.string().optional(),
  direction: z.enum(['inbound', 'outbound']),
  trip_builder: z.array(SegmentSchema)
})

export const RouteSchema = z.object({
  short_name: z.string().nonempty(),
  long_name: z.string().optional(),
  agency_id: z.coerce.number().min(1),
  description: z.string().optional(),
  transport_type: z.enum(['tram', 'streetcar', 'light_rail','subway','metro','rail','bus','ferry','cable_tram','aerial_lift','funicular','trolleybus','monorail']),
  route_type: z.enum(['trunk', 'complementary', "feeder_line"]),
  trips: z.array(TripSchema)
})
