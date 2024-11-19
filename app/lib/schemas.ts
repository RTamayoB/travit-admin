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
  line_type: z.enum(["troncal", "complementaria", "alimentadora", "linea"])
});
