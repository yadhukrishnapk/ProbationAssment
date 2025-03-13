import { useSearchParams } from "react-router-dom";


const usePagination = (totalItems, itemsPerPage = 6) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentPage = parseInt(searchParams.get("page")) || 1;
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.set("page", page.toString());
      setSearchParams(updatedParams);
    }
  };
  

  const getPaginatedData = (data) => {
    return data?.slice(startIndex, endIndex) || [];
  };
  
  return {
    currentPage,
    totalPages,
    handlePageChange,
    getPaginatedData,
    startIndex,
    endIndex
  };
};

export default usePagination;