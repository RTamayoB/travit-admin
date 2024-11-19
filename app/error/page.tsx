export default async function ErrorPage(
    props: {
            searchParams?: Promise<{
                message?: string
            }>;
    }
) {
    const searchParams = await props.searchParams;
    return (
        <>
            <p>Sorry, something went wrong</p>
            <p>{searchParams?.message}</p>
        </>
    )
}
