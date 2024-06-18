'use client';

import React from 'react';
import AutomobileCard from '@/components/AutomobileCard';
import { Automobile } from '@/interfaces/automobile';

const AutomobileList = ({ automobiles }: { automobiles: Automobile[] }) => {
    return (
        <div className="automobile-list">
            {automobiles.map((automobile) => (
                <AutomobileCard key={automobile.id} automobile={automobile} />
            ))}
        </div>
    );
};

export default AutomobileList;
