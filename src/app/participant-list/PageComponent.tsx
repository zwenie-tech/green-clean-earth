'use client';
import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages && newPage !== currentPage) {
      onPageChange(newPage);
    }
  };

  const getPaginationRange = (): (number | string)[] => {
    const delta = 1; 
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let previous: number | null = null;

   
    range.push(1);

    
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    
    if (totalPages > 1) {
      range.push(totalPages);
    }

   
    for (let page of range) {
      if (previous !== null) {
        if (page - previous > 1) {
          rangeWithDots.push('...'); // Add ellipses for skipped pages
        }
      }
      rangeWithDots.push(page);
      previous = page;
    }

    return rangeWithDots;
  };

  return (
    <div className="flex justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2 my-4 md:px-9">
     
      {currentPage > 1 && (
        <button
          className="text-white text-sm py-2 px-4 bg-[#3C6E1F] hover:bg-[#2e5818] rounded-xl shadow-lg"
          onClick={() => handlePageChange(currentPage - 1)}
          aria-label="Previous Page"
        >
          Previous
        </button>
      )}

     
      <div className="flex justify-center items-center space-x-1">
        {getPaginationRange().map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`dots-${index}`}
                className="text-xl px-2 sm:text-sm"
                aria-hidden="true"
              >
                ...
              </span>
            );
          }

        return (
          <button
            key={page}
            className={`text-xl py-1 px-3 sm:text-sm sm:px-2 sm:py-1 rounded-md ${
              page === currentPage
                ? 'font-bold text-white bg-[#3C6E1F]'
                : 'text-gray-600 hover:text-white hover:bg-[#3C6E1F]'
            }`}
            onClick={() => handlePageChange(page as number)} // Ensure only numbers are passed
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        );
      })}
    </div>

     
      {currentPage < totalPages && (
        <button
          className="text-white text-sm py-2 px-4 bg-[#3C6E1F] hover:bg-[#2e5818] rounded-xl shadow-lg"
          onClick={() => handlePageChange(currentPage + 1)}
          aria-label="Next Page"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default PaginationComponent;
