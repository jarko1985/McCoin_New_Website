'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const generatePages = () => {
    const delta = 2;
    const pages: (number | string)[] = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      pages.push(i);
    }

    if (currentPage - delta > 2) pages.unshift('...');
    if (currentPage + delta < totalPages - 1) pages.push('...');

    pages.unshift(1);
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pages = generatePages();

  return (
    <nav className="flex items-center gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 bg-white text-[#07153b] border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map((page, idx) =>
        typeof page === 'number' ? (
          <button
            key={idx}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded bg-[#07153b] text-white ${
              page === currentPage ? 'bg-[#07153b] text-white' : ''
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={idx} className="px-2 text-gray-500">
            {page}
          </span>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 border bg-white text-[#07153b] rounded disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
