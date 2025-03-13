import React from 'react';
const usePaginationUI = (currentPage, totalPages, handlePageChange) => {
  const renderPagination = () => {
    if (totalPages <= 0) return null;
    
    return (
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Prev
        </button>
        
        {totalPages <= 7 ? (
          [...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))
        ) : (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className={`px-4 py-2 rounded ${
                currentPage === 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
              }`}
            >
              1
            </button>
                        {currentPage > 3 && <span className="px-2 self-center">...</span>}
            
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              if (
                (pageNum !== 1 && pageNum !== totalPages) && 
                (pageNum === currentPage - 1 || pageNum === currentPage || pageNum === currentPage + 1)
              ) {
                return (
                  <button
                    key={index}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 rounded ${
                      currentPage === pageNum ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              }
              return null;
            })}
            
            {currentPage < totalPages - 2 && <span className="px-2 self-center">...</span>}
            
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };

  return { renderPagination };
};

export default usePaginationUI;