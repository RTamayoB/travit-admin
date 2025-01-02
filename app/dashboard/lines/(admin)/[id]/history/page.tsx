import { deleteLine } from "../edit/data/delete-line";
import LineHistoryLayout from "./LineHistoryLayout";
import { getHistoryForLinesPageCount } from "./data/getHistoryForLineById";
import { getHistoryForLineByRange } from "./data/getHistoryForLineByRange";

export default async function Page(
  props: { params: Promise<{ id: number; page?: string }> },
) {
  const searchParams = await props.params;
  const currentPage = Number(searchParams?.page) || 1;
  const lines = await getHistoryForLineByRange(searchParams.id, currentPage);
  const totalPages = await getHistoryForLinesPageCount(searchParams.id);

  return (
    <LineHistoryLayout
      lines={lines}
      totalPages={totalPages}
      onDeleteLine={deleteLine}
    />
  );
}
