import { useSearchParams } from "react-router-dom";
import { useSearchFetch } from "../../services/queries";
import PriceRangeSlider from "./ProceRangeSlider";
import { XMarkIcon } from '@heroicons/react/24/outline';

const FiltersSidebar = ({ showFilters, setShowFilters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  
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
  const { filters } = useSearchFetch(query, getFilterParams());

  const toggleFilter = (attribute, value) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const currentValues = searchParams.getAll(attribute);

    if (currentValues.includes(value)) {
      newSearchParams.delete(attribute);
      currentValues.forEach((val) => {
        if (val !== value) {
          newSearchParams.append(attribute, val);
        }
      });
    } else {
      newSearchParams.append(attribute, value);
    }

    newSearchParams.set("page", "1");
    
    setSearchParams(newSearchParams, { replace: true });
  };

  const isFilterActive = (attribute, value) => {
    const currentValues = searchParams.getAll(attribute);
    return currentValues.includes(value);
  };

  const clearAllFilters = () => {
    const newSearchParams = new URLSearchParams();
    if (query) {
      newSearchParams.set("query", query);
    }
    newSearchParams.set("page", "1");
    setSearchParams(newSearchParams, { replace: true });
  };

  const priceFilter = filters?.find((filter) => filter.attribute === "price");
  const minPrice = priceFilter?.options?.min_price;
  const maxPrice = priceFilter?.options?.max_price;

  const getActiveFilterCount = () => {
    let count = 0;
    for (const [key, value] of searchParams.entries()) {
      if (key !== "query" && key !== "page") {
        count++;
      }
    }
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div
      className={`w-72 bg-white p-5 border-r border-gray-200 shadow-sm ${
        showFilters ? "block" : "hidden"
      } md:block h-full overflow-y-auto`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-3">
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all
            </button>
          )}
          <button
            className="text-gray-500 hover:text-gray-700 md:hidden"
            onClick={() => setShowFilters(false)}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Price Range Slider */}
      {minPrice !== undefined && maxPrice !== undefined && (
        <div className="mb-8 pb-6 border-b border-gray-200">
          <PriceRangeSlider minPrice={minPrice} maxPrice={maxPrice} />
        </div>
      )}

      {/* Other filters */}
      {filters &&
        filters
          .filter((filter) => filter.attribute !== "price")
          .map((filter) => (
            <div key={filter.attribute} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
              <h3 className="font-semibold text-gray-700 mb-3">{filter.label}</h3>
              {Array.isArray(filter.options) && (
                <div className="space-y-2">
                  {filter.options.map((option) => (
                    <div key={option.name} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${filter.attribute}-${option.name}`}
                        checked={isFilterActive(filter.attribute, option.name)}
                        onChange={() => toggleFilter(filter.attribute, option.name)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <label
                        htmlFor={`${filter.attribute}-${option.name}`}
                        className="ml-2 text-sm text-gray-700 cursor-pointer hover:text-gray-900 flex-grow"
                      >
                        {option.label}
                      </label>
                      <span className="text-xs text-gray-500 font-medium ml-1">
                        ({option.count})
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
    </div>
  );
};

export default FiltersSidebar;