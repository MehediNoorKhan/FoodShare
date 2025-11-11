import React from "react";
import { motion } from "framer-motion";

const MyFoodRequestSkeleton = ({ rows}) => {
    const items = Array.from({ length: rows });

    return (
        <motion.div
            className="p-6 max-w-7xl mx-auto mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="animate-pulse">
                {/* Title skeleton */}
                <div className="h-8 w-56 mx-auto bg-green-200 rounded mb-12"></div>

                {/* Table Skeleton */}
                <div className="overflow-x-auto rounded-lg shadow-lg border border-emerald-200">
                    <table className="table-auto w-full border border-emerald-200 rounded-lg overflow-hidden">
                        <thead className="bg-emerald-100 text-emerald-700">
                            <tr>
                                <th className="p-2 text-left pl-6">Food</th>
                                <th className="p-2 text-center">Donor</th>
                                <th className="p-2 text-center">Pickup Location</th>
                                <th className="p-2 text-center">Expire Date</th>
                                <th className="p-2 text-center">Quantity</th>
                                <th className="p-2 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {items.map((_, idx) => (
                                <tr
                                    key={idx}
                                    className="bg-green-50 border-b border-emerald-100"
                                >
                                    {/* Food */}
                                    <td className="p-3 pl-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 bg-green-200 rounded-md"></div>
                                            <div className="w-24 h-4 bg-green-200 rounded"></div>
                                        </div>
                                    </td>

                                    {/* Donor */}
                                    <td className="text-center">
                                        <div className="w-20 h-4 mx-auto bg-green-200 rounded"></div>
                                    </td>

                                    {/* Location */}
                                    <td className="text-center">
                                        <div className="w-28 h-4 mx-auto bg-green-200 rounded"></div>
                                    </td>

                                    {/* Expire Date */}
                                    <td className="text-center">
                                        <div className="w-40 h-4 mx-auto bg-green-200 rounded"></div>
                                    </td>

                                    {/* Quantity */}
                                    <td className="text-center">
                                        <div className="w-10 h-4 mx-auto bg-green-200 rounded"></div>
                                    </td>

                                    {/* Action */}
                                    <td className="text-center">
                                        <div className="w-16 h-6 mx-auto bg-red-200 rounded"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default MyFoodRequestSkeleton;
