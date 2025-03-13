import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearchFetch } from "../../services/queries";
import { useState, useEffect } from "react";
import { updateHeaders } from "../../services/fetcher";
import usePagination from "../../hooks/usePagination";
import usePaginationUI from "../../hooks/usePaginationUI";

const SearchResults = ({ query, showFilters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("relevance");
  const [selectedIndex, setSelectedIndex] = useState("qa-en"); 
  const [searchValue, setSearchValue] = useState(query);

  useEffect(() => {
    updateHeaders(selectedIndex);
  }, [selectedIndex]);

  const handleIndexChange = (e) => {
    const newIndex = e.target.value;
    setSelectedIndex(newIndex);
  };

  const getFilterParams = () => {
    const filterParams = {};
    for (const [key, value] of searchParams.entries()) {
      if (key !== "query" && key !== "page") {
        if (key === "min_price" || key === "max_price") {
          if (!filterParams.price_range) {
            filterParams.price_range = {};
          }
          filterParams.price_range[key] = value;
        } else {
          if (!filterParams[key]) {
            filterParams[key] = [];
          }
          filterParams[key].push(value);
        }
      }
    }
    return filterParams;
  };

  const filterParams = getFilterParams();
  const { data, isLoading, error } = useSearchFetch(query, filterParams);

  const sortedData = data
    ? [...data].sort((a, b) => {
        if (sortOption === "low-to-high") {
          return a.sale_price - b.sale_price;
        }
        if (sortOption === "high-to-low") {
          return b.sale_price - a.sale_price;
        }
        return 0; 
      })
    : [];

  const totalItems = sortedData?.length || 0;
  
  const { currentPage, totalPages, handlePageChange, getPaginatedData } = usePagination(totalItems);
  const paginatedData = getPaginatedData(sortedData);
  
  const { renderPagination } = usePaginationUI(currentPage, totalPages, handlePageChange);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.set("query", searchValue);
      updatedParams.set("page", "1");
      setSearchParams(updatedParams);
    }
  };

  return (
    <div className={`flex-1 p-4 ${showFilters ? 'ml-0' : 'ml-0'}`}>
      <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search products..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
        >
          Search
        </button>
      </form>

      <h1 className="text-xl font-bold mb-4">Search Results for "{query}"</h1>

      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">Showing {totalItems} results</p>

        <div className="flex space-x-4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="relevance">Relevance</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>

          <select
            value={selectedIndex}
            onChange={handleIndexChange}
            className="border p-2 rounded-md"
          >
            <option value="qa-en">English Index (qa-en)</option>
            <option value="qa-ar">Arabic Index (qa-ar)</option>
          </select>
        </div>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Failed to fetch search results</p>}

      {!isLoading && !error && totalItems > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedData.map((item) => (
              <div
                key={item.id}
                className="border p-4 rounded shadow hover:shadow-lg transition-shadow"
              >
                <div className="h-48 flex items-center justify-center bg-gray-100">
                  <img
                    src={item.image_link}
                    alt={item.title}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150?text=No+Image";
                    }}
                  />
                </div>
                <h2 className="text-lg font-semibold mt-2 truncate">{item.title}</h2>
                <p className="text-gray-500">{item.brand}</p>
                <p className="text-green-600 font-bold">{item.sale_price}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full text-center"
                >
                  View Product
                </a>
              </div>
            ))}
          </div>

          {renderPagination()}
        </>
      )}

      {!isLoading && !error && totalItems === 0 && (
        <div className="text-center">
          <p className="text-gray-500">No results found for "{query}".</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;