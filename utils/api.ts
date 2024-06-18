import axios from 'axios';
import { FilterData } from '@/interfaces/filterProps';
import { AutomobileDetailResponse, AutomobileListResponse } from '@/interfaces/automobile';

const BASE_URL = 'https://test.taxivoshod.ru/api/test/';

export const fetchEleganceFilters = async (): Promise<FilterData> => {
    try {
        const response = await axios.get(`${BASE_URL}?w=catalog-filter`);
        const data: FilterData = {
            marques: response.data.brands.values,
            models: response.data.models.values,
            tariffs: Object.values(response.data.tarif.values)
        };
        return data;
    } catch (error) {
        console.error('Error fetching filters:', error);
        throw error;
    }
};

export const fetchEleganceAutomobiles = async (brands: string[], models: string[], page: number = 1): Promise<AutomobileListResponse> => {
    try {
        const queryParams = new URLSearchParams();
        queryParams.append('w', 'catalog-cars');
        brands.forEach(brand => queryParams.append('brand[]', brand));
        models.forEach(model => queryParams.append('model[]', model));
        queryParams.append('page', page.toString());

        const response = await axios.get(`${BASE_URL}?${queryParams.toString()}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching automobiles:', error);
        throw error;
    }
};

export const fetchEleganceAutomobileById = async (id: number): Promise<AutomobileDetailResponse> => {
    try {
        const response = await axios.get(`${BASE_URL}?w=catalog-car&id=${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching automobile by ID:', error);
        throw error;
    }
};
