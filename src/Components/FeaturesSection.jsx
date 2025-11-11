import React, { useEffect, useState } from "react";
import { FaTruck, FaLeaf, FaStar, FaHeadset } from "react-icons/fa";

const features = [
    {
        title: "Free Shipping",
        description: "Get your orders delivered to your doorstep without extra cost.",
        icon: FaTruck,
        bgColor: "bg-purple-500",
    },
    {
        title: "Always Fresh",
        description: "Our foods are fresh and carefully selected every day.",
        icon: FaLeaf,
        bgColor: "bg-yellow-500",
    },
    {
        title: "Best Quality",
        description: "We ensure top-quality products for your satisfaction.",
        icon: FaStar,
        bgColor: "bg-blue-500",
    },
    {
        title: "Support",
        description: "Our team is here to help you 24/7 with any query.",
        icon: FaHeadset,
        bgColor: "bg-red-500",
    },
];

const FeaturesSection = () => {
    const [loading, setLoading] = useState(true);

    // Simulate loading delay
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-4 py-14 md:py-16">
            {/* Heading */}
            <div className="text-center mb-12">
                {loading ? (
                    <>
                        <div className="h-10 w-64 mx-auto bg-gray-300 rounded mb-3 animate-pulse"></div>
                        <div className="h-4 w-96 mx-auto bg-gray-300 rounded animate-pulse"></div>
                    </>
                ) : (
                    <>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-deepgreen">
                            Why Choose <span className="text-lightgreen">Foodzone?</span>
                        </h2>
                        <p className="text-gray-500 mt-3 text-sm md:text-base max-w-2xl mx-auto">
                            We ensure fresh, high-quality food and smooth support to make your experience better.
                        </p>
                    </>
                )}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                {loading
                    ? Array.from({ length: 4 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center p-6 rounded-2xl cursor-pointer border-2 border-transparent bg-white animate-pulse"
                        >
                            <div className="w-20 h-20 mb-5 rounded-full bg-gray-300"></div>
                            <div className="h-5 w-28 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 w-40 bg-gray-300 rounded"></div>
                        </div>
                    ))
                    : features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={idx}
                                className="group flex flex-col items-center p-6 rounded-2xl cursor-pointer border-2 border-transparent transition-all duration-300 hover:border-green-500 hover:shadow-xl bg-white"
                            >
                                <div
                                    className={`w-20 h-20 flex items-center justify-center mb-5 rounded-full transition-all duration-300 ${feature.bgColor} group-hover:bg-white shadow-md`}
                                >
                                    <Icon className="text-white text-4xl transition-all duration-300 group-hover:text-green-500" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-700 text-center group-hover:text-green-600 transition-all duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-sm sm:text-base text-gray-500 text-center group-hover:text-gray-600 transition-colors duration-300">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
            </div>
        </section>
    );
};

export default FeaturesSection;
