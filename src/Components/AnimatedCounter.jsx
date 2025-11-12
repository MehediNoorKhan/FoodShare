import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import {
    FaUserFriends,
    FaUtensils,
    FaSmile,
    FaHandsHelping,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function AnimatedCounter() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const [showContent, setShowContent] = useState(false);

    // delay content loading for skeleton effect
    useEffect(() => {
        if (inView) {
            const timer = setTimeout(() => setShowContent(true), 700);
            return () => clearTimeout(timer);
        }
    }, [inView]);

    const counters = [
        {
            label: "Total Donors",
            value: 1200,
            icon: <FaUserFriends className="text-red-500 w-10 h-10 mb-2" />,
        },
        {
            label: "Food Requests",
            value: 3450,
            icon: <FaUtensils className="text-yellow-500 w-10 h-10 mb-2" />,
        },
        {
            label: "Happy Recipients",
            value: 980,
            icon: <FaSmile className="text-lightgreen w-10 h-10 mb-2" />,
        },
        {
            label: "Active Volunteers",
            value: 150,
            icon: <FaHandsHelping className="text-blue-500 w-10 h-10 mb-2" />,
        },
    ];

    return (
        <section
            className="relative pt-20 pb-12 overflow-hidden px-5 sm:px-8"
        >
            {/* Gradient Blurs */}
            <motion.div
                animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="absolute -top-24 -left-24 w-72 h-72 bg-green-300 blur-3xl rounded-full"
            ></motion.div>
            <motion.div
                animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.25, 1] }}
                transition={{ repeat: Infinity, duration: 7 }}
                className="absolute bottom-0 right-0 w-80 h-80 bg-lightgreen blur-3xl rounded-full"
            ></motion.div>

            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 relative z-10"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-[#24725e]">Our Community Impact</h2>
                <p className="text-gray-600 mt-3 text-base sm:text-lg max-w-2xl mx-auto">
                    Every shared meal creates hope. Every volunteer strengthens unity.
                </p>
            </motion.div>

            {/* Counters */}
            <div
                ref={ref}
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto relative z-10"
            >
                {!showContent ? (
                    /* Skeleton Loader */
                    counters.map((_, i) => (
                        <div key={i} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 animate-pulse shadow-md border border-green-100 h-40"></div>
                    ))
                ) : (
                    counters.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                            className="relative group cursor-pointer"
                        >
                            <div className="absolute inset-0 rounded-2xl bg-lightgreen blur-2xl opacity-0 group-hover:opacity-30 transition"></div>

                            <motion.div
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.4 }}
                                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-green-100"
                            >
                                <motion.div
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    {item.icon}
                                </motion.div>

                                <h3 className="text-3xl sm:text-4xl font-bold text-[#24725e] mt-2 mb-1">
                                    <CountUp end={item.value} duration={3} />
                                </h3>

                                <p className="text-gray-600 font-medium text-sm sm:text-base">
                                    {item.label}
                                </p>
                            </motion.div>
                        </motion.div>
                    ))
                )}
            </div>
        </section>
    );
}
