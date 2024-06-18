// interfaces/filterProps.ts
export interface FilterData {
    marques: string[];
    models: { brand: string; models: string[] }[];
    tariffs: string[];
}

export interface FilterProps {
    eleganceFilters: FilterData;
    setEleganceFilters: (filters: FilterData) => void;
}
