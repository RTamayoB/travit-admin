import {Typography} from "@/shared/components";
import { fetchLinePages } from "./lib/get-lines-page-count-action";
import { fetchFilteredLines } from "./lib/get-filtered-lines-action";
import {fetchAllStops} from "@/app/dashboard/lines/lib/get-all-stops-action";
import LineView from "@/app/dashboard/lines/ui/LineView";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const stops = await fetchAllStops()
  const totalPages = await fetchLinePages(query)
  const lines = await fetchFilteredLines(query, currentPage)

  return (
    <>
      <div>
        <Typography variant="h5" bold>
          Lineas
        </Typography>
        <LineView lines={lines} stops={stops} totalPages={totalPages}/>
      </div>
    </>
  )
}