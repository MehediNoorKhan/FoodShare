// Skeletons/PageSkeleton.jsx
import React from "react";

const PageSkeleton = () => {
    return (
        <div className="p-6 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-full mb-4"></div>
            <div className="h-40 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        </div>
    );
};

export default PageSkeleton;
