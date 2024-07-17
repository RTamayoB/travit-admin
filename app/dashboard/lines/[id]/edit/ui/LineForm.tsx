'use client';

import Map from "@/app/dashboard/components/Map";
import {Agencies, Line, RoutePoint, Stop } from "@/app/lib/definitions";
import MapComponent from "./MapComponent";
import Link from "next/link";
import { Button, TextField } from "@/shared/components/atoms";
import {Dropdown, Option} from "@/shared";
import { useState } from "react";
import { saveRoute } from "../lib/edit-line-action";

export default function LineForm({
        stops,
        agencies,
        line
}: {
        stops: Stop[],
        agencies: Agencies[],
        line: Line
}) {
    
    const [routePoints, setRoutePoints] = useState(line.route_points);

    console.log("EDIT ROUTEPOINTS", routePoints)
    
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
    
    const editRoute = saveRoute.bind(null, line.id.toString())
    
    return (
        <form action={editRoute}>
            <TextField id="line_number" label='Numero de Linea' defaultValue={line.line_number}/>
            <TextField id="legacy_line_number" label='Numero anterior de Linea' defaultValue={line.legacy_line_number}/>
            <TextField id="units" label='Numero anterior de Linea' defaultValue={line.units}/>
            <Dropdown data={line_options} onSelected={() => 1} name='line_type' placeholder="Tipo de Linea"/>
            <Dropdown data={agencyOptions} onSelected={() => 1} placeholder="Concesionaria" name="agency_id"/>
            <input type="hidden" name="transport_type" value="bus"/>
            <input type="hidden" name="routePoints" value={JSON.stringify(routePoints)}/>
            <Map position={[20.6597, 256.6500]} zoom={17}>
                <MapComponent
                    stops={stops}
                    routePoints={routePoints}
                    onRoutePointsUpdate={handleRoutePointsUpdate}
                />
            </Map>
            <div>
                <Link href={"/dashboard/lines"}>
                    Cancel
                </Link>
                <Button type="submit">
                    Editar Linea
                </Button>
            </div>
        </form>
    );
}