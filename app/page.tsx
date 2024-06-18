'use client';

import { useState, useEffect } from 'react';
import { fetchEleganceFilters, fetchEleganceAutomobiles } from '@/utils/api';
import AutomobileList from '@/components/AutomobileList';
import EleganceFilter from '@/components/EleganceFilter';
import Pagination from '@/components/Pagination';
import { FilterData } from '@/interfaces/filterProps';
import { AutomobileListResponse } from '@/interfaces/automobile';

const Home = () => {
    const [eleganceFilters, setEleganceFilters] = useState<FilterData>({ marques: [], models: [], tariffs: [] });
    const [automobiles, setAutomobiles] = useState<AutomobileListResponse | null>(null);
    const [page, setPage] = useState<number>(() => {
        const savedPage = localStorage.getItem('page');
        return savedPage !== null ? Number(savedPage) : 1;
    });
    const [selectedBrands, setSelectedBrands] = useState<string[]>(() => {
        const savedBrands = localStorage.getItem('selectedBrands');
        return savedBrands !== null ? JSON.parse(savedBrands) : [];
    });
    const [selectedModels, setSelectedModels] = useState<string[]>(() => {
        const savedModels = localStorage.getItem('selectedModels');
        return savedModels !== null ? JSON.parse(savedModels) : [];
    });

    useEffect(() => {
        const loadEleganceFilters = async () => {
            const data = await fetchEleganceFilters();
            setEleganceFilters(data);
        };
        loadEleganceFilters();
    }, []);

    useEffect(() => {
        const loadEleganceAutomobiles = async () => {
            const data = await fetchEleganceAutomobiles(selectedBrands, selectedModels, page);
            setAutomobiles(data);
        };
        loadEleganceAutomobiles();
    }, [selectedBrands, selectedModels, page]);

    useEffect(() => {
        // Сохранение состояния в LocalStorage при изменении фильтров или страницы
        console.log('Saving to localStorage:', { page, selectedBrands, selectedModels });
        localStorage.setItem('page', page.toString());
        localStorage.setItem('selectedBrands', JSON.stringify(selectedBrands));
        localStorage.setItem('selectedModels', JSON.stringify(selectedModels));
    }, [page, selectedBrands, selectedModels]);

    return (
        <div className="container">
            <EleganceFilter
                eleganceFilters={eleganceFilters}
                setEleganceFilters={setEleganceFilters}
                setSelectedBrands={setSelectedBrands}
                selectedBrands={selectedBrands}
                setAutomobiles={setAutomobiles}
                page={page}
                selectedModels={selectedModels}
                setSelectedModels={setSelectedModels}
            />
            {automobiles && <AutomobileList automobiles={automobiles.list} />}
            {automobiles && <Pagination page={page} setPage={setPage} totalPages={automobiles.pages} />}
        </div>
    );
};

export default Home;
