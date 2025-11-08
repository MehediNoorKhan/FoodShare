import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import AuthContext from "../Provider/AuthContext";

const Header = () => {
    const { user, userData, logout, loading } = useContext(AuthContext);
    const [scrolled, setScrolled] = useState(false);

    const handleLogout = () => {
        logout().catch((err) => console.log(err));
    };

    const currentUser = userData;

    // ✅ Scroll listener (only once)
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // ✅ Loading after hooks
    if (loading) {
        return (
            <header className="w-full py-4 text-center bg-[#22c55e] text-white">
                Loading...
            </header>
        );
    }

    const links = [
        { to: "/", label: "Home" },
        { to: "/availablefood", label: "Available Foods" },
        { to: "/addfood", label: "Add Food" },
        { to: "/manage-food", label: "Manage Foods" },
        { to: "/myfoodrequest", label: "My Food Request" },
        { to: "/membership", label: "Membership" },
    ];

    return (
        <header
            className={`fixed w-full z-50 transition-colors duration-500 ${scrolled ? "bg-white shadow-md" : "bg-[#22c55e]"
                }`}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">

                <NavLink
                    to="/"
                    className={`text-2xl font-bold transition-colors duration-500 ${scrolled ? "text-[#22c55e]" : "text-white"
                        }`}
                >
                    Food Zone
                </NavLink>

                <nav className="hidden md:flex space-x-6 flex-1 justify-center text-sm md:text-base lg:text-base">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `relative group transition-colors duration-300 ${scrolled
                                    ? "text-gray-500 hover:text-[#24725e]"
                                    : "text-white hover:text-white"
                                }`
                            }
                        >
                            {link.label}
                            <span
                                className={`absolute left-0 bottom-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full ${scrolled ? "bg-[#24725e]" : "bg-white"
                                    }`}
                            />
                        </NavLink>
                    ))}
                </nav>

                <div className="hidden md:flex items-center space-x-3">
                    {user ? (
                        <>
                            <div className="relative group cursor-pointer">
                                <img
                                    src={
                                        currentUser?.avatar ||
                                        currentUser?.photourl ||
                                        user?.photoURL ||
                                        "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                                    }
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full ring-2 ring-white object-cover"
                                />
                                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 text-sm bg-gray-700 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                    {currentUser?.name || user?.displayName}
                                </span>
                            </div>

                            <button
                                onClick={handleLogout}
                                className={`px-4 py-1 rounded-md border-2 transition-colors duration-300 ${scrolled
                                        ? "border-[#22c55e] text-[#22c55e] hover:bg-[#24725e] hover:text-white"
                                        : "border-white text-white hover:bg-white hover:text-[#22c55e]"
                                    }`}
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">
                                <button
                                    className={`cursor-pointer px-4 py-1 rounded-md transition-colors duration-300 ${scrolled
                                            ? "bg-[#22c55e] text-white hover:bg-[#24725e]"
                                            : "bg-white text-[#22c55e] hover:bg-green-100"
                                        }`}
                                >
                                    Sign in
                                </button>
                            </NavLink>

                            <NavLink to="/register">
                                <button
                                    className={`cursor-pointer px-4 py-1 rounded-md border-2 transition-colors duration-300 ${scrolled
                                            ? "border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e] hover:text-white"
                                            : "border-white text-white hover:bg-white hover:text-[#22c55e]"
                                        }`}
                                >
                                    Register
                                </button>
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
