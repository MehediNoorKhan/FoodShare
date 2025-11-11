import React from "react";
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
        threshold: 0.25,
    });

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
            icon: <FaSmile className="text-green-500 w-10 h-10 mb-2" />,
        },
        {
            label: "Active Volunteers",
            value: 150,
            icon: <FaHandsHelping className="text-blue-500 w-10 h-10 mb-2" />,
        },
    ];

    return (
        <section className="relative pt-20 pb-8 overflow-hidden">
            {/* Decorative gradient shapes */}
            <motion.div
                animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="absolute -top-20 -left-20 w-64 h-64 bg-green-300 blur-3xl rounded-full"
            ></motion.div>

            <motion.div
                animate={{ opacity: [0.15, 0.35, 0.15], scale: [1, 1.25, 1] }}
                transition={{ repeat: Infinity, duration: 7 }}
                className="absolute bottom-0 right-0 w-72 h-72 bg-green-400 blur-3xl rounded-full"
            ></motion.div>

            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-14 relative z-10"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-[#24725e]">
                    Our Community Impact
                </h2>
                <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
                    Every shared meal creates hope. Every volunteer strengthens unity.
                </p>
            </motion.div>

            {/* Counter Cards */}
            <div
                ref={ref}
                className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto relative z-10"
            >
                {counters.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="relative group cursor-pointer"
                    >
                        {/* Glow ring on hover */}
                        <div className="absolute inset-0 rounded-2xl bg-green-400 blur-2xl opacity-0 group-hover:opacity-30 transition"></div>

                        {/* Card */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-green-100"
                        >
                            {/* Floating Icon Animation */}
                            <motion.div
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                {item.icon}
                            </motion.div>

                            {/* Number Counter */}
                            <h3 className="text-4xl font-bold text-[#24725e] mt-2 mb-1">
                                {inView ? <CountUp end={item.value} duration={3} /> : "0"}
                            </h3>

                            {/* Label */}
                            <p className="text-gray-600 font-medium">{item.label}</p>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
