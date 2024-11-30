import { useState, useEffect, useCallback } from "react";
import { Search, Sun, Moon } from "lucide-react";
import LoadingSpinner from "./components/LoadingSpinner";
import Categories from "./components/Categories";
import ArticleCard from "./components/ArticleCard";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://gnews.io/api/v4/search";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      setArticles(data.articles);  // Set articles in state
      return data.articles;  // Still return for Categories component
    } catch (err) {
      setError(err.message);
      return [];
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

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await fetchNews(searchQuery.trim() === "" ? "latest" : searchQuery);
    setArticles(results);
  };

  const toggleDarkMode = () => {
    setTimeout(() => {
      setDarkMode(!darkMode);
    }, 300); 
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div
        className={`min-h-screen ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
        }`}
      >
        <nav
          className={`fixed top-0 left-0 right-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-30 ${
            darkMode ? "bg-gray-800" : "bg-white"
          } shadow-lg`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="text-2xl md:text-3xl font-extrabold text-blue-600">
                AcoNews
              </Link>
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/"
                  className={`${
                    darkMode ? "text-white" : "text-black"
                  } hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Home
                </Link>
                <Link
                  to="/categories"
                  className={`${
                    darkMode ? "text-white" : "text-black"
                  } hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Categories
                </Link>
                <Link
                  to="/about"
                  className={`${
                    darkMode ? "text-white" : "text-black"
                  } hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium`}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className={`${
                    darkMode ? "text-white" : "text-black"
                  } hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Contact
                </Link>
                <button
                  onClick={toggleDarkMode}
                  className="ml-4 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                  {darkMode ? (
                    <Sun className="text-yellow-400" />
                  ) : (
                    <Moon className="text-gray-600" />
                  )}
                </button>
              </div>
              <div className="md:hidden flex items-center">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mr-2"
                >
                  {darkMode ? (
                    <Sun className="text-yellow-400" />
                  ) : (
                    <Moon className="text-gray-600" />
                  )}
                </button>
                <button
                  onClick={toggleMenu}
                  className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <div className="w-8 h-8 flex items-center justify-center relative">
                    <span
                      className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${
                        isMenuOpen ? "rotate-45" : "-translate-y-1.5"
                      }`}
                    ></span>
                    <span
                      className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${
                        isMenuOpen ? "opacity-0" : "opacity-100"
                      }`}
                    ></span>
                    <span
                      className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${
                        isMenuOpen ? "-rotate-45" : "translate-y-1.5"
                      }`}
                    ></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>
        <div
          className={`md:hidden fixed top-16 right-0 w-56 backdrop-filter backdrop-blur-lg bg-opacity-30 z-10 h-64 ${
            darkMode ? "bg-gray-800" : "bg-white"
          } transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out shadow-lg flex flex-col justify-center rounded-lg`}
        >
          <div className="px-2 pt-4 pb-4 space-y-4 sm:px-3 text-center">
            <Link
              to="/"
              className={`${
                darkMode ? "text-white" : "text-black"
              } hover:text-blue-600 block px-3 py-2 rounded-md text-xl font-medium`}
            >
              Home
            </Link>
            <Link
              to="/categories"
              className={`${
                darkMode ? "text-white" : "text-black"
              } hover:text-blue-600 block px-3 py-2 rounded-md text-xl font-medium`}
            >
              Categories
            </Link>
            <Link
              to="/about"
              className={`${
                darkMode ? "text-white" : "text-black"
              } hover:text-blue-600 block px-3 py-2 rounded-md text-xl font-medium`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`${
                darkMode ? "text-white" : "text-black"
              } hover:text-blue-600 block px-3 py-2 rounded-md text-xl font-medium`}
            >
              Contact
            </Link>
          </div>
        </div>

        <Routes>
          <Route
            path="/categories"
            element={
              <Categories darkMode={darkMode} fetchNews={fetchNews} />
            }
          />
          <Route
            path="/about"
            element={<About darkMode={darkMode} />}
          />
          <Route
            path="/contact"
            element={<Contact darkMode={darkMode} />}
          />
          <Route
            path="/"
            element={
              <main className="pt-28 p-4 md:p-8">
                <form
                  onSubmit={handleSearch}
                  className="mb-8 md:mb-12 max-w-3xl mx-auto animate-fade-in-up  lg:mt-12 md:mt-12"
                >
                  <div className="relative backdrop-filter backdrop-blur-lg bg-opacity-30 rounded-full shadow-lg">
                    <input
                      type="text"
                      placeholder="Search news..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full px-4 py-3 md:py-4 pl-12 pr-20 rounded-full border ${
                        darkMode
                          ? "bg-gray-800 bg-opacity-50 text-gray-100 border-gray-700 placeholder-gray-400"
                          : "bg-white bg-opacity-50 text-gray-800 border-gray-300 placeholder-gray-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
                    />
                    <Search
                      className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
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
              </main>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
