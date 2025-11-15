import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";
import axios from "axios";
import AuthContext from "../Provider/AuthContext";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import registerAnimation from "../../assets/signin.json"; // Make sure the path is correct

// Skeleton for loading state
const RegisterSkeleton = () => (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
            <div className="w-full lg:w-1/2 p-6 bg-green-50 rounded-xl animate-pulse space-y-4">
                <div className="h-10 bg-green-200 rounded w-2/3 mx-auto"></div>
                <div className="h-12 bg-green-200 rounded w-full"></div>
                <div className="h-12 bg-green-200 rounded w-full"></div>
                <div className="h-12 bg-green-200 rounded w-full"></div>
                <div className="h-12 bg-green-200 rounded w-full"></div>
                <div className="h-12 bg-green-200 rounded w-full"></div>
                <div className="h-10 bg-green-200 rounded w-1/2 mx-auto mt-4"></div>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
                <div className="h-80 bg-green-200 w-full rounded-xl animate-pulse"></div>
            </div>
        </div>
    </div>
);

const Register = () => {

    useEffect(() => {
        document.title = "Register";
    }, []);

    const { createUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [ermsg, setErmsg] = useState("");
    const [imageLoading, setImageLoading] = useState(false);
    const [photourl, setPhotourl] = useState("");
    const [showAnimation, setShowAnimation] = useState(false);

    // Scroll animation trigger
    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById("register-form");
            if (!element) return;
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                setShowAnimation(true);
            }
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const resizeImage = (file, maxWidth = 500, maxHeight = 500) => {
        return new Promise((resolve) => {
            const img = new Image();
            const reader = new FileReader();
            reader.onload = (e) => { img.src = e.target.result; };
            img.onload = () => {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) { height *= maxWidth / width; width = maxWidth; }
                } else {
                    if (height > maxHeight) { width *= maxHeight / height; height = maxHeight; }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.8);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageLoading(true);
        setPhotourl("");

        try {
            const resizedBlob = await resizeImage(file, 300, 300);
            const formData = new FormData();
            formData.append("image", resizedBlob);

            const API_KEY = import.meta.env.VITE_IMGBB_KEY;
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${API_KEY}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setPhotourl(res.data.data.url);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Image upload failed",
                text: error.response?.data?.error?.message || error.message,
            });
        } finally {
            setImageLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const formdata = new FormData(form);
        const { email, password, name } = Object.fromEntries(formdata.entries());

        setErmsg("");

        const userinfos = { email, name, photourl, membership: "no", post: 0 };

        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isValidLength = password.length >= 6;

        if (!hasUppercase || !hasLowercase || !isValidLength) {
            Swal.fire({
                icon: "error",
                title: "Weak Password",
                text: "Password must contain upper & lower case letters and be at least 6 characters.",
            });
            setLoading(false);
            return;
        }

        try {
            await createUser(email, password);
            await logout();
            await axios.post("https://foodhub-amber.vercel.app/users", userinfos);

            await Swal.fire({
                icon: "success",
                title: "Registration Successful!",
                text: "Your account has been created. Please login.",
                confirmButtonText: "OK"
            });

            form.reset();
            setPhotourl("");
            navigate("/login");
        } catch (error) {
            setErmsg(error.message);
            Swal.fire({
                icon: "error",
                title: "Something went wrong!",
                text: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading || imageLoading) return <RegisterSkeleton />;

    return (
        <div className="min-h-screen flex items-center justify-center px-2 py-12 mt-12 sm:py-24">
            <motion.div
                id="register-form"
                className="flex flex-col lg:flex-row lg:justify-center lg:items-center w-full max-w-6xl mx-auto rounded-lg overflow-hidden gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={showAnimation ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                {/* Left: Form */}
                <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center bg-green-50 rounded-xl">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-deepgreen">
                        Register Now!
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="label text-deepgreen">Name</label>
                            <input type="text" name="name" className="input input-bordered w-full dark:bg-white text-lightgreen" placeholder="Your Name" required />
                        </div>
                        <div>
                            <label className="label text-deepgreen">Email</label>
                            <input type="email" name="email" className="input input-bordered w-full dark:bg-white text-lightgreen" placeholder="Email" required />
                        </div>
                        <div>
                            <label className="label">Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="input input-bordered w-full cursor-pointer dark:bg-lightgreen dark:text-white dark:placeholder-lightgreen placeholder-gray-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="label text-deepgreen">Password</label>
                            <input type="password" name="password" className="input input-bordered text-lightgreen w-full dark:bg-white" placeholder="Password" required />
                        </div>

                        {ermsg && <p className="text-red-500 mt-1">{ermsg}</p>}

                        <button
                            type="submit"
                            disabled={!photourl || loading || imageLoading}
                            className={`w-full mt-2 py-2 cursor-pointer rounded-md font-semibold text-white transition-colors ${photourl && !imageLoading ? "bg-[#22c55e] hover:bg-[#24725e] dark:bg-[#22c55e] dark:hover:bg-[#24725e]" : "bg-gray-400 cursor-not-allowed dark:bg-gray-400 dark:cursor-not-allowed"}`}
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <div className="text-sm mt-4 text-center sm:text-left dark:text-gray-600">
                        Already have an account?  <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                    </div>

                    <div className="mt-6">
                        <SocialLogin />
                    </div>
                </div>

                {/* Right: Animation */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
                    <Lottie animationData={registerAnimation} loop={true} style={{ width: "100%", maxWidth: 400 }} />
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
