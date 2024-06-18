export interface Automobile {
    id: number;
    brand: string;
    model: string;
    number: string;
    price: number;
    image: string | null;
    tarif: string[];
}


export interface AutomobileListResponse {
    result: number;
    page: string;
    pages: number;
    per_page: number;
    list: Automobile[];
}

export interface AutomobileDetail {
    brand: string;
    model: string;
    id: number;
    price: number;
    images: { image: string }[] | null;
    tarif: string[];
}

export interface AutomobileDetailResponse {
    result: number;
    item?: AutomobileDetail;
    message?: string;
}