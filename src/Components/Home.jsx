import React, { Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import Banner from "./Banner";
import FeaturedFoods from "./FeaturedFoods";
import AnimatedCounter from "./AnimatedCounter";
import FAQSection from "./FAQSection";
import FeaturesSection from "./FeaturesSection";
import Reviews from "./Reviews";
import ContactForm from "./ConactForm";

// Skeleton placeholders for lazy loading
const SkeletonSection = ({ height = "h-64" }) => (
    <div className={`w-full ${height} bg-gray-200 animate-pulse rounded-lg my-8`}></div>
);


const Home = () => {
    useEffect(() => {
        document.title = "Home";
    }, []);
    return (
        <div className="overflow-x-hidden">
            {/* Banner with fade-in */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <Banner />
            </motion.div>

            {/* Features Section */}
            <Suspense fallback={<SkeletonSection height="h-96" />}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <FeaturesSection />
                </motion.div>
            </Suspense>

            {/* Featured Foods */}
            <Suspense fallback={<SkeletonSection height="h-[600px]" />}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <FeaturedFoods />
                </motion.div>
            </Suspense>

            {/* Reviews */}
            <Suspense fallback={<SkeletonSection height="h-[500px]" />}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <Reviews />
                </motion.div>
            </Suspense>

            {/* FAQ Section */}
            <Suspense fallback={<SkeletonSection height="h-[600px]" />}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <FAQSection />
                </motion.div>
            </Suspense>

            {/* Contact Form */}
            <Suspense fallback={<SkeletonSection height="h-[600px]" />}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <ContactForm />
                </motion.div>
            </Suspense>
        </div>
    );
};

export default Home;
