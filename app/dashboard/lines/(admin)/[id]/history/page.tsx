import { deleteLine } from "../edit/data/delete-line";
import LineHistoryLayout from "./LineHistoryLayout";
import { getHistoryForLinesPageCount } from "./data/getHistoryForLineById";
import { getHistoryForLineByRange } from "./data/getHistoryForLineByRange";

export default async function Page(props: { params: Promise<{ id: string; page?: string; }> }) {

  const searchParams = await props.params;
  const query = searchParams?.id || "";
  const currentPage = Number(searchParams?.page) || 1;
  const lines = await getHistoryForLineByRange(query, currentPage);
  const totalPages = await getHistoryForLinesPageCount(query);

  return (
    <LineHistoryLayout
      lines={lines}
      totalPages={totalPages}
      onDeleteLine={deleteLine}
    />
  );
}
