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
    order: number;
    position: Position;
    isStop: boolean;
    busStop: Stop | null;
}

export interface Line {
    id: number;
    created_at: string;
    updated_at: string;
    line_number: string;
    legacy_line_number: string;
    units: number;
    agency_id: number;
    transport_type: string;
    line_type: string;
    route_points: RoutePoint[] | [];
}
