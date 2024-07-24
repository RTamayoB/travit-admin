'use client';

import {Button, TextField, Typography} from "@/shared/components/atoms";
import { useState } from "react";
import Map from "../../../../dashboard/components/Map";
import  '@/app/dashboard/stops/ui/stop-form.module.scss';
import {LatLng} from "leaflet";
import Link from "next/link";
import { createStop } from "../data/create-stop";
import StopMapSelector from "@/app/dashboard/components/StopMapSelector";

export default function CreateStopForm() {
    const initialState = { message: null, errors: {} };
    const [marker, setMarker] = useState<LatLng | null>(null);
    
    const handleSetMarker = (marker: LatLng) => {
        setMarker(marker);
    };
    
    return (
        <form className='form-container' action={createStop}>
            <div className='form-row'>
                <div className='textfield'>
                    <TextField id="name" label='Nombre de Parada' />
                </div>
                <div className='textfield'>
                    <TextField id="description" label='Descripcion de la Parada'/>
                </div>
            </div>
            <input type="hidden" name="lat" value={marker?.lat}/>
            <input type="hidden" name="lng" value={marker?.lng}/>
            <div>
                <Map position={[20.6597, 256.6500]} zoom={12}>
                    <StopMapSelector
                        marker={marker}
                        onSetMarker={handleSetMarker}
                    />
                </Map>
            </div>
            <Typography variant={"note"}>LAT: {marker?.lat}</Typography>
            <Typography variant={"note"}>LNG: {marker?.lng}</Typography>
            <Typography variant={"note"}>Haz click derecho en cualquier lugar del mapa para colocar un marcador.</Typography>
            <Typography variant={"note"}>Para moverlo, arrastralo o haz click derecho de nuevo para cambiar su posición.</Typography>
            <div className="actions-container">
                <Link href={"/dashboard/stops"}>
                    Cancel
                </Link>
                <Button type="submit">
                    Crear Parada
                </Button>
            </div>
        </form>
    );
}
