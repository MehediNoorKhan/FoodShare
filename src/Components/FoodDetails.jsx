import React, { useContext, useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import AuthContext from "../Provider/AuthContext";
import { CiCalendarDate } from "react-icons/ci";
import { GoLocation } from "react-icons/go";
import { MdOutlineInventory } from "react-icons/md";
import { FaUserAlt, FaTimes } from "react-icons/fa";
import Lottie from "lottie-react";
import NoData from "../../assets/No-Data.json";
import { motion } from "framer-motion";
import FoodDetailsSkeleton from "../Skeletons/FoodDetailsSkeelton";

const FoodDetails = () => {
    const food = useLoaderData();
    const { user } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);
    const [additionalNotes, setAdditionalNotes] = useState("");
    const [requestQuantity, setRequestQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (!food && !loading) {
        return (
            <div className="flex justify-center items-center mt-20">
                <Lottie animationData={NoData} loop style={{ width: 300 }} />
            </div>
        );
    }

    const handleRequest = async () => {
        const requestData = {
            foodId: food._id,
            userEmail: user?.email,
            requestedQuantity: requestQuantity,
            additionalNotes,
        };

        try {
            const res = await axios.post("https://foodhub-amber.vercel.app/requestfoods", requestData);
            if (res.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Request Submitted!",
                    text: res.data.message,
                });
                setShowModal(false);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Request Failed",
                    text: res.data.message,
                });
            }
        } catch {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong. Try again.",
            });
        }
    };

    return (
        <div
            className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8 lg:p-28 mt-16 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${food?.foodImage})` }}
        >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            {loading ? <FoodDetailsSkeleton></FoodDetailsSkeleton> : (
                <motion.div
                    className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl p-6 md:p-8 flex flex-col gap-4 transition duration-300 hover:shadow-xl"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="w-full h-48 overflow-hidden rounded-lg">
                        <img src={food.foodImage} alt={food.foodName} className="w-full h-full object-cover" />
                    </div>

                    <p className="text-2xl font-bold text-lightgreen">{food.foodName}</p>

                    <p className="flex items-center gap-2 text-gray-200">
                        <MdOutlineInventory className="text-lightgreen w-5 h-5" />
                        <strong className="text-gray-300">Quantity:</strong> {food.foodQuantity}
                    </p>

                    <p className="flex items-center gap-2 text-gray-200">
                        <GoLocation className="text-lightgreen w-5 h-5" />
                        <strong className="text-gray-300">Pickup Location:</strong> {food.pickupLocation}
                    </p>

                    <p className="flex items-center gap-2 text-gray-200">
                        <CiCalendarDate className="text-lightgreen w-5 h-5" />
                        <strong className="text-gray-300">Expires:</strong>{" "}
                        {new Date(food.expiredDateTime).toLocaleString()}
                    </p>

                    <p className="flex items-center gap-2 text-gray-200">
                        <FaUserAlt className="text-lightgreen w-5 h-5" />
                        <strong className="text-gray-300">Donated by:</strong> {food.donorName}
                    </p>

                    {food.additionalNotes && (
                        <p className="text-gray-300 italic">"{food.additionalNotes}"</p>
                    )}

                    <button
                        onClick={() => setShowModal(true)}
                        className="mt-4 bg-lightgreen text-white px-5 py-3 rounded-lg cursor-pointer hover:bg-lightgreen shadow-md transition-all"
                    >
                        Request
                    </button>
                </motion.div>
            )}

            {/* --- Responsive Scrollable Modal --- */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-36 md:pt-36 lg:pt-2">
                    <div
                        className="absolute inset-0 bg-transparent backdrop-blur-sm"
                        onClick={() => setShowModal(false)}
                    ></div>

                    <motion.div
                        className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto bg-green-100 rounded-xl p-5 lg:mt-16 sm:p-6 shadow-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 cursor-pointer text-red-500 hover:text-red-700"
                        >
                            <FaTimes className="w-6 h-6" />
                        </button>

                        <h2 className="text-xl font-bold text-deepgreen mt-2">Request Food</h2>

                        <div className="w-32 h-32 mx-auto rounded-xl overflow-hidden my-3">
                            <img src={food.foodImage} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex justify-between gap-3 lg:gap-6 md:gap-4 text-deepgreen my-2">
                            <p className="flex flex-inline justify-center items-center gap-1"><MdOutlineInventory /> {food.foodName}</p>
                            <p className="flex flex-inline justify-center items-center gap-1"><GoLocation /> {food.pickupLocation}</p>

                        </div>
                        <div className="flex justify-between flex-wrap gap-3 lg:gap-6 md:gap-4 text-deepgreen my-2">

                            <p className="flex flex-inline justify-center items-center gap-1"><CiCalendarDate /> {new Date(food.expiredDateTime).toLocaleString()}</p>
                            <p className="flex flex-inline justify-center items-center gap-1"><FaUserAlt /> {food.donorName}</p>
                        </div>

                        <label className="block text-deepgreen mt-3">
                            Quantity
                            <select
                                value={requestQuantity}
                                onChange={(e) => setRequestQuantity(Number(e.target.value))}
                                className="select select-bordered w-full bg-white"
                            >
                                {Array.from({ length: food.foodQuantity }, (_, i) => i + 1).map((qty) => (
                                    <option key={qty} value={qty}>{qty}</option>
                                ))}
                            </select>
                        </label>

                        <label className="block text-deepgreen mt-3">
                            Notes
                            <textarea
                                className="textarea textarea-bordered w-full bg-white"
                                rows={2}
                                value={additionalNotes}
                                onChange={(e) => setAdditionalNotes(e.target.value)}
                            />
                        </label>

                        <button
                            onClick={handleRequest}
                            className="px-6 py-2 bg-lightgreen text-white cursor-pointer font-semibold rounded hover:bg-deepgreen transition mt-4 w-full"
                        >
                            Submit Request
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default FoodDetails;
