import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

// Optional skeleton while loading (replace with actual loading logic if needed)
const PaymentSuccessSkeleton = () => (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-pulse">
        <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full">
            <div className="h-8 bg-green-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-6"></div>
            <div className="h-10 bg-green-200 rounded w-32 mx-auto"></div>
        </div>
    </div>
);

const PaymentSuccess = ({ loading = false }) => {
    const [show, setShow] = useState(false);

    // Trigger animation when component scrolls into view
    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById("payment-success");
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

    if (loading) return <PaymentSuccessSkeleton />;

    return (
        <motion.div
            id="payment-success"
            className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
        >
            <div className="bg-white shadow-lg rounded-2xl p-8 sm:p-10 max-w-md w-full">
                <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mb-4">
                    Payment Successful 🎉
                </h2>
                <p className="text-gray-700 text-sm sm:text-base mb-6">
                    Thank you for your payment. Your membership has been successfully upgraded.
                </p>
                <Link
                    to="/"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 sm:px-8 sm:py-3 rounded-md transition"
                >
                    Go to Home
                </Link>
            </div>
        </motion.div>
    );
};

export default PaymentSuccess;
