export type Agencies = {
    id: number;
    created_at: string;
    name: string;
}

export interface Stop {
    id: number;
    created_at: string;
    name: string;
    description: string;
    position: Position
}

// Map the Agency type to the Option type using a mapped type
type AgencyToOptionMap = {
    [K in keyof Agencies]: K extends 'id' ? 'value' : K extends 'name' ? 'label' : never;
};

export interface UserInfo {
    id: number,
    full_name: string,
    username: string,
    role: string
}

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