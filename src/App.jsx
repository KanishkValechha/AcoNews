import { useState, useEffect, useCallback } from "react";
import { Search, Sun, Moon } from "lucide-react";
import LoadingSpinner from "./components/LoadingSpinner";
import ArticleCard from "./components/ArticleCard";
import "./index.css";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://gnews.io/api/v4/search";


const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const fetchNews = useCallback(async (query = "latest") => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_URL}?q=${encodeURIComponent(
          query
        )}&lang=en&country=us&max=9&apikey=${API_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.json();
      setArticles(data.articles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(searchQuery.trim() === "" ? "latest" : searchQuery);
  };

  const toggleDarkMode = () => {
    setTimeout(() => {
      setDarkMode(!darkMode);
    }, 300); 
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"} `}>
      <div className="flex justify-between items-center mb-8 md:mb-12">
        <h1 className={`text-4xl md:text-6xl font-extrabold text-center flex-1 text-blue-600 animate-fade-in-down`}>
          AcoNews
        </h1>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          {darkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-800" />}
        </button>
      </div>
      <form
        onSubmit={handleSearch}
        className="mb-8 md:mb-12 max-w-3xl mx-auto animate-fade-in-up"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full px-4 py-3 md:py-4 pl-12 pr-20 rounded-full border ${darkMode ? "bg-gray-800 text-white border-gray-700 placeholder-gray-400" : "bg-white text-gray-800 border-gray-300 placeholder-gray-500"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
          />
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 md:px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Search
          </button>
        </div>
      </form>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded animate-fade-in">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in">
          {articles.map((article, index) => (
            <ArticleCard
              key={`${article.url}-${index}`}
              article={article}
              darkMode={darkMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
