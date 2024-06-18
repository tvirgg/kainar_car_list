'use client';

import React, { useState, useCallback } from 'react';
import { FilterProps } from '@/interfaces/filterProps';
import { fetchEleganceAutomobiles } from '@/utils/api';
import { AutomobileListResponse } from '@/interfaces/automobile';

interface Props extends FilterProps {
    setSelectedBrand: (brand: string) => void;
    selectedBrand: string;
    setAutomobiles: (data: AutomobileListResponse | null) => void;
    page: number;
}

const EleganceFilter: React.FC<Props> = ({ eleganceFilters, setEleganceFilters, setSelectedBrand, selectedBrand, setAutomobiles, page }) => {
    const [selectedModels, setSelectedModels] = useState<string[]>([]);

    const handleBrandClick = useCallback(async (brand: string) => {
        setSelectedBrand(brand);
        setSelectedModels([]);
        const data = await fetchEleganceAutomobiles([brand], [], page);
        setAutomobiles(data);
    }, [setSelectedBrand, setSelectedModels, setAutomobiles, page]);

    const handleModelClick = useCallback(async (model: string) => {
        const updatedModels = selectedModels.includes(model)
            ? selectedModels.filter(m => m !== model)
            : [...selectedModels, model];

        setSelectedModels(updatedModels);
        const data = await fetchEleganceAutomobiles([selectedBrand], updatedModels, page);
        setAutomobiles(data);
    }, [selectedModels, selectedBrand, setAutomobiles, page]);

    return (
        <div className="filter">
            <div className="filter-group">
                <h3>Марки</h3>
                {eleganceFilters.marques.map((marque) => (
                    <button
                        key={marque}
                        onClick={() => handleBrandClick(marque)}
                        className={selectedBrand === marque ? 'active' : ''}
                    >
                        {marque}
                    </button>
                ))}
            </div>
            <div className="filter-group">
                <h3>Модели</h3>
                {eleganceFilters.models
                    .filter(model => model.brand === selectedBrand)
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
