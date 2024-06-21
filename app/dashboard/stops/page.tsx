import {Typography} from "@/shared/components";
import StopView from "@/app/dashboard/stops/ui/StopView";
import {fetchStopPages} from "./lib/get-stops-page-count";
import {fetchFilteredStops} from "@/app/dashboard/stops/lib/get-filtered-stops-action";

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

    const totalPages = await fetchStopPages(query)
    const stops = await fetchFilteredStops(query, currentPage)

    return (
        <>
            <div>
                <Typography variant="h5" bold>
                    Paradas
                </Typography>
                <StopView
                    stops={stops}
                    totalPages={totalPages}
                />
            </div>
        </>
    )
}
