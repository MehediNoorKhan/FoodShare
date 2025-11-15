import React, { useEffect, useState } from "react";
import axios from "axios";
import "../AvailableFoods.css";
import "../FeaturedFoods.css";
import Lottie from "lottie-react";
import noDataAnimation from "../../assets/No-Data.json";
import { CiCalendarDate } from "react-icons/ci";
import { GoLocation } from "react-icons/go";
import { MdOutlineInventory } from "react-icons/md";
import AOS from "aos";
import AvailableFoodSkeleton from "../Skeletons/AvailableFoodSkeleton";

const AvailableFoods = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [dropdownActive, setDropdownActive] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const foodsPerPage = 8;

    useEffect(() => {
        document.title = "Available Foods";
    }, []);

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await axios.get("https://foodhub-amber.vercel.app/available-foods", {
                    params: { search: searchTerm },
                });

                let availableFoods = res.data;
                const today = new Date();

                availableFoods = availableFoods.filter((food) => {
                    const exp = new Date(food.expiredDateTime);
                    return exp > today;
                });

                if (sortOrder === "asc") {
                    availableFoods.sort(
                        (a, b) => new Date(a.expiredDateTime) - new Date(b.expiredDateTime)
                    );
                } else if (sortOrder === "desc") {
                    availableFoods.sort(
                        (a, b) => new Date(b.expiredDateTime) - new Date(a.expiredDateTime)
                    );
                }

                setFoods(availableFoods);
            } catch (err) {
                console.error("Error fetching foods:", err);
                setFoods([]);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm, sortOrder]);

    const getRemainingDays = (expiredDateTime) => {
        if (!expiredDateTime) return 0;
        const today = new Date();
        const exp = new Date(expiredDateTime);
        const diffDays = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    const indexOfLastFood = currentPage * foodsPerPage;
    const indexOfFirstFood = indexOfLastFood - foodsPerPage;
    const currentFoods = foods.slice(indexOfFirstFood, indexOfLastFood);
    const totalPages = Math.ceil(foods.length / foodsPerPage);

    const handleSort = (order) => {
        setSortOrder(order);
        setDropdownActive(false);
    };

    return (
        <section className="bg-green-50 pt-12 relative z-0 px-4 sm:px-8 md:px-16">
            <div className="max-w-7xl mx-auto py-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#24725e] text-center mt-8 mb-12">
                    Available Foods
                </h1>

                {/* Search & Sort */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-24">
                    <input
                        type="text"
                        placeholder="Search food by name..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="input input-bordered w-full md:w-96 dark:bg-white dark:placeholder-green-300 dark:text-green-600"
                    />

                    <div
                        className="sort-dropdown"
                        onMouseLeave={() => setDropdownActive(false)}
                    >
                        <div
                            className={`selected ${dropdownActive ? "active" : ""}`}
                            onMouseEnter={() => setDropdownActive(true)}
                        >
                            <span>
                                {sortOrder === "desc"
                                    ? "Newest"
                                    : sortOrder === "asc"
                                        ? "Oldest"
                                        : "Sort"}
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="arrow">
                                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                            </svg>
                        </div>

                        <div className={`options ${dropdownActive ? "show" : ""}`}>
                            <div className="option" onClick={() => handleSort("desc")}>Newest</div>
                            <div className="option" onClick={() => handleSort("asc")}>Oldest</div>
                        </div>
                    </div>
                </div>

                {/* Food Cards */}
                {loading ? (
                    <AvailableFoodSkeleton count={8}></AvailableFoodSkeleton>
                ) : foods.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-12">
                        <Lottie animationData={noDataAnimation} loop className="w-64 h-64" />
                        <p className="text-gray-500 text-xl mt-4">There is no Food available</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {currentFoods.map((food) => (
                            <div
                                key={food._id}
                                data-aos="fade-up"
                                className="card transform transition duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer flex flex-col justify-between"
                            >
                                <div className="card__content flex flex-col gap-4 p-4">
                                    <span className="card__badge mb-2 text-sm text-white bg-[#22c55e] px-2 py-1 rounded-full">
                                        {getRemainingDays(food.expiredDateTime)} days left
                                    </span>

                                    <div className="card__image rounded-xl overflow-hidden">
                                        <img src={food.foodImage} alt={food.foodName} className="w-full h-40 object-cover" />
                                    </div>

                                    <p className="card__title text-lg font-bold text-gray-700">{food.foodName}</p>

                                    <div className="card__description flex flex-col gap-2 text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <MdOutlineInventory className="text-[#22c55e] w-5 h-5" />
                                            <strong>Quantity:</strong> {food.foodQuantity}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <GoLocation className="text-[#22c55e] w-5 h-5" />
                                            <strong>Pickup Location:</strong> {food.pickupLocation}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <CiCalendarDate className="text-[#22c55e] w-5 h-5" />
                                            <strong>Expires:</strong>{" "}
                                            {new Date(food.expiredDateTime).toLocaleString(undefined, {
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            })}
                                        </span>
                                    </div>

                                    {food.additionalNotes && (
                                        <p className="card__description italic opacity-80">{food.additionalNotes}</p>
                                    )}
                                </div>

                                <div className="card__footer flex justify-center pt-4 pb-6 mx-2">
                                    <a href={`/fooddetails/${food._id}`} className="w-full">
                                        <button className="card__button bg-[#22c55e] text-white rounded-full cursor-pointer px-4 py-2 font-semibold hover:bg-deepgreen w-full">
                                            View Details
                                        </button>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {foods.length > foodsPerPage && (
                    <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border border-[#22c55e] text-[#22c55e] rounded hover:bg-[#22c55e] hover:text-white disabled:opacity-50"
                        >
                            Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 border border-[#22c55e] rounded ${currentPage === page
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
                            className="px-3 py-1 border border-[#22c55e] text-[#22c55e] rounded hover:bg-[#22c55e] hover:text-white disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AvailableFoods;
