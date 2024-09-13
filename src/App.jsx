import { useState, useEffect, useCallback } from "react";
import { Search, ExternalLink, Clock } from "lucide-react";
import "./index.css";

const API_KEY = "462221edaad145266cbe4347d423b2ed";
const API_URL = "https://gnews.io/api/v4/search";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_URL}?q=${
          searchQuery || "latest"
        }&lang=en&country=us&max=10&apikey=${API_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.json();
      setArticles(data.articles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-8">
      <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-8 md:mb-12 bg-clip-text text-white animate-fade-in-down">
        AcoNews
      </h1>

      <form
        onSubmit={handleSearch}
        className="mb-8 md:mb-12 max-w-2xl mx-auto animate-fade-in-up"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 md:py-4 pl-12 pr-20 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white px-4 md:px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300"
          >
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center items-center mb-8">
          <div className="loader"></div>
        </div>
      ) : error ? (
        <div className="bg-red-900 border-l-4 border-red-500 text-white p-4 mb-8 rounded-r-lg animate-fade-in">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article, index) => (
            <div
              key={`${article.url}-${index}`}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-103 hover:shadow-xl transition-all duration-200 ease-in-out animate-fade-in-up"
            >
              <div className="relative pb-[56.25%]">
                <img
                  src={article.image || "/api/placeholder/400/225"}
                  alt={article.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
              </div>
              <div className="p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3 line-clamp-2 hover:line-clamp-none text-white">
                  {article.title}
                </h2>
                <p className="text-gray-300 mb-4 text-sm md:text-base line-clamp-3 hover:line-clamp-none">
                  {article.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm flex items-center">
                    <Clock size={16} className="mr-1" />
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-purple-600 text-white text-sm md:text-base px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300"
                  >
                    Read more
                    <ExternalLink size={16} className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
