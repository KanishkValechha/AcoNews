import PropTypes from "prop-types";
import { ExternalLink, Clock } from "lucide-react";

const ArticleCard = ({ article, darkMode }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-110 animate-slide-up article ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="relative pb-[56.25%]">
        <img
          src={article.image || "/api/placeholder/400/225"}
          alt={article.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
      </div>
      <div className="p-4 md:p-6">
        <h2
          className={`text-lg md:text-xl font-semibold mb-2 md:mb-3 transition-colors duration-300 ${
            darkMode ? "hover:text-blue-400" : "hover:text-blue-600"
          }`}
        >
          {article.title}
        </h2>
        <p className={`text-sm md:text-base line-clamp-3 ${darkMode ? "text-gray-300" : "text-gray-600"} mb-4`}>
          {article.description}
        </p>
        <div className="flex justify-between items-center">
          <span className={`text-sm flex items-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            <Clock size={16} className="mr-1" />
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-blue-600 text-white text-sm md:text-base px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Read more
            <ExternalLink size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    publishedAt: PropTypes.string,
    url: PropTypes.string.isRequired,
  }).isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default ArticleCard;
