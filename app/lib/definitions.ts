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

// Map the Agency type to the Option type using a mapped type
type AgencyToOptionMap = {
    [K in keyof Agencies]: K extends 'id' ? 'value' : K extends 'name' ? 'label' : never;
};