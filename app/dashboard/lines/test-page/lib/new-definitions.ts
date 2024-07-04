import {Stop} from "@/app/lib/definitions";

export interface Position {
    lat: number;
    lng: number;
}

export interface RoutePoint {
    id: number;
    position: Position;
    isStop: boolean;
    order: number;
    busStop?: Stop | null;
}

export interface Route {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    line_number: string;
    line_legacy_number: string;
    units: number;
    agency_id: number;
    transport_type: string;
    line_type: string;
    points: RoutePoint[];
}