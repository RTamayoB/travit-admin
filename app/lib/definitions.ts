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