'use client';
import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  // Handle page change by invoking the callback from parent
  
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages && newPage !== currentPage) {
      onPageChange(newPage);
    }
  };

  // Helper function to generate pagination range
// Helper function to generate pagination range
const getPaginationRange = (): (number | string)[] => {
  const delta = 1; // Number of pages to show around the current page
  const range: (number | string)[] = [];
  let previous: number | null = null;

  // Always include the first page
  // if (currentPage > 2) {
  //   range.push(1);
  //   if (currentPage > 3) {
  //     range.push('...'); // Add ellipses after the first page if there are skipped pages
  //   }
  // }

  // Add range around the current page (current, one left, one right)
  for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
    range.push(i);
  }
  
  // // Always include the last page
  if (currentPage < totalPages - 1) {
    if (currentPage < totalPages - 2) {
      range.push('...'); // Add ellipses before the last page if there are skipped pages
    }
    range.push(totalPages);
  }

  return range;
};

// Component
return (
  <div className="flex justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2 my-4">
    {/* Previous Button */}
    <button
      className={`text-white text-sm py-2 px-4 ${
        currentPage === 1 ? 'bg-[#6b6767] cursor-not-allowed' : 'bg-[#3C6E1F] hover:bg-[#2e5818]'
      } rounded-xl shadow-lg`}
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      aria-label="Previous Page"
    >
      Previous
    </button>

    {/* Page Numbers */}
    <div className="flex justify-center items-center space-x-1">
      {getPaginationRange().map((page, index) => {
        if (page === '...') {
          return (
            <span key={`dots-${index}`} className="text-xl px-2 sm:text-sm" aria-hidden="true">
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

    {/* Next Button */}
    <button
      className={`text-white text-sm py-2 px-4 ${
        currentPage === totalPages || totalPages === 1
          ? 'bg-[#6b6767] cursor-not-allowed'
          : 'bg-[#3C6E1F] hover:bg-[#2e5818]'
      } rounded-xl shadow-lg`}
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages || totalPages === 1}
      aria-label="Next Page"
    >
      Next
    </button>
  </div>
);

};

export default PaginationComponent;
