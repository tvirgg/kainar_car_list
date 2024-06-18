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
    const [page, setPage] = useState(1);
    const [selectedBrand, setSelectedBrand] = useState<string>('');
    const [selectedModels, setSelectedModels] = useState<string[]>([]);

    useEffect(() => {
        const loadEleganceFilters = async () => {
            const data = await fetchEleganceFilters();
            setEleganceFilters(data);
        };
        loadEleganceFilters();
    }, []);

    useEffect(() => {
        const loadEleganceAutomobiles = async () => {
            const data = await fetchEleganceAutomobiles([], [], page);
            setAutomobiles(data);
        };
        loadEleganceAutomobiles();
    }, [page]);

    useEffect(() => {
        const loadFilteredAutomobiles = async () => {
            if (selectedBrand || selectedModels.length > 0) {
                const data = await fetchEleganceAutomobiles([selectedBrand], selectedModels, page);
                setAutomobiles(data);
            }
        };
        loadFilteredAutomobiles();
    }, [selectedBrand, selectedModels, page]);

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
