import PropTypes from 'prop-types';

const About = ({ darkMode }) => {
  return (
    <div className=" p-4 md:p-8 max-w-4xl mx-auto mt-12">
      <div
        className={`backdrop-filter backdrop-blur-lg bg-opacity-30 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow-lg p-6 md:p-8 animate-fade-in-up`}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-blue-600">
          About AcoNews
        </h1>
        <div
          className={`space-y-4 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <p className="text-lg">
            AcoNews is your premier destination for reliable and up-to-date news
            coverage. We aggregate news from trusted sources worldwide to bring
            you comprehensive coverage of the latest events and developments.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="text-lg">
            To provide accessible, accurate, and timely news information to our
            readers, helping them stay informed about the events that matter
            most.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Real-time news updates</li>
            <li>Categorized news sections</li>
            <li>Advanced search capabilities</li>
            <li>Mobile-responsive design</li>
            <li>Dark/Light mode support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

About.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default About;