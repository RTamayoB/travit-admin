import {getStopsPageCount} from "@/app/dashboard/stops/data/get-stops-page-count";
import {getStopsByRange} from "@/app/dashboard/stops/data/get-stops-by-range";
import StopsLayout from "@/ui/dashboard/stops/StopsLayout";
import { deleteStop } from "./data/delete-stop";

export default async function Page(
    props: {
        searchParams?: Promise<{
            query?: string;
            page?: string;
        }>;
    }
) {
    const searchParams = await props.searchParams;

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await getStopsPageCount(query)
    const stops = await getStopsByRange(query, currentPage)

    return (
        <StopsLayout stops={stops} totalPages={totalPages} onDeleteStop={deleteStop} />
    )
}
