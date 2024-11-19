import {getAgenciesPageCount} from "@/app/dashboard/agencies/data/get-agencies-page-count";
import {getAgenciesByRange} from "@/app/dashboard/agencies/data/get-agencies-by-range";
import AgenciesLayout from "@/ui/dashboard/agencies/AgenciesLayout";
import { deleteAgency } from "./data/delete-agency";

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
    const totalAgenciesCount = await getAgenciesPageCount(query)
    const agencies = await getAgenciesByRange(query, currentPage)

    return (
        <AgenciesLayout 
        agencies={agencies} 
        totalPages={totalAgenciesCount}
        onDeleteAgency={deleteAgency}
        />
    )
}
