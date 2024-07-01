export interface Position {
    lat: number;
    lng: number;
}

export interface BusStop {
    id: number;
    name: string;
    position: Position
}

export interface RoutePoint {
    id: number;
    position: Position;
    isStop: boolean;
    order: number;
    busStop?: BusStop | null;
}

interface Route {
    id: number;
    name: string;
    points: RoutePoint[]
}