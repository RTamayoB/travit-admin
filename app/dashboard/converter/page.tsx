import { createClient } from "@/utils/supabase/server";
import { Line } from "@/app/lib/definitions";
import ConverterForm from "./ConverterForm";

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase
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
    .order("id", { ascending: true });

  const lines: Line[] = (data as any[]) ?? [];

  return <ConverterForm lines={lines} />;
}
