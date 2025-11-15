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
    useEffect(() => {
        document.title = "My Food Request";
    }, []);

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
            .then((res) => setRequests(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [user]);

    const totalPages = Math.ceil(requests.length / foodsPerPage);
    const paginatedFoods = requests.slice(
        (currentPage - 1) * foodsPerPage,
        currentPage * foodsPerPage
    );

    const skeletonRows = loading ? foodsPerPage : paginatedFoods.length;

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
                        setRequests((prev) => prev.filter((req) => req._id !== id));
                        if ((currentPage - 1) * foodsPerPage >= requests.length - 1 && currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                        }
                        Swal.fire({
                            icon: "success",
                            title: "Cancelled!",
                            text: res.data.message,
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    }
                } catch (err) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: err.response?.data?.message || "Something went wrong.",
                    });
                }
            }
        });
    };

    if (loading) return <MyFoodRequestSkeleton rows={skeletonRows} />;

    return (
        <motion.div
            className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-2xl sm:text-3xl md:text-4xl mt-8 font-extrabold text-deepgreen mb-12 text-center">
                My Food Requests
            </h2>

            {requests.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-10 gap-6">
                    <div className="w-56 sm:w-72 h-56 sm:h-72">
                        <Lottie animationData={NoData} loop />
                    </div>
                    <p className="text-deepgreen text-xl sm:text-2xl font-semibold text-center">
                        You haven't requested for any food
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pb-8">
                        <p className="text-[#22c55e] text-lg sm:text-2xl">To Request for food </p>
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
                                        />
                                    </svg>
                                </span>
                                Explore Foods
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    {/* Table */}
                    <div className="overflow-x-auto mt-6 rounded-lg shadow-lg border border-emerald-200">
                        <table className="table-auto w-full border border-emerald-200 rounded-lg overflow-hidden text-sm sm:text-base">
                            <thead className="bg-emerald-100 text-emerald-700">
                                <tr>
                                    <th className="p-4 md:p-2 text-left pl-3 sm:pl-6">Food</th>
                                    <th className="p-4 md:p-2 text-center hidden sm:table-cell">Donor</th>
                                    <th className="p-4 md:p-2 text-center">Pickup</th>
                                    <th className="p-4 md:p-2 text-center">Expire</th>
                                    <th className="p-4 md:p-2 text-center hidden sm:table-cell">Qty</th>
                                    <th className="p-4 md:p-2 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedFoods.map((food, index) => (
                                    <motion.tr
                                        key={food._id || index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-green-50 hover:bg-green-100 transition-all p-4 md:p-2"
                                    >
                                        <td className="p-4 md:p-2 text-left">
                                            <div className="flex items-center gap-2 sm:gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-10 w-10 sm:h-12 sm:w-12">
                                                        <img src={food.foodImage} alt={food.foodName} />
                                                    </div>
                                                </div>
                                                <div className="text-sm text-deepgreen sm:text-base font-bold">{food.foodName}</div>
                                            </div>
                                        </td>
                                        <td className="p-4 md:p-2 text-deepgreen text-center font-medium hidden sm:table-cell">{food.foodDonatorName}</td>
                                        <td className="p-4 md:p-2 text-center text-deepgreen font-medium">
                                            <div className="flex items-center justify-center gap-1">
                                                <MdLocationOn className="text-lightgreen" />
                                                {food.pickupLocation}
                                            </div>
                                        </td>
                                        <td className="p-4 md:p-2 text-center text-deepgreen font-medium">
                                            <div className="flex items-center justify-center gap-1">
                                                <MdEvent className="text-lightgreen" />
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
                                        <td className="p-4 md:p-2 text-center text-deepgreen font-medium hidden sm:table-cell">{food.requestedQuantity}</td>
                                        <td className="p-4 md:p-2 text-center">
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
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-6 sm:mt-10">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border cursor-pointer border-[#22c55e] text-[#22c55e] rounded hover:bg-[#22c55e] hover:text-white disabled:opacity-50 flex items-center gap-1"
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 border border-[#22c55e] cursor-pointer rounded ${currentPage === page ? "bg-[#22c55e] text-white" : "text-[#22c55e] hover:bg-[#22c55e] hover:text-white"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border cursor-pointer border-[#22c55e] text-[#22c55e] rounded hover:bg-[#22c55e] hover:text-white disabled:opacity-50 flex items-center gap-1"
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
