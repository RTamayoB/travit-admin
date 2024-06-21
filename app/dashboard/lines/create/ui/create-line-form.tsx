'use client';

import {Agencies} from "@/app/lib/definitions";
import "@/app/dashboard/lines/create/ui/create-line-form.scss"
import Map from "../../../../dashboard/components/Map"
import Link from "next/link";
import {Button, Dropdown, Option, TextField} from "@/shared/components";
import { createLine } from "../lib/create-line-action";
import LineDrawer from "./LineDrawer";

export default function CreateLineForm({ agencies }: { agencies: Agencies[] }) {
    const initialState = { message: null, errors: {} };
    
    const agencyOptions: Option[] = agencies.map((agency) => ({
        label: agency.name,
        value: agency.id.toString(), // Assuming value needs to be a string
    }));
    
    const line_options : Option[] = [
        { label: 'Troncal', value: 'troncal'},
        { label: 'Complementaria', value: 'complementaria'},
        { label: 'Alimentadora', value: 'alimentadora'},
        { label: 'Linea', value: 'linea'},
    ]
    
    return (
        <form className="form-container" action={createLine}>
            <div className="form-row">
                <div className="MuiFormControl-root">
                    <TextField id="line_number" label='Nombre de Linea'/>
                </div>
                <div className="MuiFormControl-root">
                    <TextField id={"legacy_line_number"} label={'Nombre anterior de Linea'}/>
                </div>
                <div className="MuiFormControl-root">
                    <Dropdown data={line_options} onSelected={selected => 1} name='line_type' placeholder="Tipo de Linea"/>
                </div>
            </div>
            <div className="form-row">
                <div className="MuiFormControl-root">
                    <Dropdown data={agencyOptions} onSelected={selected => 1} placeholder="Concesionaria" name="agency_id"/>
                </div>
                <div className="MuiFormControl-root">
                    <TextField id={"units"} label={'N. unidades'}/>
                </div>
                <input type="hidden" name="transport_type" value="bus"/>
            </div>
            <div>
                <Map position={[20.6597, 256.6500]} zoom={12}>
                    <LineDrawer/>
                </Map>
            </div>
            <div className="actions-container">
                <Link href={"/dashboard/lines"}>
                    Cancel
                </Link>
                <Button type="submit">
                    Create Line
                </Button>
            </div>
        </form>
    )
}