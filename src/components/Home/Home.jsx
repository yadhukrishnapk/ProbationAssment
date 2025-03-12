import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/searchnew?query=${encodeURIComponent(search)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <input
        type="text"
        placeholder="Search for products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border rounded w-1/2"
      />
      <button 
        onClick={handleSearch} 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Search
      </button>
    </div>
  );
};

export default Home;
