'use client';

import { useEffect, useState } from 'react';
import { fetchEleganceFilters, fetchEleganceAutomobiles } from '@/utils/api';
import AutomobileList from '@/components/AutomobileList';
import EleganceFilter from '@/components/EleganceFilter';
import Pagination from '@/components/Pagination';
import { FilterData } from '@/interfaces/filterProps';
import useClientStorage from './hooks/useClientStorage';
import { AutomobileListResponse } from '@/interfaces/automobile';

const Home = () => {
    const [eleganceFilters, setEleganceFilters] = useState<FilterData>({ marques: [], models: [], tariffs: [] });
    const [automobiles, setAutomobiles] = useState<AutomobileListResponse | null>(null);
    const [page, setPage] = useClientStorage<number>('page', 1);
    const [selectedBrands, setSelectedBrands] = useClientStorage<string[]>('selectedBrands', []);
    const [selectedModels, setSelectedModels] = useClientStorage<string[]>('selectedModels', []);

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
