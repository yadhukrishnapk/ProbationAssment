import useSWR from "swr";
import fetcher from "../services/fetcher";

export function useSearchFetch(query, filters = {}) {
  const formatFilters = (filtersObj) => {
    const formattedFilters = {};
    for (const [key, values] of Object.entries(filtersObj)) {
      if (key !== "price_range") {
        formattedFilters[key] = values;
      }
    }
    if (filtersObj.price_range) {
      const minPrice = parseInt(filtersObj.price_range.min_price) || 0;
      const maxPrice = parseInt(filtersObj.price_range.max_price) || 0;

      if (minPrice > 0 || maxPrice > 0) {
        formattedFilters.price = [minPrice, maxPrice];
      }
    }

    return Object.keys(formattedFilters).length > 0
      ? formattedFilters
      : undefined;
  };

  const formattedFilters = formatFilters(filters);

  const options = {
    search: query,
    size: 50,
    sort_by: "1",
  };

  if (formattedFilters) {
    options.filter = formattedFilters;
  }

  const swrKey = query ? ["/search", JSON.stringify(options)] : null;

  const { data, error, isLoading } = useSWR(
    swrKey,
    ([url, requestOptions]) => fetcher(url, requestOptions),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      dedupingInterval: 0,
    }
  );

  return {
    data: data?.items || [],
    filters: data?.filter_list || [],
    error,
    isLoading,
  };
}

export function useSearchData() {
  return useSWR("/search", fetcher);
}

export function useUser() {
  return useSWR("/users", fetcher);
}

export function useUserDetail(id) {
  return useSWR(id ? `/users/${id}` : null, fetcher);
}
