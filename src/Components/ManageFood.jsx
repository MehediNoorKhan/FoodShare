import React, { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../Hooks/axiosSecure.js";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import AuthContext from "../Provider/AuthContext.jsx";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

const Spinner = () => (
    <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
    </div>
);

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

    const { data: foods = [], isLoading } = useQuery({
        queryKey: ["manage-food", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/manage-food?email=${user.email}`);
            return res.data;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => await axiosSecure.delete(`/food/${id}`),
        onSuccess: (_, id) => {
            toast.success("Food deleted successfully");
            queryClient.setQueryData(["manage-food", user.email], (old) =>
                old.filter((item) => item._id !== id)
            );
        },
        onError: () => toast.error("Failed to delete food"),
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

    if (isLoading) return <Spinner />;

    return (
        <div className="max-w-7xl mx-auto p-20">
            <h1 className="text-3xl font-bold mb-6 mt-8 text-center text-emerald-600">
                Manage Your Foods
            </h1>

            {foods.length === 0 ? (
                <div className="text-center space-y-4">
                    <p className="text-gray-500 text-lg">
                        You haven't added any food yet.
                    </p>
                    <button
                        onClick={() => navigate("/addfood")}
                        className="inline-block cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded shadow transition duration-300"
                    >
                        Add Food
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto mt-6 rounded-lg shadow-lg border border-emerald-200">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Food</th>
                                <th>Quantity</th>
                                <th>Pickup Location</th>
                                <th>Expire Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foods.map((food, index) => (
                                <motion.tr
                                    key={food._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-green-50 hover:bg-green-100 transition-all"
                                >
                                    <td>
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
                                    <td>{food.foodQuantity}</td>
                                    <td>{food.pickupLocation}</td>
                                    <td>
                                        {new Date(food.expiredDateTime).toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "numeric",
                                            minute: "2-digit",
                                            second: "2-digit",
                                            hour12: true,
                                        })}
                                    </td>
                                    <td className="flex gap-2">
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
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Update Modal */}
            {showUpdateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-green-50 p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4 text-emerald-700">
                            Update Food
                        </h2>
                        <form onSubmit={handleUpdateSubmit} className="space-y-3">
                            {[
                                { label: "Food Name", name: "foodName", type: "text" },
                                { label: "Image URL", name: "foodImage", type: "text" },
                                { label: "Quantity", name: "foodQuantity", type: "number" },
                                { label: "Pickup Location", name: "pickupLocation", type: "text" },
                                {
                                    label: "Expire Date/Time",
                                    name: "expiredDateTime",
                                    type: "datetime-local",
                                    value: new Date(updateForm.expiredDateTime)
                                        .toISOString()
                                        .slice(0, 16),
                                },
                            ].map(({ label, name, type, value }) => (
                                <label key={name} className="block">
                                    <span className="text-sm font-medium">{label}</span>
                                    <input
                                        name={name}
                                        type={type}
                                        value={value ?? updateForm[name]}
                                        onChange={handleUpdateChange}
                                        required
                                        className="input input-bordered w-full mt-1"
                                    />
                                </label>
                            ))}
                            <label className="block">
                                <span className="text-sm font-medium">Additional Notes</span>
                                <textarea
                                    name="additionalNotes"
                                    value={updateForm.additionalNotes}
                                    onChange={handleUpdateChange}
                                    className="textarea textarea-bordered w-full mt-1"
                                />
                            </label>
                            <div className="flex justify-end space-x-3 mt-4">
                                <button
                                    type="button"
                                    className="btn btn-outline flex items-center gap-1"
                                    onClick={() => setShowUpdateModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary flex items-center gap-1"
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
