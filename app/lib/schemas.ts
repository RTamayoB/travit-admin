import { z } from "zod";

export const LineSchema = z.object({
  id: z.number().optional(),
  line_number: z.string(),
  legacy_line_number: z.string(),
  units: z.coerce.number(),
  agency_id: z.coerce.number(),
  transport_type: z.string(),
  line_type: z.enum(["troncal", "complementaria", "alimentadora", "linea"])
});