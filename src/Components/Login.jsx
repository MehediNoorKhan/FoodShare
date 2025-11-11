import React, { useContext, useState } from "react";
import SocialLogin from "./SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import AuthContext from "../Provider/AuthContext";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/signin.json"; // Make sure the path is correct

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
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto rounded-lg overflow-hidden">
                {/* Left: Login Form */}
                <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center bg-green-50 rounded-xl">
                    <h1 className="text-4xl font-bold mb-6 text-center text-gray-700 lg:text-center">
                        Login Now!
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="input input-bordered w-full"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div>
                            <label className="label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="input input-bordered w-full"
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
                <div className="w-full lg:w-1/ flex items-center justify-center p-4">
                    <Lottie
                        animationData={loginAnimation}
                        loop={true}
                        style={{ width: "100%", maxWidth: 400 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
