import RoutesLayout from "@/ui/dashboard/routes/RoutesLayout";
import { getRoutesByRange } from "./data/get-routes-by-range";
import { deleteRoute } from "./data/delete-route";
import { getRoutesPageCount } from "./data/get-routes-page-count";

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
  const totalPages = await getRoutesPageCount(query);
  const routes = await getRoutesByRange(query, currentPage);

  return (
    <RoutesLayout
      routes={routes}
      totalPages={totalPages}
      onDeleteRoute={deleteRoute}
    />
  );
}
