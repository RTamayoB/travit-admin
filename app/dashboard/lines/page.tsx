import { getLinesPageCount } from "@/app/dashboard/lines/data/get-lines-page-count";
import { getLinesByRange } from "@/app/dashboard/lines/data/get-lines-by-range";
import LinesLayout from "@/ui/dashboard/lines/LinesLayout";
import { deleteLine } from "./(admin)/[id]/edit/data/delete-line";

export default async function Page(
  props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  },
) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getLinesPageCount(query);
  const lines = await getLinesByRange(query, currentPage);

  return (
    <LinesLayout
      lines={lines}
      totalPages={totalPages}
      onDeleteLine={deleteLine}
    />
  );
}
