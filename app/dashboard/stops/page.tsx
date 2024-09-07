import StopView from "@/app/dashboard/stops/ui/StopView";
import {getStopsPageCount} from "@/app/dashboard/stops/data/get-stops-page-count";
import {getStopsByRange} from "@/app/dashboard/stops/data/get-stops-by-range";

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

    const totalPages = await getStopsPageCount(query)
    const stops = await getStopsByRange(query, currentPage)

    return (
        <StopView stops={stops} totalPages={totalPages}/>
    )
}
