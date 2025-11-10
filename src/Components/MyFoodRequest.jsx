import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdLocationOn, MdEvent } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router";
import axiosSecure from "../Hooks/axiosSecure";
import AuthContext from "../Provider/AuthContext";
import MyFoodRequestSkeleton from "../Skeletons/MyFoodRequestSkeleton";
import NoData from "../../assets/No-Data.json";
import Lottie from "lottie-react";
import Swal from "sweetalert2";

const MyFoodRequest = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const foodsPerPage = 5;

    useEffect(() => {
        setLoading(true);
        axiosSecure
            .get(`/myfoodrequest?email=${user.email}`)
            .then((res) => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching food requests:", err);
                setLoading(false);
            });
    }, [user]);

    if (loading) return <MyFoodRequestSkeleton rows={foodsPerPage} />;

    const totalPages = Math.ceil(requests.length / foodsPerPage);
    const paginatedFoods = requests.slice(
        (currentPage - 1) * foodsPerPage,
        currentPage * foodsPerPage
    );

    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to cancel this food request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "Go back",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/myfoodrequest/${id}`);

                    if (res.data?.message) {
                        // Remove canceled request from state
                        setRequests(prev => prev.filter(req => req._id !== id));

                        // Optional: adjust pagination if last item on page removed
                        if ((currentPage - 1) * foodsPerPage >= requests.length - 1 && currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                        }

                        // Show success alert
                        Swal.fire({
                            icon: "success",
                            title: "Cancelled!",
                            text: res.data.message,
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    }
                } catch (err) {
                    console.error("Error canceling request:", err);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: err.response?.data?.message || "Something went wrong. Please try again later.",
                    });
                }
            }
        });
    };



    return (
        <motion.div
            className="p-6 max-w-7xl mx-auto mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-3xl mt-8 font-extrabold text-green-700 mb-16 text-center">
                My Food Requests
            </h2>

            {requests.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-10 gap-6">
                    {/* Lottie Animation */}
                    <div className="w-72 h-72">
                        <Lottie animationData={NoData} loop={true} />
                    </div>

                    {/* Message */}
                    <p className="text-green-800 text-lg font-semibold text-center">
                        You haven't requested for any food
                    </p>

                    {/* Explore Foods Button */}
                    <div className="flex justify-center mt-4">
                        <Link to="/availablefood">
                            <button className="seemorebutton">
                                <span className="button__icon-wrapper">
                                    <svg
                                        viewBox="0 0 14 15"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="10"
                                        className="button__icon-svg"
                                    >
                                        <path
                                            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </span>
                                Explore All
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    {/* Table */}
                    <div className="overflow-x-auto mt-6 rounded-lg shadow-lg border border-emerald-200">
                        <table className="table-auto w-full border border-emerald-200 rounded-lg overflow-hidden">
                            <thead className="bg-emerald-100 text-emerald-700">
                                <tr>
                                    <th className="p-2 text-left pl-6">Food</th>
                                    <th className="p-2 text-center">Donor</th>
                                    <th className="p-2 text-center">Pickup Location</th>
                                    <th className="p-2 text-center">Expire Date</th>
                                    <th className="p-2 text-center">Quantity</th>
                                    <th className="p-2 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedFoods.map((food, index) => (
                                    <motion.tr
                                        key={food._id || index}
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
                                                </div>
                                            </div>
                                        </td>

                                        {/* Donor Name */}
                                        <td className="p-2 text-center font-medium">{food.foodDonatorName}</td>

                                        {/* Pickup Location */}
                                        <td className="p-2 text-center text-green-700 font-medium">
                                            <div className="flex items-center justify-center gap-1">
                                                <MdLocationOn className="text-green-500" />
                                                {food.pickupLocation}
                                            </div>
                                        </td>

                                        {/* Expire Date */}
                                        <td className="p-2 text-center text-green-700 font-medium">
                                            <div className="flex items-center justify-center gap-1">
                                                <MdEvent className="text-green-500" />
                                                {new Date(food.expireDate).toLocaleString("en-GB", {
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

                                        {/* Quantity */}
                                        <td className="p-2 text-center font-medium">{food.requestedQuantity}</td>

                                        {/* Cancel Button */}
                                        <td className="p-2 text-center">
                                            <button
                                                onClick={() => handleCancel(food._id)}
                                                className="btn btn-ghost btn-xs bg-red-500 hover:bg-red-600 text-white flex items-center gap-1 mx-auto"
                                            >
                                                <FaTimes /> Cancel
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
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
                </>
            )}
        </motion.div>
    );
};

export default MyFoodRequest;
