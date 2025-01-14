import LineHistoryLayout from "../../../../../../ui/dashboard/lines/history/LineHistoryLayout";
import { getHistoryForLinesPageCount } from "./data/getHistoryForLineById";
import { getHistoryForLineByRange } from "./data/getHistoryForLineByRange";

export default async function Page(
  props: { params: Promise<{ id: number; page?: string }> },
) {
  const searchParams = await props.params;
  const currentPage = Number(searchParams?.page) || 1;
  const history = await getHistoryForLineByRange(searchParams.id, currentPage);
  const totalPages = await getHistoryForLinesPageCount(searchParams.id);

  return (
    <LineHistoryLayout
      lineId={searchParams.id}
      history={history}
      totalPages={totalPages}
    />
  );
}
