import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import aboutImg from "../../assets/about-main.jpg";
import donateImg from "../../assets/food-donate.avif";
import wasteImg from "../../assets/reduce-waste.jpg";
import communityImg from "../../assets/community.webp";
import AnimatedCounter from "./AnimatedCounter";

export default function About() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "About";s
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            id="about"
            className="relative py-20 bg-green-50 overflow-hidden px-3 sm:px-6 md:px-10 lg:px-20"
        >
            {/* Floating Background Shapes */}
            <motion.div
                animate={{ opacity: [0.12, 0.2, 0.12], y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-12 left-12 w-32 h-32 bg-green-300 rounded-full blur-3xl"
            />
            <motion.div
                animate={{ opacity: [0.12, 0.2, 0.12], x: [0, 20, 0] }}
                transition={{ duration: 7, repeat: Infinity }}
                className="absolute bottom-12 right-12 w-36 h-36 bg-lightgreen rounded-full blur-3xl"
            />

            {/* Section Header */}
            {loading ? (
                <div className="text-center mb-14 space-y-4">
                    <div className="h-6 w-40 bg-gray-200 rounded mx-auto animate-pulse"></div>
                    <div className="h-10 w-72 bg-gray-300 rounded mx-auto animate-pulse"></div>
                    <div className="h-4 w-60 bg-gray-200 rounded mx-auto animate-pulse"></div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <p className="text-deepgreen font-semibold uppercase mb-2">
                        About Our Mission
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-deepgreen">
                        Connecting Food. Connecting Hearts.
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mt-4">
                        We reduce food waste & bring communities together by connecting donors with
                        people who need it most.
                    </p>
                </motion.div>
            )}

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {loading ? (
                    <>
                        <div className="w-full h-72 sm:h-80 md:h-96 bg-gray-300 rounded-xl animate-pulse"></div>
                        <div className="space-y-4">
                            <div className="h-6 w-48 bg-gray-300 rounded animate-pulse"></div>
                            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                            <ul className="space-y-3 mt-4">
                                {Array(4).fill(0).map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-4 w-full bg-gray-200 rounded animate-pulse"
                                    ></div>
                                ))}
                            </ul>
                        </div>
                    </>
                ) : (
                    <>
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                        >
                            <motion.img
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                src={aboutImg}
                                alt="Food sharing"
                                className="rounded-xl shadow-lg w-full h-auto object-cover"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            className="space-y-6 text-gray-700"
                        >
                            <h3 className="text-2xl sm:text-3xl font-semibold text-deepgreen">
                                A Simple Step with a Lasting Impact.
                            </h3>
                            <p className="text-base md:text-lg leading-relaxed">
                                Instead of throwing away surplus food, we help turn it into hope,
                                care, connection — and dignity.
                            </p>

                            <ul className="space-y-4 text-lg">
                                {[
                                    "Food safety first — always.",
                                    "Easy communication for smooth pickups.",
                                    "Community-driven and volunteer powered.",
                                    "Respectful, safe, and sustainable food sharing.",
                                ].map((text, index) => (
                                    <motion.li
                                        key={index}
                                        whileHover={{ scale: 1.03 }}
                                        className="flex items-center gap-3"
                                    >
                                        <span className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-deepgreen font-semibold shadow-md">
                                            ✓
                                        </span>
                                        {text}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </>
                )}
            </div>

            {/* Feature Cards */}
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading
                    ? Array(3).fill(0).map((_, i) => (
                        <div key={i} className="h-64 bg-gray-300 rounded-xl animate-pulse"></div>
                    ))
                    : [
                        { img: donateImg, title: "Share & Donate", desc: "Help someone in need with just a few clicks." },
                        { img: wasteImg, title: "Reduce Waste", desc: "Eat responsibly. Share surplus. Help the planet." },
                        { img: communityImg, title: "Build Community", desc: "Grow compassion in your local area." },
                    ].map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition border border-gray-100 p-6 text-center"
                        >
                            <motion.img
                                src={card.img}
                                alt={card.title}
                                className="rounded-lg h-48 w-full object-cover mb-5"
                                whileHover={{ scale: 1.08 }}
                                transition={{ duration: 0.5 }}
                            />
                            <h4 className="text-xl font-bold text-deepgreen group-hover:underline">
                                {card.title}
                            </h4>
                            <p className="text-gray-600 mt-2">{card.desc}</p>
                        </motion.div>
                    ))}
            </div>

            {/* Stats Counter */}
            {!loading && <AnimatedCounter />}
        </section>
    );
}
