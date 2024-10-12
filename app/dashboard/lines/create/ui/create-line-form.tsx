'use client';

import Map from "@/app/dashboard/components/Map";
import {Agencies, Line, RoutePoint, Stop } from "@/app/lib/definitions";
import Link from "next/link";
import { Button, TextField, Typography } from "@/shared/components/atoms";
import {Dropdown, Option} from "@/shared";
import { useState } from "react";
import MapComponent from "../../[id]/edit/ui/MapComponent";
import {createLine} from "@/app/dashboard/lines/create/data/create-line";
import {Combobox} from "@/shared/components/molecules/Combobox/Combobox";

export default function CreateLineForm({
        stops,
        agencies,
        line
}: {
        stops: Stop[],
        agencies: Agencies[],
        line: Line
}) {
    
    const [routePoints, setRoutePoints] = useState(line.route_points);

    const handleRoutePointsUpdate = (updatedRoutePoints: RoutePoint[]) => {
        setRoutePoints(updatedRoutePoints);
    };

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
    
    const createNewLine = createLine.bind(null)

    return (
        <form action={createNewLine}>
            <TextField id="line_number" label='Numero de Linea' defaultValue={line.line_number}/>
            <TextField id="legacy_line_number" label='Numero anterior de Linea' defaultValue={line.legacy_line_number}/>
            <TextField id="units" label='Numero de Unidades' defaultValue={line.units}/>
            <Dropdown data={line_options} onSelected={() => 1} name='line_type' label="Tipo de Linea"/>
            <Combobox
                data={agencyOptions}
                name="agency_id"
                label="Concesionaria"
                onSelected={() => 1}
            />
            <input type="hidden" name="transport_type" value="bus"/>
            <input type="hidden" name="routePoints" value={JSON.stringify(routePoints)}/>
            <Map position={[20.6597, 256.6500]} zoom={17}>
                <MapComponent
                    stops={stops}
                    routePoints={routePoints}
                    onRoutePointsUpdate={handleRoutePointsUpdate}
                />
            </Map>
            <Typography variant={"note"}>Haz click derecho en cualquier lugar del mapa para colocar un punto de la ruta.</Typography>
            <Typography variant={"note"}>Para mover cualquier punto, arrastralo hacia una nueva posicion.</Typography>
            <Typography variant={"note"}>Si arrastras un punto encima de una parada, este cambiara de color, indicando que esta es una parada del recorrido.</Typography>
            <Typography variant={"note"}>Si arrastras los puntos grises entre dos puntos ya creados, podras añadir bifurcaciones a tu ruta</Typography>
            <Typography variant={"note"}>Para eliminar el ultimo punto de la ruta, has Shift+D</Typography>
            <div>
                <Link href={"/dashboard/lines"}>
                    Cancelar
                </Link>
                <Button type="submit">
                    Crear Linea
                </Button>
            </div>
        </form>
    );
}
