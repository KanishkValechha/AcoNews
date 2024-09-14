const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center mb-8 animate-fade-in">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;