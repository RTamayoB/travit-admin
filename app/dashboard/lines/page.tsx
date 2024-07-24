import {Typography} from "@/shared/components";
import LineView from "@/app/dashboard/lines/ui/LineView";
import {getLinesPageCount} from "@/app/dashboard/lines/data/get-lines-page-count";
import {getLinesByRange} from "@/app/dashboard/lines/data/get-lines-by-range";

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
  const totalPages = await getLinesPageCount(query)
  const lines = await getLinesByRange(query, currentPage)

  return (
    <>
      <div>
        <Typography variant="h5" bold>
          Lineas
        </Typography>
        <LineView lines={lines} totalPages={totalPages}/>
      </div>
    </>
  )
}
