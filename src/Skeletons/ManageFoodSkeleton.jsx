import React from "react";

const ManageFoodSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto p-20">
            <h1 className="text-3xl font-bold mb-6 mt-8 text-center text-emerald-600 animate-pulse bg-gray-200 h-10 rounded w-64 mx-auto"></h1>
            <div className="overflow-x-auto mt-6 rounded-lg shadow-lg border border-emerald-200">
                <table className="table w-full">
                    <thead>
                        <tr>
                            {["Food", "Quantity", "Pickup Location", "Expire Date", "Actions"].map((title) => (
                                <th key={title} className="bg-gray-200 animate-pulse h-8 rounded"></th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <tr key={index} className="bg-green-50 hover:bg-green-100 transition-all">
                                <td>
                                    <div className="flex items-center gap-3 p-2">
                                        <div className="h-12 w-12 bg-gray-200 rounded mask mask-squircle animate-pulse"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                            <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                                        </div>
                                    </div>
                                </td>
                                <td><div className="h-4 bg-gray-200 rounded w-8 mx-auto animate-pulse"></div></td>
                                <td><div className="h-4 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div></td>
                                <td><div className="h-4 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div></td>
                                <td>
                                    <div className="flex gap-2 justify-center">
                                        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageFoodSkeleton;
