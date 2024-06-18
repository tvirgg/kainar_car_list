'use client';

import React, { useCallback, useEffect } from 'react';
import { FilterProps } from '@/interfaces/filterProps';
import { fetchEleganceAutomobiles, fetchEleganceFilters } from '@/utils/api';
import { AutomobileListResponse } from '@/interfaces/automobile';

interface Props extends FilterProps {
    setSelectedBrands: (brands: string[]) => void;
    selectedBrands: string[];
    setAutomobiles: (data: AutomobileListResponse | null) => void;
    page: number;
    selectedModels: string[];
    setSelectedModels: (models: string[]) => void;
}

const EleganceFilter: React.FC<Props> = ({
    eleganceFilters,
    setEleganceFilters,
    setSelectedBrands,
    selectedBrands,
    setAutomobiles,
    page,
    selectedModels,
    setSelectedModels
}) => {
    useEffect(() => {
        const loadEleganceFilters = async () => {
            const data = await fetchEleganceFilters();
            setEleganceFilters(data);
        };
        loadEleganceFilters();
    }, [setEleganceFilters]);

    const handleBrandClick = useCallback(async (brand: string) => {
        const updatedBrands = selectedBrands.includes(brand)
            ? selectedBrands.filter(b => b !== brand)
            : [...selectedBrands, brand];
        setSelectedBrands(updatedBrands);
        console.log('Brands clicked:', updatedBrands);
        const data = await fetchEleganceAutomobiles(updatedBrands, selectedModels, page);
        setAutomobiles(data);
    }, [selectedBrands, selectedModels, setSelectedBrands, setAutomobiles, page]);

    const handleModelClick = useCallback(async (model: string) => {
        const updatedModels = selectedModels.includes(model)
            ? selectedModels.filter(m => m !== model)
            : [...selectedModels, model];
        setSelectedModels(updatedModels);
        console.log('Models clicked:', updatedModels);
        const data = await fetchEleganceAutomobiles(selectedBrands, updatedModels, page);
        setAutomobiles(data);
    }, [selectedModels, selectedBrands, setSelectedModels, setAutomobiles, page]);

    return (
        <div className="filter">
            <div className="filter-group">
                <h3>Марки</h3>
                {eleganceFilters.marques.map((marque) => (
                    <button
                        key={marque}
                        onClick={() => handleBrandClick(marque)}
                        className={selectedBrands.includes(marque) ? 'active' : ''}
                    >
                        {marque}
                    </button>
                ))}
            </div>
            <div className="filter-group">
                <h3>Модели</h3>
                {eleganceFilters.models
                    .filter(model => selectedBrands.includes(model.brand))
                    .flatMap(modelObj => modelObj.models)
                    .map((model) => (
                        <button
                            key={model}
                            onClick={() => handleModelClick(model)}
                            className={selectedModels.includes(model) ? 'active' : ''}
                        >
                            {model}
                        </button>
                ))}
            </div>
        </div>
    );
};

export default EleganceFilter;
