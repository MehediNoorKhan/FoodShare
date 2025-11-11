import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import NoDataAnimation from "../../assets/No-Data.json";

// Optional: Skeleton for loading
const NoDataSkeleton = () => (
    <div className="flex flex-col items-center justify-center mt-10 space-y-4 animate-pulse">
        <div className="w-48 h-48 sm:w-64 sm:h-64 bg-green-200 rounded-lg" />
        <div className="h-6 w-48 sm:w-64 bg-green-200 rounded" />
        <div className="h-6 w-32 sm:w-48 bg-green-200 rounded" />
        <div className="h-10 w-32 sm:w-40 bg-green-200 rounded" />
    </div>
);

const NoData = ({ message = "No Data Found", subMessage = "", onAction, actionText, loading = false }) => {
    const [show, setShow] = useState(false);

    // Scroll animation trigger
    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById("no-data-component");
            if (!element) return;
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                setShow(true);
            }
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (loading) return <NoDataSkeleton />;

    return (
        <motion.div
            id="no-data-component"
            className="flex flex-col items-center justify-center mt-10 space-y-4 px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
        >
            <div className="w-48 h-48 sm:w-64 sm:h-64">
                <Lottie animationData={NoDataAnimation} loop={true} />
            </div>

            <p className="text-[#24725e] text-lg sm:text-xl md:text-2xl font-semibold text-center">
                {message}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                <p className="text-[#22c55e] text-base sm:text-lg md:text-2xl font-medium text-center">
                    {subMessage}
                </p>

                {onAction && actionText && (
                    <button
                        onClick={onAction}
                        className="bg-[#22c55e] hover:bg-[#24725e] text-white font-semibold py-2 px-6 rounded-xl cursor-pointer shadow transition duration-300 mt-2 sm:mt-0"
                    >
                        {actionText}
                    </button>
                )}
            </div>
        </motion.div>
    );
};

export default NoData;
