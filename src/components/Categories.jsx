
import { useState } from "react";
import PropTypes from 'prop-types';
import ArticleCard from "./ArticleCard";
import LoadingSpinner from "./LoadingSpinner";

const categories = [
  { name: "Technology", icon: "💻" },
  { name: "Business", icon: "💼" },
  { name: "Sports", icon: "⚽" },
  { name: "Entertainment", icon: "🎬" },
  { name: "Health", icon: "🏥" },
  { name: "Science", icon: "🔬" },
  { name: "Politics", icon: "🏛️" },
  { name: "World", icon: "🌍" },
];

const Categories = ({ darkMode, fetchNews }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setLoading(true);
    setError(null);
    try {
      const response = await fetchNews(category.name.toLowerCase());
      setArticles(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 mt-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category)}
            className={`p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 
              ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-50"
              } 
              transition duration-300 text-center`}
          >
            <div className="text-4xl mb-2">{category.icon}</div>
            <h3
              className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {category.name}
            </h3>
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded animate-fade-in">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-fade-in">
          {articles.map((article, index) => (
            <ArticleCard
              key={`${article.url}-${index}`}
              article={article}
              darkMode={darkMode}
            />
          ))}
        </div>
      ) : (
        selectedCategory && (
          <div className="text-center text-gray-500">
            No articles found for {selectedCategory.name}
          </div>
        )
      )}
    </div>
  );
};
Categories.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  fetchNews: PropTypes.func.isRequired,
};
export default Categories;