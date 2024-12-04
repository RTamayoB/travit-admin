import { getLineRequestsPageCount, getLinesRequestsByRange } from "../../(moderator)/my-requests/actions";

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
  const totalPages = await getLineRequestsPageCount(query);
  const lines = await getLinesRequestsByRange(query, currentPage);


  return (
    <p>Ver solicitudes.</p>
  );
}