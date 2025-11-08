import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import AuthContext from "../Provider/AuthContext";
import { CiCalendarDate } from "react-icons/ci";
import { GoLocation } from "react-icons/go";
import { MdOutlineInventory } from "react-icons/md";
import { FaUserAlt, FaTimes } from "react-icons/fa";

const FoodDetails = () => {
    const food = useLoaderData();
    const { user } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);
    const [additionalNotes, setAdditionalNotes] = useState("");

    if (!food) {
        return <div className="text-center mt-10">Food data not found.</div>;
    }

    const handleRequest = async () => {
        const requestData = {
            foodId: food._id,
            foodName: food.foodName,
            foodImage: food.foodImage,
            foodDonatorName: food.donorName,
            userEmail: user?.email || "",
            requestDate: new Date().toISOString(),
            pickupLocation: food.pickupLocation,
            expireDate: food.expiredDateTime,
            additionalNotes,
        };

        try {
            await axios.patch(`http://localhost:5000/food/${food._id}`, {
                foodStatus: "requested",
            });

            await axios.post(
                "http://localhost:5000/requestedfoods",
                requestData
            );

            Swal.fire({
                icon: "success",
                title: "Request Submitted",
                text: "Your food request was successful!",
            });

            setShowModal(false);
        } catch (error) {
            console.error("Request error:", error);
            Swal.fire({
                icon: "error",
                title: "Request Failed",
                text: "Something went wrong. Please try again later.",
            });
        }
    };

    const getRemainingDays = (expiredDateTime) => {
        if (!expiredDateTime) return 0;
        const today = new Date();
        const exp = new Date(expiredDateTime);
        const diffDays = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
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
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-md rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-3xl cursor-pointer p-8 flex flex-col gap-4">
                {/* Clear Food Image */}
                <div className="w-full h-48 overflow-hidden rounded-lg">
                    <img
                        src={food.foodImage}
                        alt={food.foodName}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Food Info */}
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

            {/* Request Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Transparent overlay */}
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={() => setShowModal(false)}
                    ></div>

                    {/* Modal content */}
                    <div className="relative z-10 w-full max-w-lg bg-green-100 rounded-xl shadow-lg p-6 flex flex-col gap-4 mx-auto">
                        {/* Close button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="cursor-pointer absolute top-3 right-3 text-red-500 hover:text-red-700"
                        >
                            <FaTimes className="w-6 h-6" />
                        </button>

                        {/* Food Image */}


                        {/* Modal Title */}
                        <h2 className="text-xl font-bold text-green-800 text-start mt-2">
                            Request Food
                        </h2>
                        <div className="w-48 h-48 mx-auto rounded-xl mt-4 overflow-hidden">
                            <img
                                src={food.foodImage}
                                alt={food.foodName}
                                className="w-3/4 h-3/4 rounded-full object-cover"
                            />
                        </div>

                        {/* Food Details */}
                        <div className="grid grid-cols-2 gap-4 text-green-900">
                            <p className="flex items-center gap-2">
                                <MdOutlineInventory className="w-5 h-5" /> Quantity: {food.foodQuantity}
                            </p>
                            <p className="flex items-center gap-2">
                                <GoLocation className="w-5 h-5" /> Pickup: {food.pickupLocation}
                            </p>
                            <p className="flex items-center gap-2">
                                <CiCalendarDate className="w-5 h-5" /> Expires:{" "}
                                {new Date(food.expiredDateTime).toLocaleString()}
                            </p>
                            <p className="flex items-center gap-2">
                                <FaUserAlt className="w-5 h-5" /> Donated by: {food.donorName}
                            </p>
                        </div>

                        {/* Additional Notes */}
                        <label className="block text-green-900 mt-2">
                            Additional Notes
                            <textarea
                                className="textarea textarea-bordered w-full bg-white/30 text-green-900"
                                rows={3}
                                value={additionalNotes}
                                onChange={(e) => setAdditionalNotes(e.target.value)}
                                placeholder="Add any notes here..."
                            />
                        </label>

                        {/* Request Button */}
                        <div className="flex justify-center mt-4">
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
