import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const PriceRangeSlider = ({ minPrice, maxPrice }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const safeMinPrice = minPrice ?? 0;
  const safeMaxPrice = maxPrice ?? 10000;
  const [priceRange, setPriceRange] = useState({ min: safeMinPrice, max: safeMaxPrice });
  const [currentRange, setCurrentRange] = useState({
    min: parseInt(searchParams.get("min_price")) || safeMinPrice,
    max: parseInt(searchParams.get("max_price")) || safeMaxPrice,
  });

  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    setPriceRange({ min: safeMinPrice, max: safeMaxPrice });

    const urlMin = parseInt(searchParams.get("min_price")) || safeMinPrice;
    const urlMax = parseInt(searchParams.get("max_price")) || safeMaxPrice;

    setCurrentRange({
      min: Math.max(safeMinPrice, urlMin),
      max: Math.min(safeMaxPrice, urlMax),
    });
  }, [minPrice, maxPrice, searchParams]);

  const updateSearchParams = (newRange) => {
    if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);

    debounceTimeoutRef.current = setTimeout(() => {
      const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("min_price", newRange.min.toString());
      newSearchParams.set("max_price", newRange.max.toString());
      
      if (searchParams.has("page")) {
        newSearchParams.set("page", "1"); 
      }
      
      setSearchParams(newSearchParams, { replace: true });
    }, 300);
  };

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value) || safeMinPrice;
    const newMin = Math.max(safeMinPrice, Math.min(value, currentRange.max));
    const newRange = { ...currentRange, min: newMin };
    setCurrentRange(newRange);
    updateSearchParams(newRange);
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value) || safeMaxPrice;
    const newMax = Math.min(safeMaxPrice, Math.max(value, currentRange.min));
    const newRange = { ...currentRange, max: newMax };
    setCurrentRange(newRange);
    updateSearchParams(newRange);
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between mb-2">
        <span>Price Range</span>
        <span>{currentRange.min} - {currentRange.max}</span>
      </div>
 min
      <input
        type="range"
        min={priceRange.min}
        max={priceRange.max}
        value={currentRange.min}
        onChange={handleMinChange}
        className="w-full mb-2"
      />
      <input
        type="range"
        min={priceRange.min}
        max={priceRange.max}
        value={currentRange.max}
        onChange={handleMaxChange}
        className="w-full"
      />
      max
    </div>
  );
};

export default PriceRangeSlider;