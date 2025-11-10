import React from "react";
import Lottie from "lottie-react";
import NoDataAnimation from "../assets/No-Data.json";

const NoData = ({ message, subMessage, onAction, actionText }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-10 space-y-4">
            <div className="w-64 h-64">
                <Lottie animationData={NoDataAnimation} loop={true} />
            </div>
            <p className="text-gray-500 text-lg">{message}</p>
            <p className="text-gray-400 text-sm">{subMessage}</p>
            {onAction && actionText && (
                <button
                    onClick={onAction}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded shadow transition duration-300 mt-2"
                >
                    {actionText}
                </button>
            )}
        </div>
    );
};

export default NoData;
