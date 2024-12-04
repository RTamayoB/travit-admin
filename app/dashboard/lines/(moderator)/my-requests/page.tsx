import MyLinesRequestsLayout from "@/ui/dashboard/lines/my-requests/MyLineRequestsLayout";
import { deleteLineRequest, getLineRequestsPageCount, getLinesRequestsByRange } from "./actions";

export default async function Page(
  props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }
) {

  const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await getLineRequestsPageCount(query);
    const lineRequests = await getLinesRequestsByRange(query, currentPage);
  return (
    <MyLinesRequestsLayout 
      lineRequests={lineRequests}
      totalPages={totalPages}
      onDeleteLineRequest={deleteLineRequest}
    />
  )
}