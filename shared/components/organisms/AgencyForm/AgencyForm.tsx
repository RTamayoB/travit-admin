'use client';

import {Button, TextField} from "@/shared/components/atoms";
import styles from './agency-form.module.scss'
import Link from "next/link";
import { Agency } from "@/app/lib/definitions";

interface AgencyFormProps {
    agency: Agency;
    onSubmit: (formData: FormData) => Promise<void>;
    submitButtonText: string;
  }
  

export default function AgencyForm({
    agency,
    onSubmit,
    submitButtonText
}: AgencyFormProps
) {

    return (
        <form className='form-container' action={onSubmit}>
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
                    {submitButtonText}
                </Button>
            </div>
        </form>
    );
}
