import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-emerald-200 via-emerald-100 to-emerald-200 text-gray-700 mt-auto">

            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold text-emerald-700 mb-2">
                        FoodShare
                    </h2>
                    <p className="text-sm">Sharing surplus. Feeding hope.</p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-1 text-sm">
                        <li>
                            <a href="/" className="hover:text-emerald-700">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/availablefood" className="hover:text-emerald-700">
                                Available Foods
                            </a>
                        </li>
                        <li>
                            <a href="/myfoodrequest" className="hover:text-emerald-700">
                                My Requests
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-emerald-700">
                                How It Works
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-semibold mb-3">Contact</h3>
                    <p className="text-sm">Email: support@foodshare.org</p>
                    <p className="text-sm">Phone: +1 800 123 456</p>
                </div>

                {/* Social */}
                <div>
                    <h3 className="font-semibold mb-3">Follow Us</h3>
                    <div className="flex gap-3">
                        <a href="#" className="hover:text-emerald-700">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="hover:text-emerald-700">
                            <FaTwitter />
                        </a>
                        <a href="#" className="hover:text-emerald-700">
                            <FaInstagram />
                        </a>
                        <a href="#" className="hover:text-emerald-700">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center text-xs py-5 border-t border-emerald-300">
                © {new Date().getFullYear()} FoodShare. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
