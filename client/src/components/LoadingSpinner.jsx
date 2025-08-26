import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative w-20 h-20">
        {/* Outer ring */}
        <div className="absolute w-full h-full border-4 border-gray-300 rounded-full"></div>
        
        {/* Spinning gradient ring */}
        <div className="absolute w-full h-full border-4 border-t-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>

        {/* Center circle with pulse */}
        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
