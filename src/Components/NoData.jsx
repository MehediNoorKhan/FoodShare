import React from "react";
import Lottie from "lottie-react";
import NoDataAnimation from "../../assets/No-Data.json";

const NoData = ({ message, subMessage, onAction, actionText }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-10 space-y-4">
            <div className="w-64 h-64">
                <Lottie animationData={NoDataAnimation} loop={true} />
            </div>
            <p className="text-[#24725e] text-2xl">{message}</p>
            <div className="flex items-center justify-center gap-2">
                <p className="text-[#22c55e] text-2xl">{subMessage}</p>
                {onAction && actionText && (
                    <button
                        onClick={onAction}
                        className="bg-[#22c55e] hover:bg-[#24725e] text-white font-semibold py-2 px-6 rounded-xl cursor-pointer shadow transition duration-300 mt-2"
                    >
                        {actionText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default NoData;
