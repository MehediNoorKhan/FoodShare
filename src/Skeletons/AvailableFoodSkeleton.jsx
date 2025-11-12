import React from "react";

const AvailableFoodSkeleton = ({ count = 8 }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array(count)
                .fill(0)
                .map((_, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-200 rounded-2xl animate-pulse h-80 flex flex-col justify-between"
                    >
                        <div className="p-4 flex flex-col gap-4">
                            <div className="bg-gray-300 h-6 w-3/4 rounded-lg" />
                            <div className="bg-gray-300 h-40 w-full rounded-xl" />
                            <div className="bg-gray-300 h-6 w-1/2 rounded-lg" />
                            <div className="flex flex-col gap-2">
                                <div className="bg-gray-300 h-4 w-full rounded-lg" />
                                <div className="bg-gray-300 h-4 w-3/4 rounded-lg" />
                                <div className="bg-gray-300 h-4 w-5/6 rounded-lg" />
                            </div>
                        </div>
                        <div className="h-12 bg-gray-300 rounded-full m-4" />
                    </div>
                ))}
        </div>
    );
};

export default AvailableFoodSkeleton;
