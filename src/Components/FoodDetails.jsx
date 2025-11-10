import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import AuthContext from "../Provider/AuthContext";
import { CiCalendarDate } from "react-icons/ci";
import { GoLocation } from "react-icons/go";
import { MdOutlineInventory } from "react-icons/md";
import { FaUserAlt, FaTimes } from "react-icons/fa";
import NoData from "../../assets/No-Data.json"; // Lottie animation
import Lottie from "lottie-react";

const FoodDetails = () => {
    const food = useLoaderData();
    const { user } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);
    const [additionalNotes, setAdditionalNotes] = useState("");
    const [requestQuantity, setRequestQuantity] = useState(1); // quantity to request

    if (!food) {
        return (
            <div className="flex justify-center items-center mt-20">
                <Lottie animationData={NoData} loop={true} style={{ width: 300 }} />
            </div>
        );
    }

    const handleRequest = async () => {
        const requestData = {
            foodId: food._id,
            userEmail: user?.email || "",
            requestedQuantity: requestQuantity,
            additionalNotes,
        };

        try {
            // Single API call to handle food request
            const response = await axios.post("http://localhost:5000/requestfoods", requestData);

            if (response.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Request Submitted",
                    text: response.data.message,
                });
                setShowModal(false);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Request Failed",
                    text: response.data.message,
                });
            }
        } catch (error) {
            console.error("Request error:", error);
            Swal.fire({
                icon: "error",
                title: "Request Failed",
                text: "Something went wrong. Please try again later.",
            });
        }
    };

    return (
        <div
            className="relative min-h-screen flex items-center justify-center p-28 mt-16"
            style={{
                backgroundImage: `url(${food.foodImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-md rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-3xl cursor-pointer p-8 flex flex-col gap-4">
                <div className="w-full h-48 overflow-hidden rounded-lg">
                    <img
                        src={food.foodImage}
                        alt={food.foodName}
                        className="w-full h-full object-cover"
                    />
                </div>

                <p className="text-2xl font-bold text-white">{food.foodName}</p>

                <p className="flex items-center gap-2 text-white">
                    <MdOutlineInventory className="text-green-200 w-5 h-5" />
                    <strong>Quantity:</strong> {food.foodQuantity}
                </p>

                <p className="flex items-center gap-2 text-white">
                    <GoLocation className="text-green-200 w-5 h-5" />
                    <strong>Pickup Location:</strong> {food.pickupLocation}
                </p>

                <p className="flex items-center gap-2 text-white">
                    <CiCalendarDate className="text-green-200 w-5 h-5" />
                    <strong>Expires:</strong>{" "}
                    {new Date(food.expiredDateTime).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                    })}
                </p>

                <p className="flex items-center gap-2 text-white">
                    <FaUserAlt className="text-green-200 w-5 h-5" />
                    <strong>Donated by:</strong> {food.donorName}
                </p>

                {food.additionalNotes && (
                    <p className="text-white/90 italic">{food.additionalNotes}</p>
                )}

                <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 bg-green-500 cursor-pointer text-white px-5 py-3 rounded hover:bg-green-600 transition-all duration-300"
                >
                    Request
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={() => setShowModal(false)}
                    ></div>

                    <div className="relative z-10 w-full max-w-lg bg-green-100 rounded-xl shadow-lg p-4 flex flex-col gap-3 mx-auto">
                        <button
                            onClick={() => setShowModal(false)}
                            className="cursor-pointer absolute top-3 right-3 text-red-500 hover:text-red-700"
                        >
                            <FaTimes className="w-6 h-6" />
                        </button>

                        <h2 className="text-xl font-bold text-green-800 text-start mt-2">
                            Request Food
                        </h2>

                        <div className="w-36 h-36 mx-auto rounded-xl mt-2 overflow-hidden">
                            <img
                                src={food.foodImage}
                                alt={food.foodName}
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-green-900">
                            <p className="flex items-center gap-2">
                                <MdOutlineInventory className="w-5 h-5 font-semibold" /> {food.foodName}
                            </p>
                            <p className="flex items-center gap-2">
                                <GoLocation className="w-5 h-5" /> Pickup: {food.pickupLocation}
                            </p>
                            <p className="flex items-center gap-2">
                                <CiCalendarDate className="w-5 h-5" /> Expires: {new Date(food.expiredDateTime).toLocaleString()}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaUserAlt className="w-5 h-5" /> Donated by: {food.donorName}
                            </p>
                        </div>

                        <label className="block text-green-900 mt-2">
                            Quantity to Request
                            <select
                                value={requestQuantity}
                                onChange={(e) => setRequestQuantity(Number(e.target.value))}
                                className="select select-bordered w-full mt-1 bg-white/30 text-green-900"
                            >
                                {Array.from({ length: food.foodQuantity }, (_, i) => i + 1).map((qty) => (
                                    <option key={qty} value={qty}>{qty}</option>
                                ))}
                            </select>
                        </label>

                        <label className="block text-green-900 mt-2">
                            Additional Notes
                            <textarea
                                className="textarea textarea-bordered w-full bg-white/30 text-green-900"
                                rows={2}
                                value={additionalNotes}
                                onChange={(e) => setAdditionalNotes(e.target.value)}
                                placeholder="Add any notes here..."
                            />
                        </label>

                        <div className="flex justify-center mt-3">
                            <button
                                onClick={handleRequest}
                                className="px-6 py-2 cursor-pointer bg-white text-green-600 font-semibold rounded hover:bg-white/90 transition"
                            >
                                Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodDetails;
