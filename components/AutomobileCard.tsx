'use client';

import React from 'react';
import Link from 'next/link';
import { Automobile } from '@/interfaces/automobile';
import PhotoGallery from './PhotoGallery';

const AutomobileCard = ({ automobile }: { automobile: Automobile }) => {
    return (
        <div className="automobile-card">-
            {automobile.images && automobile.images.length > 0 ? (
                <PhotoGallery images={automobile.images} />
            ) : (
                <img src={automobile.image || ''} alt={`${automobile.brand} ${automobile.model}`} />
            )}
            <h3>{automobile.brand} {automobile.model}</h3>
            <p>Reg. Number: {automobile.number}</p>
            <p>Price: {automobile.price}</p>
            <p>Tariff: {automobile.tarif.join(', ')}</p>
            <Link href={`/car/${automobile.id}`}>
                View Details
            </Link>
        </div>
    );
};

export default AutomobileCard;
