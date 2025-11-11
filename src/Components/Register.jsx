import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";
import axios from "axios";
import AuthContext from "../Provider/AuthContext";
import Lottie from "lottie-react";
import registerAnimation from "../../assets/signin.json"; // Make sure the path is correct

const Register = () => {
    const { createUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [ermsg, setErmsg] = useState("");
    const [imageLoading, setImageLoading] = useState(false);
    const [photourl, setPhotourl] = useState("");

    // Reduce image size before upload
    const resizeImage = (file, maxWidth = 500, maxHeight = 500) => {
        return new Promise((resolve) => {
            const img = new Image();
            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target.result;
            };
            img.onload = () => {
                const canvas = document.createElement("canvas");
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob(
                    (blob) => {
                        resolve(blob);
                    },
                    "image/jpeg",
                    0.8
                );
            };
            reader.readAsDataURL(file);
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageLoading(true);
        setPhotourl(""); // reset previous URL
        try {
            // Resize image
            const resizedBlob = await resizeImage(file, 300, 300); // smaller image

            // Upload to imgbb
            const formData = new FormData();
            formData.append("image", resizedBlob);

            const API_KEY = import.meta.env.VITE_IMGBB_KEY;
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${API_KEY}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
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

        const userinfos = {
            email,
            name,
            photourl,
            membership: "no",
            post: 0,
        };

        // ✅ Password validation
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
            // 1) Create Firebase Account
            await createUser(email, password);

            // 2) Logout IMMEDIATELY (so user does not stay logged in)
            await logout();

            // 3) Save user to MongoDB (response format might NOT use insertedId)
            await axios.post("http://localhost:5000/users", userinfos);

            // ✅ 4) SweetAlert (Now guaranteed to run)
            await Swal.fire({
                icon: "success",
                title: "Registration Successful!",
                text: "Your account has been created. Please login.",
                confirmButtonText: "OK"
            });

            // ✅ 5) Reset Form and Image
            form.reset();
            setPhotourl("");

            // ✅ 6) Navigate AFTER SweetAlert
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

    return (
        <div className="min-h-screen flex items-center justify-center px-2 py-24 mt-12">
            <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center w-full max-w-6xl mx-auto rounded-lg overflow-hidden gap-8">
                {/* Left: Register Form */}
                <div className="max-w-1/3 lg:w-1/2 p-8 flex flex-col justify-center bg-green-50 rounded-xl">
                    <h1 className="text-4xl font-bold mb-6 text-center text-gray-700 lg:text-center">
                        Register Now!
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="label">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="input input-bordered w-full"
                                placeholder="Your Name"
                                required
                            />
                        </div>
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
                            <label className="label">Photo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="input input-bordered w-full cursor-pointer"
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

                        {ermsg && <p className="text-red-500 mt-1">{ermsg}</p>}

                        <button
                            type="submit"
                            className={`w-full mt-2 py-2 cursor-pointer rounded-md font-semibold text-white transition-colors ${photourl && !imageLoading
                                ? "bg-[#22c55e] hover:bg-[#24725e]"
                                : "bg-gray-400 cursor-not-allowed"
                                }`}
                            disabled={!photourl || loading || imageLoading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <div className="text-sm mt-4 text-center lg:text-left">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Login
                        </Link>
                    </div>

                    <div className="mt-6">
                        <SocialLogin />
                    </div>
                </div>

                {/* Right: Register Animation */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
                    <Lottie
                        animationData={registerAnimation}
                        loop={true}
                        style={{ width: "100%", maxWidth: 400 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
