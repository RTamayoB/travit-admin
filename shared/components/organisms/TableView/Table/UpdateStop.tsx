import { LinkButton } from "../../../../../shared/components/atoms";

export function UpdateStop({ id }: { id: string }) {
    return (
        <LinkButton label='Editar' href={`/dashboard/stops/${id}/edit`}/>
    );
}