'use client';

import { Agency } from "@/app/lib/definitions";
import { Button, LinkButton, TextField } from '@/ui/components';

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
                <TextField id="name" name='name' label='Nombre de la Concesionaria' defaultValue={agency.name} className='formfield'/>
            </div>
            <div className="actions-container">
                <LinkButton label='Cancelar' href={"/dashboard/agencies"} />
                <Button label={submitButtonText} type="submit" />
            </div>
        </form>
    );
}
