'use client';

import {Button, TextField} from "@/shared/components/atoms";
import  '@/app/dashboard/agencies/ui/agency-form.module.scss'
import Link from "next/link";
import {Agencies} from "@/app/lib/definitions";
import { editAgencyById } from "../data/edit-agency";

export default function EditAgencyForm({
        agency
} : {
    agency: Agencies
}) {
    const editAgency = editAgencyById.bind(null, agency.id.toString())

    return (
        <form className='form-container' action={editAgency}>
            <div className='form-row'>
                <div className='textfield'>
                    <TextField id="name" label='Nombre de la Concesionaria' defaultValue={agency.name}/>
                </div>
            </div>
            <div className="actions-container">
                <Link href={"/dashboard/agencies"}>
                    Cancel
                </Link>
                <Button type="submit">
                    Editar Concesionaria
                </Button>
            </div>
        </form>
    );
}