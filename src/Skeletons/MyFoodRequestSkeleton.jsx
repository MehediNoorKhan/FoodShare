import React from "react";
import { MdLocationOn, MdEvent } from "react-icons/md";

const MyFoodRequestSkeleton = ({ rows = 5 }) => {
    return (
        <div className="overflow-x-auto mt-6 rounded-lg shadow-lg border border-emerald-200 animate-pulse">
            <table className="table-auto w-full border border-emerald-200 rounded-lg overflow-hidden">
                <thead className="bg-emerald-100 text-emerald-700">
                    <tr>
                        <th className="p-2 text-left">Food</th>
                        <th className="p-2 text-center">Quantity</th>
                        <th className="p-2 text-center">Pickup Location</th>
                        <th className="p-2 text-center">Expire Date</th>
                        <th className="p-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, i) => (
                        <tr key={i} className="bg-green-50 hover:bg-green-50">
                            <td className="p-2">
                                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                            </td>
                            <td className="p-2 text-center">
                                <div className="h-4 w-10 bg-gray-300 rounded mx-auto"></div>
                            </td>
                            <td className="p-2 text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <MdLocationOn className="text-gray-300" />{" "}
                                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                                </div>
                            </td>
                            <td className="p-2 text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <MdEvent className="text-gray-300" />{" "}
                                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                                </div>
                            </td>
                            <td className="p-2 text-center">
                                <div className="h-4 w-20 bg-gray-300 rounded mx-auto"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyFoodRequestSkeleton;
