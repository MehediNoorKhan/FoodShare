import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import aboutImg from "../../assets/about-main.jpg";
import donateImg from "../../assets/food-donate.avif";
import wasteImg from "../../assets/reduce-waste.jpg";
import communityImg from "../../assets/community.webp";
import AnimatedCounter from "./AnimatedCounter";

export default function About() {
    const [loading, setLoading] = useState(true);

    // Simulate loading delay (replace with real fetch if needed)
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="about" className="relative py-24 bg-green-50 overflow-hidden px-4 md:px-8 lg:px-16">

            {/* Decorative Floating Shapes */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.12, y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-10 left-10 w-36 h-36 bg-green-300 rounded-full blur-3xl"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1, x: [0, 20, 0] }}
                transition={{ duration: 7, repeat: Infinity }}
                className="absolute bottom-10 right-10 w-40 h-40 bg-green-400 rounded-full blur-3xl"
            />

            {/* Section Intro */}
            {loading ? (
                <div className="text-center mb-16 space-y-4">
                    <div className="h-6 w-40 bg-gray-200 rounded mx-auto animate-pulse"></div>
                    <div className="h-12 w-80 bg-gray-300 rounded mx-auto animate-pulse"></div>
                    <div className="h-5 w-96 bg-gray-200 rounded mx-auto animate-pulse"></div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-green-600 font-semibold uppercase mb-2">
                        About Our Mission
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-deepgreen">
                        Connecting Food. Connecting Hearts.
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
                        We reduce food waste & bring communities together by connecting food donors with
                        those who need it most. Every meal shared is a life touched.
                    </p>
                </motion.div>
            )}

            {/* Main Content */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {loading ? (
                    <>
                        <div className="h-80 w-full bg-gray-300 rounded-xl animate-pulse"></div>
                        <div className="space-y-4">
                            <div className="h-6 w-64 bg-gray-300 rounded animate-pulse"></div>
                            <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
                            <ul className="space-y-2 mt-4">
                                {Array(4).fill(0).map((_, i) => (
                                    <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                                ))}
                            </ul>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Floating Image */}
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
                                className="rounded-xl shadow-xl w-full object-cover"
                            />
                        </motion.div>

                        {/* Text + List */}
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                            className="space-y-6 text-gray-700"
                        >
                            <h3 className="text-2xl font-semibold text-green-700">
                                A Simple Step with a Lasting Impact.
                            </h3>
                            <p className="text-lg leading-relaxed">
                                Instead of throwing away surplus food, we help turn it into hope, care, and connection.
                                A meal shared can mean the world to someone.
                            </p>
                            <ul className="space-y-4 text-lg">
                                {[
                                    "Food safety first — always.",
                                    "Easy communication for smooth pickups.",
                                    "Community-driven & volunteer powered.",
                                    "Respectful, safe, and sustainable food sharing."
                                ].map((text, i) => (
                                    <motion.li key={i} className="flex items-center gap-3" whileHover={{ scale: 1.03 }}>
                                        <div className="w-9 h-9 rounded-full bg-green-200 flex items-center justify-center text-green-700 text-xl shadow-md hover:shadow-lg transition">
                                            ✓
                                        </div>
                                        {text}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </>
                )}
            </div>

            {/* Feature Cards */}
            {loading ? (
                <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {Array(3).fill(0).map((_, i) => (
                        <div key={i} className="h-64 bg-gray-300 rounded-xl animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[
                        { img: donateImg, title: "Share & Donate", desc: "Help someone in need with just a few clicks." },
                        { img: wasteImg, title: "Reduce Waste", desc: "Eat responsibly. Share surplus. Help the planet." },
                        { img: communityImg, title: "Build Community", desc: "Grow connections and compassion in your area." }
                    ].map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition border border-gray-100 p-6 text-center cursor-pointer"
                        >
                            <div className="overflow-hidden rounded-lg mb-5">
                                <motion.img
                                    src={card.img}
                                    alt={card.title}
                                    className="rounded-lg h-48 w-full object-cover"
                                    whileHover={{ scale: 1.08 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                            <h4 className="text-xl font-semibold text-green-700 group-hover:underline">{card.title}</h4>
                            <p className="text-gray-600 mt-2">{card.desc}</p>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Stats Counter */}
            {!loading && <AnimatedCounter />}
        </section>
    );
}
