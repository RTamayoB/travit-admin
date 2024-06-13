'use client';

import {Button, TextField, Typography} from "@/shared/components/atoms";
import Map from "../../../../dashboard/components/Map"
import { useState } from "react";
import  '../../create/create-stop-form.module.scss'
import StopMapSelector from "../../../components/StopMapSelector";
import {LatLng} from "leaflet";
import Link from "next/link";
import {Stop} from "@/app/lib/definitions";
import {editStopById} from "@/app/dashboard/stops/[id]/edit/actions";

export default function EditStopForm({
        stop
} : {
    stop: Stop
}) {
    const initialState = { message: null, errors: {} };
    const [marker, setMarker] = useState<LatLng | null>(new LatLng(stop.location.coordinates[0], stop.location.coordinates[1]));
    
    const handleSetMarker = (marker: LatLng) => {
        setMarker(marker);
    };
    
    const editStop = editStopById.bind(null, stop.id.toString())
    
    return (
        <form className='form-container' action={editStop}>
            <div className='form-row'>
                <div className='textfield'>
                    <TextField id="name" label='Nombre de Parada' defaultValue={stop.name}/>
                </div>
                <div className='textfield'>
                    <TextField id="description" label='Descripcion de la Parada' defaultValue={stop.description}/>
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
                    Editar Parada
                </Button>
            </div>
        </form>
    );
}