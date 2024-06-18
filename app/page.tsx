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
    
    const [selectedBrand, setSelectedBrand] = useState<string>(() => {
        const savedBrand = localStorage.getItem('selectedBrand');
        return savedBrand !== null ? savedBrand : '';
    });
    
    const [selectedModels, setSelectedModels] = useState<string[]>(() => {
        const savedModels = localStorage.getItem('selectedModels');
        return savedModels !== null ? JSON.parse(savedModels) : [];
    });
    

    useEffect(() => {
        // Чтение состояния из LocalStorage при первой загрузке
        const savedPage = localStorage.getItem('page');
        const savedBrand = localStorage.getItem('selectedBrand');
        const savedModels = JSON.parse(localStorage.getItem('selectedModels') || '[]');
        // console.log('Loaded from localStorage:', { savedPage, savedBrand, savedModels });
    
        if (savedPage) setPage(Number(savedPage));
        if (savedBrand) setSelectedBrand(savedBrand);
        setSelectedModels(savedModels);
    }, []);

    useEffect(() => {
        const loadEleganceFilters = async () => {
            const data = await fetchEleganceFilters();
            setEleganceFilters(data);
        };
        loadEleganceFilters();
    }, []);

    useEffect(() => {
        const loadEleganceAutomobiles = async () => {
            const data = await fetchEleganceAutomobiles([selectedBrand], selectedModels, page);
            setAutomobiles(data);
        };
        loadEleganceAutomobiles();
    }, [selectedBrand, selectedModels, page]);

    useEffect(() => {
        // Сохранение состояния в LocalStorage при изменении фильтров или страницы
        // console.log('Saving to localStorage:', { page, selectedBrand, selectedModels });
        localStorage.setItem('page', page.toString());
        localStorage.setItem('selectedBrand', selectedBrand);
        localStorage.setItem('selectedModels', JSON.stringify(selectedModels));
    }, [selectedBrand, selectedModels]);

    return (
        <div className="container">
            <EleganceFilter
                eleganceFilters={eleganceFilters}
                setEleganceFilters={setEleganceFilters}
                setSelectedBrand={setSelectedBrand}
                selectedBrand={selectedBrand}
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
