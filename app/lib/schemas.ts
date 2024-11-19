import { z } from "zod";

export const LineSchema = z.object({
  id: z.number(),
  line_number: z.string(),
  legacy_line_number: z.string(),
  units: z.coerce.number({}),
  agency_id: z.coerce.number({
    invalid_type_error: 'Por favor escoja una concesionaria.'
  }),
  transport_type: z.string(),
  line_type: z.enum(["troncal", "complementaria", "alimentadora", "linea"], {
    invalid_type_error: 'Por favor selecciona un tipo de linea valido.'
  })
});