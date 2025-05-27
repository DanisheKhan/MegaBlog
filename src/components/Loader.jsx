import React from 'react';

const Loader = ({ type = "default", size = "medium", text = "Loading..." }) => {
  // Size classes
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-20 h-20",
  };

  // Different loader types
  switch (type) {
    case "rings":
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="loader-rings mb-4">
            <div className="ring-container">
              <div className="loading-ring loading-ring-1"></div>
              <div className="loading-ring loading-ring-2"></div>
              <div className="loading-ring loading-ring-3"></div>
              <div className="dot-pulse">
                <div className="dot-pulse-1"></div>
                <div className="dot-pulse-2"></div>
                <div className="dot-pulse-3"></div>
              </div>
            </div>
          </div>
          {text && <div className="typing-animation">{text}</div>}
        </div>
      );

    case "spinner":
      return (
        <div className="flex flex-col items-center justify-center py-4">
          <div className={`${sizeClasses[size]} animate-spin text-primary`}>
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          {text && <div className="mt-4 typing-animation">{text}</div>}
        </div>
      );

    case "shimmer":
      return (
        <div className="flex flex-col items-center justify-center py-4 w-full">
          <div className="w-full max-w-md">
            <div className="h-4 bg-gray-700/30 rounded shimmer-effect mb-4"></div>
            <div className="h-12 bg-gray-700/30 rounded shimmer-effect mb-4"></div>
            <div className="h-4 bg-gray-700/30 rounded shimmer-effect"></div>
          </div>
          {text && <div className="mt-4 typing-animation">{text}</div>}
        </div>
      );

    case "particles":
      return (
        <div className="relative flex flex-col items-center justify-center py-8">
          <div className="mini-particles-container">
            <div className="mini-particle"></div>
            <div className="mini-particle"></div>
            <div className="mini-particle"></div>
            <div className="mini-particle"></div>
          </div>
          <div className={`${sizeClasses[size]} animate-pulse pulse-glow rounded-full bg-blue-700/30 flex items-center justify-center`}>
            <div className="dot-pulse">
              <div className="dot-pulse-1"></div>
              <div className="dot-pulse-2"></div>
              <div className="dot-pulse-3"></div>
            </div>
          </div>
          {text && <div className="mt-4 typing-animation">{text}</div>}
        </div>
      );

    // Default loader
    default:
      return (
        <div className="flex flex-col items-center justify-center py-4">
          <div className={`${sizeClasses[size]} animate-spin text-blue-500 pulse-glow`}>
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          {text && <div className="mt-2 text-blue-500 font-medium">{text}</div>}
        </div>
      );
  }
};

export default Loader;
