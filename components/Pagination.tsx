'use client';

import React from 'react';
import { PaginationProps } from '@/interfaces/paginationProps';

const Pagination: React.FC<PaginationProps> = ({ page, setPage, totalPages }) => {
    return (
        <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => setPage(index + 1)}
                    disabled={page === index + 1}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
