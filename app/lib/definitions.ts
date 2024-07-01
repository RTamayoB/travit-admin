export type Line = {
    id: string;
    created_at: string;
    name: string;
}

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
    location: Location
}

export interface Location {
    type: string;
    coordinates: number[]
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

//NEW DEFINITIONS FOR MAPS AND DB

export interface Point {
    lat: number,
    lng: number
}

export interface Polyline {
    points: Point[]
}

export interface NewStop {
    id: number,
    location: Point
}

export interface Step {
    id: number,
    sequence_number: number,
    polyline: Polyline,
    startStop: NewStop,
    endStop: NewStop
}

export interface Route {
    id: number,
    name: string,
    steps: Step[]
}