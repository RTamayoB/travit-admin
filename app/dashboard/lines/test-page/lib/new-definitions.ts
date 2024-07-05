import {Stop} from "@/app/lib/definitions";

export interface Position {
    lat: number;
    lng: number;
}

export interface RoutePoint {
    id: number | null;
    position: Position;
    isStop: boolean;
    order: number;
    busStop: Stop | null;
}

export interface Route {
    id: number;
    created_at: string;
    updated_at: string;
    line_number: string;
    legacy_line_number: string;
    units: number;
    agency_id: number;
    transport_type: string;
    line_type: string;
    points: RoutePoint[] | [];
}