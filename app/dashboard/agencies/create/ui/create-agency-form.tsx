'use client';

import {Button, TextField} from "@/shared/components/atoms";
import  '@/app/dashboard/agencies/ui/agency-form.module.scss';
import Link from "next/link";
import { createAgency } from "../data/create-agency";

export default function CreateAgencyForm() {

    return (
        <form className='form-container' action={createAgency}>
            <div className='form-row'>
                <div className='textfield'>
                    <TextField id="name" label='Nombre de la Concesionaria' />
                </div>
            </div>
            <div className="actions-container">
                <Link href={"/dashboard/agencies"}>
                    Cancel
                </Link>
                <Button type="submit">
                    Crear Concesionaria
                </Button>
            </div>
        </form>
    );
}
