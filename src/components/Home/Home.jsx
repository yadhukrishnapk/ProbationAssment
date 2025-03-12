import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/searchnew?query=${encodeURIComponent(search)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-3xl px-6 py-8 bg-white rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-800">
          Search <span className="text-indigo-500">Anything</span>
        </h1>
        
        <div className="relative flex items-center mb-6">
          <input
            type="text"
            placeholder="What are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-4 pl-6 pr-16 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 p-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-200"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <button
            onClick={() => {
              setSearch("popular");
              navigate("/searchnew?query=popular");
            }}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition duration-200"
          >
            Popular
          </button>
          <button
            onClick={() => {
              setSearch("trending");
              navigate("/searchnew?query=trending");
            }}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition duration-200"
          >
            Trending
          </button>
          <button
            onClick={() => {
              setSearch("recent");
              navigate("/searchnew?query=recent");
            }}
            className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition duration-200"
          >
            Recent
          </button>
        </div>
      </div>
      
      <footer className="mt-12 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Yadhukrishna Company. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;