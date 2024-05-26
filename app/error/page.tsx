export default function ErrorPage({
        searchParams,
}: {
        searchParams?: {
            message?: string
        };
}) {
    return (
        <>
            <p>Sorry, something went wrong</p>
            <p>{searchParams?.message}</p>
        </>
    )
}
