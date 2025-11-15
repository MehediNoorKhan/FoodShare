import React from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import pageNotFoundAnimation from "../../assets/pagenotfound.json";

const Error = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
            <div className="w-full max-w-md">
                <Lottie animationData={pageNotFoundAnimation} loop />
            </div>

            <h2 className="text-2xl font-semibold text-gray-700 mt-4">Page Not Found</h2>

            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-lightgreen text-white rounded-lg shadow-md hover:bg-deepgreen transition-all"
            >
                Go to Home
            </Link>
        </div>
    );
};

export default Error;
