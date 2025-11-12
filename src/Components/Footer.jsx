import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
    FaYoutube,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Footer = () => {
    const [loading, setLoading] = useState(true);

    // Simulate loading for skeleton
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <footer className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-emerald-800 text-gray-100 mt-auto shadow-inner">
            <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {loading
                    ? Array.from({ length: 4 }).map((_, idx) => (
                        <div key={idx} className="animate-pulse space-y-3">
                            <div className="h-6 w-32 bg-gray-300 rounded"></div>
                            <div className="h-4 w-full bg-gray-300 rounded"></div>
                            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                            <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                        </div>
                    ))
                    : <>
                        {/* Brand & About */}
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-3">FoodZone</h2>
                            <p className="text-sm text-gray-200 mb-4">
                                The world's most beautiful food sharing platform. Sharing surplus, feeding hope.
                            </p>
                            <div className="flex gap-3 text-white flex-wrap">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
                                    <FaFacebookF size={20} />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
                                    <FaTwitter size={20} />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
                                    <FaInstagram size={20} />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
                                    <FaLinkedinIn size={20} />
                                </a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
                                    <FaYoutube size={20} />
                                </a>
                            </div>
                        </motion.div>

                        {/* Quick Links */}
                        <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h3 className="font-semibold mb-3 text-white">Quick Links</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/" className="hover:text-emerald-400">Home</Link></li>
                                <li><Link to="/about" className="hover:text-emerald-400">About Us</Link></li>
                                <li><Link to="/availablefood" className="hover:text-emerald-400">Available Foods</Link></li>
                                <li><Link to="/myfoodrequest" className="hover:text-emerald-400">My Requests</Link></li>
                                <li><Link to="/membership" className="hover:text-emerald-400">Membership</Link></li>
                            </ul>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h3 className="font-semibold mb-3 text-white">Contact Us</h3>
                            <div className="flex items-center gap-2 mb-2">
                                <FaMapMarkerAlt className="text-emerald-400" />
                                <span>123 Food Street, Gourmet City, USA</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <FaPhoneAlt className="text-emerald-400" />
                                <span>+1 800 123 456</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <FaEnvelope className="text-emerald-400" />
                                <span>support@foodzone.com</span>
                            </div>
                        </motion.div>

                        {/* Newsletter Subscription */}
                        <motion.div
                            className="space-y-3"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <h3 className="font-semibold mb-3 text-white">Subscribe to Newsletter</h3>
                            <p className="text-sm text-gray-200 mb-3">
                                Get the latest updates on new food donations and events.
                            </p>
                            <form className="flex flex-col gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder-text-white"
                                />
                                <button
                                    type="submit"
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md font-semibold"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </motion.div>
                    </>}

            </div>

            <div className="text-center text-sm py-5 border-t border-emerald-600 bg-emerald-900 text-gray-200">
                © {new Date().getFullYear()} FoodZone. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
