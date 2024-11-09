'use client';

import {Button, TextField} from "@/shared/components/atoms";
import { useState } from "react";
import Map from "@/app/dashboard/components/Map";
import  './stop-form.module.scss';
import {LatLng} from "leaflet";
import Link from "next/link";
import StopMapSelector from "@/app/dashboard/components/StopMapSelector";
import { Stop } from "@/app/lib/definitions";
import StopEditMap from "@/ui/sections/maps/stopeditmap";
import { Typography } from "@/ui/components";

interface StopFormProps {
    stop: Stop,
    onSubmit: (formData: FormData) => Promise<void>;
    submitButtonText: string;
}

export default function StopForm({
    stop,
    onSubmit,
    submitButtonText
}: StopFormProps) {    
    const [marker, setMarker] = useState<LatLng | null>(new LatLng(stop.position.lat, stop.position.lng));
    
    const handleSetMarker = (marker: LatLng) => {
        setMarker(marker);
    };
    
    return (
        <form className='form-container' action={onSubmit}>
            <div className='form-row'>
                <div className='textfield'>
                    <TextField id="name" label='Nombre de Parada' defaultValue={stop.name} />
                </div>
                <div className='textfield'>
                    <TextField id="description" label='Descripcion de la Parada' defaultValue={stop.description}/>
                </div>
            </div>
            <input type="hidden" name="lat" value={marker?.lat}/>
            <input type="hidden" name="lng" value={marker?.lng}/>
            <StopEditMap
                marker={marker}
                onSetMarker={handleSetMarker}
            />
            <Typography variant={"note"}>Haz click derecho en cualquier lugar del mapa para colocar un marcador.</Typography>
            <Typography variant={"note"}>Para moverlo, arrastralo o haz click derecho de nuevo para cambiar su posición.</Typography>
            <div className="actions-container">
                <Link href={"/dashboard/stops"}>
                    Cancel
                </Link>
                <Button type="submit">
                    {submitButtonText}
                </Button>
            </div>
        </form>
    );
}
