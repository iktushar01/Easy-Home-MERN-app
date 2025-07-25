import React from "react";

const LoadingSpinner = ({ fullScreen = true }) => {
  return (
    <div className={`flex justify-center items-center ${fullScreen ? "min-h-screen" : ""}`}>
      <span 
        className="loading loading-spinner text-primary" 
        role="status"
        aria-label="Loading"
      ></span>
    </div>
  );
};

export default LoadingSpinner;