import {getAgenciesPageCount} from "@/app/dashboard/agencies/data/get-agencies-page-count";
import {getAgenciesByRange} from "@/app/dashboard/agencies/data/get-agencies-by-range";
import AgencyView from "@/app/dashboard/agencies/ui/AgencyView";

export default async function Page({
    searchParams
} : {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalAgenciesCount = await getAgenciesPageCount(query)
    const agencies = await getAgenciesByRange(query, currentPage)

    return (
        <AgencyView agencies={agencies} totalPages={totalAgenciesCount}/>
    )
}
