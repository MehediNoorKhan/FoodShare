import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router"; // make sure to use react-router-dom
import AuthContext from "../Provider/AuthContext";
import { HiMenu } from "react-icons/hi";

const Header = () => {
    const { user, userData, logout, loading } = useContext(AuthContext);
    const [scrolled, setScrolled] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleLogout = () => logout().catch((err) => console.log(err));
    const currentUser = userData;

    const links = [
        { to: "/", label: "Home" },
        { to: "/availablefood", label: "Available Foods" },
        { to: "/addfood", label: "Add Food" },
        { to: "/manage-food", label: "Manage Foods" },
        { to: "/myfoodrequest", label: "My Food Request" },
        { to: "/membership", label: "Membership" },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="drawer z-[60]">
            <input
                id="header-drawer"
                type="checkbox"
                className="drawer-toggle"
                checked={drawerOpen}
                onChange={() => setDrawerOpen(!drawerOpen)}
            />

            {/* Header */}
            <div
                className={`drawer-content fixed w-full z-50 transition-colors duration-500 ${scrolled ? "bg-white shadow-md" : "bg-[#22c55e]"
                    }`}
            >
                <header className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
                    {/* Logo */}
                    <NavLink
                        to="/"
                        className={`text-2xl font-bold transition-colors duration-500 ${scrolled ? "text-[#22c55e]" : "text-white"
                            }`}
                    >
                        FoodZone
                    </NavLink>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex flex-1 justify-center space-x-6 text-sm md:text-base lg:text-base">
                        {links.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `relative group transition-colors duration-300 ${isActive
                                        ? scrolled
                                            ? "text-lightgreen font-semibold underline" // Active & scrolled: green
                                            : "text-white font-semibold underline"     // Active & not scrolled: white
                                        : scrolled
                                            ? "text-gray-500 hover:text-lightgreen"    // Inactive & scrolled
                                            : "text-white hover:text-gray-500"        // Inactive & not scrolled
                                    }`
                                }
                            >
                                {link.label}
                                <span
                                    className={`absolute left-0 bottom-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full ${scrolled ? "bg-[#24725e]" : "bg-white"}`}
                                />
                            </NavLink>
                        ))}
                    </nav>


                    <div className="flex items-center z-50 mr-4">
                        {user ? (
                            <img
                                src={
                                    currentUser?.avatar ||
                                    currentUser?.photourl ||
                                    user?.photoURL ||
                                    "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                                }
                                alt="avatar"
                                className="w-10 h-10 rounded-full ring-2 ring-white object-cover hover:ring-[#22c55e] cursor-pointer transition"
                                title={currentUser?.name || user?.displayName}
                                onClick={() => setDrawerOpen(!drawerOpen)}
                            />
                        ) : (
                            <label htmlFor="header-drawer" className="cursor-pointer md:block lg:hidden">
                                <HiMenu size={28} className={scrolled ? "text-[#22c55e]" : "text-white"} />
                            </label>
                        )}
                    </div>

                    {/* Desktop buttons */}
                    <div className="hidden lg:flex items-center space-x-3">
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className={`px-4 py-1 rounded-md border-2 transition-colors duration-300 ${scrolled
                                    ? "border-[#22c55e] text-[#22c55e] hover:bg-[#24725e] hover:text-white"
                                    : "border-white text-white hover:bg-white hover:text-[#22c55e]"
                                    }`}
                            >
                                Log out
                            </button>
                        ) : (
                            <>
                                <NavLink to="/login">
                                    <button
                                        className={`px-4 py-1 rounded-md transition-colors cursor-pointer duration-300 ${scrolled
                                            ? "bg-[#22c55e] text-white hover:bg-[#24725e]"
                                            : "bg-white text-[#22c55e] hover:bg-green-100"
                                            }`}
                                    >
                                        Sign in
                                    </button>
                                </NavLink>
                                <NavLink to="/register">
                                    <button
                                        className={`px-4 py-1 rounded-md border-2 transition-colors cursor-pointer duration-300 ${scrolled
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

                    {/* Profile picture / Hamburger */}

                </header>
            </div>

            {/* Drawer */}
            <div className="drawer-side z-50">
                <label
                    htmlFor="header-drawer"
                    className="drawer-overlay backdrop-blur-sm bg-white/20"
                    aria-label="close sidebar"
                />
                <ul className="menu min-h-full w-64 sm:w-72 md:w-80 p-6 bg-white/20 backdrop-blur-lg rounded-r-lg space-y-3">
                    {links.map((link) => (
                        <li key={link.to}>
                            <NavLink
                                to={link.to}
                                onClick={() => setDrawerOpen(false)}
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md font-medium transition-colors duration-300 ${isActive
                                        ? "bg-[#22c55e] text-white"
                                        : "text-gray-800 hover:bg-[#22c55e]/20 hover:text-[#22c55e]"
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}

                    {/* Buttons inside drawer */}
                    {user ? (
                        <li>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setDrawerOpen(false);
                                }}
                                className="w-full px-4 py-2 rounded-md border-2 border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e] hover:text-white transition-colors"
                            >
                                Log out
                            </button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/login" onClick={() => setDrawerOpen(false)}>
                                    <button className="w-full px-4 py-2 rounded-md bg-[#22c55e] text-white hover:bg-[#24725e] transition-colors">
                                        Sign in
                                    </button>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/register" onClick={() => setDrawerOpen(false)}>
                                    <button className="w-full px-4 py-2 rounded-md border-2 border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e] hover:text-white transition-colors">
                                        Register
                                    </button>
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Header;
