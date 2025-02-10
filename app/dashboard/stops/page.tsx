import {
  getAllStops,
  getStopsByQuery,
} from "@/app/dashboard/stops/data/get-stops";
import StopsLayout from "@/ui/dashboard/stops/StopsLayout";

export default async function Page(
  props: {
    searchParams?: Promise<{
      query?: string;
    }>;
  },
) {
  const searchParams = await props.searchParams;

  const query = searchParams?.query || "";
  const stops = await getAllStops();
  const searchedStops = await getStopsByQuery(query);

  return (
    <StopsLayout
      stops={stops}
      searchedStops={searchedStops}
    />
  );
}
