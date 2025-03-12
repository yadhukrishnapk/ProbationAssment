import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearchFetch } from "../../services/queries";
import { useState } from "react";
import FiltersSidebar from "./FilterSidebar";
import SearchResults from "./SearchResults";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [showFilters, setShowFilters] = useState(true);

  return (
    <div className="p-4 flex">
      <FiltersSidebar
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      <SearchResults query={query} showFilters={showFilters} />
    </div>
  );
};

export default Search;