import {
  deleteLineRequest,
  getAllLineRequestsByRange,
  getAllLineRequestsPageCount,
} from "./actions";
import AllLinesRequestsLayout from "@/ui/dashboard/lines/requests/AllLineRequestsLayout";

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
  const totalPages = await getAllLineRequestsPageCount(query);
  const lineRequests = await getAllLineRequestsByRange(query, currentPage);
  return (
    <AllLinesRequestsLayout
      lineRequests={lineRequests}
      totalPages={totalPages}
      onDeleteLineRequest={deleteLineRequest}
    />
  );
}
