import React from "react";

const FoodDetailsSkeleton = () => {
    return (
        <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl p-6 animate-pulse">
            <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>

            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>

            <div className="h-10 bg-gray-300 rounded"></div>
        </div>
    );
};

export default FoodDetailsSkeleton;
