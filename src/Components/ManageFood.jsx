import React, { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../Hooks/axiosSecure.js";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import AuthContext from "../Provider/AuthContext.jsx";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdLocationOn, MdEvent } from "react-icons/md";
import ManageFoodSkeleton from "../Skeletons/ManageFoodSkeleton.jsx";

const ManageFood = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentFood, setCurrentFood] = useState(null);
    const [updateForm, setUpdateForm] = useState({
        foodName: "",
        foodImage: "",
        foodQuantity: "",
        pickupLocation: "",
        expiredDateTime: "",
        additionalNotes: "",
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const foodsPerPage = 5;

    const { data: foods = [], isLoading } = useQuery({
        queryKey: ["manage-food", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/food/user/${user.email}`);
            return res.data;
        },
    });

    const totalPages = Math.ceil(foods.length / foodsPerPage);
    const paginatedFoods = foods.slice(
        (currentPage - 1) * foodsPerPage,
        currentPage * foodsPerPage
    );

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/food/${id}`);
            return res.data;
        },
        onSuccess: (_, id) => {
            toast.success("Food deleted successfully");
            queryClient.setQueryData(["manage-food", user.email], (old) =>
                old.filter((item) => item._id !== id)
            );
        },
        onError: (error) => {
            if (error.response && error.response.data?.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Failed to delete food");
            }
        },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, updatedData }) =>
            await axiosSecure.put(`/food/${id}`, updatedData),
        onSuccess: (_, { id, updatedData }) => {
            toast.success("Food updated successfully");
            queryClient.setQueryData(["manage-food", user.email], (old) =>
                old.map((item) => (item._id === id ? { ...item, ...updatedData } : item))
            );
            setShowUpdateModal(false);
        },
        onError: () => toast.error("Failed to update food"),
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will lose this food entry!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    const openUpdateModal = (food) => {
        setCurrentFood(food);
        setUpdateForm({
            foodName: food.foodName,
            foodImage: food.foodImage,
            foodQuantity: food.foodQuantity,
            pickupLocation: food.pickupLocation,
            expiredDateTime: food.expiredDateTime,
            additionalNotes: food.additionalNotes || "",
        });
        setShowUpdateModal(true);
    };

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdateForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        if (!currentFood?._id) return;
        updateMutation.mutate({ id: currentFood._id, updatedData: updateForm });
    };

    if (isLoading) return <ManageFoodSkeleton />;

    return (
        <div className="max-w-7xl mx-auto p-20">
            <h1 className="text-3xl font-bold mb-16 mt-8 text-center text-emerald-600">
                Manage Your Foods
            </h1>

            {foods.length === 0 ? (
                <NoData
                    message="You haven't added any Food yet"
                    subMessage="You can 'Add Food' if you want."
                    actionText="Add Food"
                    onAction={() => navigate("/addfood")}
                />
            ) : (
                <>
                    <div className="overflow-x-auto mt-6 rounded-lg shadow-lg border border-emerald-200">
                        <table className="table-auto w-full border border-emerald-200 rounded-lg overflow-hidden">
                            <thead className="bg-emerald-100 text-emerald-700">
                                <tr>
                                    <th className="p-2 text-left pl-18">Food</th>
                                    <th className="p-2 text-center">Quantity</th>
                                    <th className="p-2 text-center">Pickup Location</th>
                                    <th className="p-2 text-center">Expire Date</th>
                                    <th className="p-2 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedFoods.map((food, index) => (
                                    <motion.tr
                                        key={food._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-green-50 hover:bg-green-100 transition-all"
                                    >
                                        {/* Food Info */}
                                        <td className="p-2 text-left">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img src={food.foodImage} alt={food.foodName} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{food.foodName}</div>
                                                    <div className="text-sm opacity-50">{food.donorName}</div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Quantity */}
                                        <td className="p-2 text-center font-medium">{food.foodQuantity}</td>

                                        {/* Pickup Location */}
                                        <td className="p-2 text-green-700 text-center font-medium">
                                            <div className="flex items-center justify-center gap-1">
                                                <MdLocationOn className="text-green-500" /> {food.pickupLocation}
                                            </div>
                                        </td>

                                        {/* Expire Date */}
                                        <td className="p-2 text-center text-green-700 font-medium">
                                            <div className="flex items-center justify-center gap-1">
                                                <MdEvent className="text-green-500" />
                                                {new Date(food.expiredDateTime).toLocaleString("en-GB", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                    hour: "numeric",
                                                    minute: "2-digit",
                                                    second: "2-digit",
                                                    hour12: true,
                                                })}
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="p-2">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => openUpdateModal(food)}
                                                    className="btn btn-ghost btn-xs bg-yellow-400 hover:bg-yellow-500 text-white flex items-center gap-1"
                                                >
                                                    <FaEdit /> Update
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(food._id)}
                                                    disabled={deleteMutation.isLoading}
                                                    className="btn btn-ghost btn-xs bg-red-500 hover:bg-red-600 text-white flex items-center gap-1"
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {foods.length > foodsPerPage && (
                        <div className="flex items-center justify-center gap-2 mt-10">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border cursor-pointer border-[#22c55e] text-[#22c55e] rounded hover:bg-[#22c55e] hover:text-white disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#22c55e] flex items-center gap-1"
                            >
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 border border-[#22c55e] cursor-pointer rounded ${currentPage === page
                                        ? "bg-[#22c55e] text-white"
                                        : "text-[#22c55e] hover:bg-[#22c55e] hover:text-white"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 cursor-pointer border border-[#22c55e] text-[#22c55e] rounded hover:bg-[#22c55e] hover:text-white disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#22c55e] flex items-center gap-1"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}

            {showUpdateModal && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
                    <div className="bg-green-50 p-5 rounded-lg shadow-lg w-full max-w-md max-h-[75vh] overflow-y-auto relative">
                        {/* Close button */}
                        <button
                            onClick={() => setShowUpdateModal(false)}
                            className="absolute top-3 right-3 cursor-pointer text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-lg transition"
                        >
                            ×
                        </button>

                        <h2 className="text-xl font-semibold mb-3 text-emerald-700 text-center">
                            Update Food
                        </h2>

                        {/* Food Image */}
                        <div className="flex justify-center mb-3 relative">
                            <img
                                src={updateForm.foodImage}
                                alt={updateForm.foodName}
                                className="h-24 w-24 object-cover rounded-lg shadow-md cursor-pointer"
                                onClick={() => document.getElementById("updateFoodImageInput").click()}
                            />
                            <input
                                type="file"
                                id="updateFoodImageInput"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (event) => {
                                            setUpdateForm((prev) => ({
                                                ...prev,
                                                foodImage: event.target.result
                                            }));
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </div>

                        <form onSubmit={handleUpdateSubmit} className="space-y-2">
                            <label className="block">
                                <span className="text-sm font-medium">Food Name</span>
                                <input
                                    name="foodName"
                                    type="text"
                                    value={updateForm.foodName}
                                    onChange={handleUpdateChange}
                                    required
                                    className="input input-bordered w-full mt-1"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium">Quantity</span>
                                <input
                                    name="foodQuantity"
                                    type="number"
                                    value={updateForm.foodQuantity}
                                    onChange={handleUpdateChange}
                                    required
                                    className="input input-bordered w-full mt-1"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium">Pickup Location</span>
                                <input
                                    name="pickupLocation"
                                    type="text"
                                    value={updateForm.pickupLocation}
                                    onChange={handleUpdateChange}
                                    required
                                    className="input input-bordered w-full mt-1"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium">Expire Date/Time</span>
                                <input
                                    name="expiredDateTime"
                                    type="datetime-local"
                                    value={new Date(updateForm.expiredDateTime).toISOString().slice(0, 16)}
                                    onChange={handleUpdateChange}
                                    required
                                    className="input input-bordered w-full mt-1"
                                />
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium">Additional Notes</span>
                                <textarea
                                    name="additionalNotes"
                                    value={updateForm.additionalNotes}
                                    onChange={handleUpdateChange}
                                    className="textarea textarea-bordered w-full mt-1"
                                />
                            </label>

                            <div className="flex justify-center mt-3">
                                <button
                                    type="submit"
                                    className="bg-[#22c55e] hover:bg-[#24725e] px-6 py-3 text-white rounded-full text-lg font-semibold shadow-lg transition flex items-center gap-2"
                                    disabled={updateMutation.isLoading}
                                >
                                    <FaEdit /> Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageFood;
