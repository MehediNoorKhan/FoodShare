import React, { useContext, useState } from "react";
import SocialLogin from "./SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import AuthContext from "../Provider/AuthContext";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/signin.json";
import { motion } from "framer-motion";

const Login = () => {
    const { login } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state || "/";
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then((result) => {
                setLoading(false);
                toast.success("Login successful!");
                const user = result.user;
                const lastVisited = localStorage.getItem(`lastVisited-${user.email}`);
                navigate(lastVisited || "/");
            })
            .catch((error) => {
                setLoading(false);
                toast.error("Invalid credentials");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 mt-12 py-10">
            <motion.div
                className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {/* Left: Login Form */}
                <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center bg-green-50 rounded-xl">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-deepgreen">
                        Login Now!
                    </h1>

                    {/* Skeleton Loader */}
                    {loading ? (
                        <div className="space-y-4">
                            <div className="h-6 w-full bg-gray-300 rounded animate-pulse"></div>
                            <div className="h-6 w-full bg-gray-300 rounded animate-pulse"></div>
                            <div className="h-10 w-full bg-gray-300 rounded mt-4 animate-pulse"></div>
                            <div className="h-10 w-full bg-gray-300 rounded mt-2 animate-pulse"></div>
                            <div className="h-10 w-full bg-gray-300 rounded mt-2 animate-pulse"></div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="label text-deepgreen">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input input-bordered w-full text-lightgreen"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div>
                                <label className="label text-deepgreen">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="input input-bordered w-full text-lightgreen"
                                    placeholder="Password"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-2 py-2 cursor-pointer rounded-md font-semibold text-white bg-[#22c55e] hover:bg-[#24725e] transition-colors"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>
                    )}

                    <div className="text-sm mt-4 text-center lg:text-left">
                        Not have an account?{" "}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Register
                        </Link>
                    </div>

                    <div className="mt-6">
                        <SocialLogin from={from} />
                    </div>
                </div>

                {/* Right: Login Animation */}
                <motion.div
                    className="w-full lg:w-1/2 flex items-center justify-center p-4"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <Lottie
                        animationData={loginAnimation}
                        loop={true}
                        style={{ width: "100%", maxWidth: 400 }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Login;
