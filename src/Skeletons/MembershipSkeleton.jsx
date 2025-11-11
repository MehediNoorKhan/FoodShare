import React from "react";

const MembershipSkeleton = () => {
    return (
        <div className="w-full max-w-xl bg-green-100/90 shadow-lg rounded-2xl p-8 animate-pulse">
            {/* Title */}
            <div className="h-8 bg-green-200 rounded mb-4 w-3/4 mx-auto"></div>
            {/* Text lines */}
            <div className="h-4 bg-green-200 rounded mb-2 w-full"></div>
            <div className="h-4 bg-green-200 rounded mb-2 w-full"></div>
            <div className="h-4 bg-green-200 rounded mb-6 w-5/6"></div>
            {/* Card input */}
            <div className="h-12 bg-green-200 rounded mb-4"></div>
            {/* Button */}
            <div className="h-10 bg-green-200 rounded"></div>
        </div>
    );
};

export default MembershipSkeleton;
