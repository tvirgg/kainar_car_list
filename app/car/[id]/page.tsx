'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Импортируем useParams
import { fetchEleganceAutomobileById } from '@/utils/api';
import { AutomobileDetailResponse } from '@/interfaces/automobile';
import Link from 'next/link';

const CarDetailPage = () => {
    const { id } = useParams();
    const [automobile, setAutomobile] = useState<AutomobileDetailResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const loadAutomobile = async () => {
                try {
                    const data = await fetchEleganceAutomobileById(Number(id));
                    setAutomobile(data);
                } catch (error) {
                    console.error('Error loading automobile:', error);
                    setError('Error loading automobile');
                }
            };
            loadAutomobile();
        }
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!automobile) {
        return <div>Loading...</div>;
    }

    const { item } = automobile;

    return (
        <div className="container">
            <h1>{item?.brand} {item?.model}</h1>
            <p>ID: {item?.id}</p>
            <p>Price: {item?.price}</p>
            {item?.images && item.images.length > 0 && (
                <div className="image-slider">
                    {item.images.map((img, index) => (
                        <img key={index} src={img.image} alt={`Image ${index + 1}`} />
                    ))}
                </div>
            )}
            <p>Tariff: {item?.tarif.length ? item.tarif.join(', ') : 'Пока нет данных'}</p>
            <Link href="/" className="back-button">Back to list</Link>
        </div>
    );
};

export default CarDetailPage;
