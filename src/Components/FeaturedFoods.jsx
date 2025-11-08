import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { MdOutlineInventory } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { CiCalendarDate } from "react-icons/ci";
import "../FeaturedFoods.css";
import Lottie from "lottie-react";
import noDataAnimation from "../../assets/No-Data.json"; // Make sure path is correct

const FeaturedFoods = () => {
    const [featuredFoods, setFeaturedFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:5000/food");
                setFeaturedFoods(res.data || []);
            } catch (err) {
                console.error("Error fetching featured foods:", err);
                setFeaturedFoods([]);
            } finally {
                setLoading(false);
            }
        };
        fetchFoods();
    }, []);

    const getRemainingDays = (expiredDateTime) => {
        if (!expiredDateTime) return 0;
        const today = new Date();
        const exp = new Date(expiredDateTime);
        const diffDays = Math.ceil(
            (new Date(exp.getFullYear(), exp.getMonth(), exp.getDate()) -
                new Date(today.getFullYear(), today.getMonth(), today.getDate())) /
            (1000 * 60 * 60 * 24)
        );
        return diffDays > 0 ? diffDays : 0;
    };

    const validFoods = featuredFoods
        .filter((food) => getRemainingDays(food.expiredDateTime) > 0)
        .slice(0, 8);

    return (
        <section className="bg-green-50">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold mb-8 text-center text-[#24725e]">
                    Featured Foods
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {loading ? (
                        // Skeleton Loader
                        Array(4)
                            .fill(0)
                            .map((_, idx) => (
                                <div
                                    key={idx}
                                    className="card flex flex-col justify-between animate-pulse p-4 bg-white rounded-xl shadow"
                                >
                                    <div className="flex flex-col gap-4">
                                        <div className="bg-gray-300 h-6 w-24 rounded-full"></div>
                                        <div className="bg-gray-300 h-40 w-full rounded-xl"></div>
                                        <div className="bg-gray-300 h-6 w-full rounded"></div>
                                        <div className="bg-gray-300 h-6 w-full rounded"></div>
                                        <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
                                    </div>
                                    <div className="bg-gray-300 h-10 w-full rounded-full mt-4"></div>
                                </div>
                            ))
                    ) : validFoods.length === 0 ? (
                        // No Data Animation
                        <div className="col-span-4 flex flex-col items-center justify-center">
                            <Lottie
                                animationData={noDataAnimation}
                                loop
                                className="w-64 h-64"
                            />
                            <p className="text-gray-500 text-xl mt-4">
                                No featured foods available
                            </p>
                        </div>
                    ) : (
                        // Actual Food Cards
                        validFoods.map((food) => (
                            <div
                                key={food._id}
                                className="card transform transition duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer flex flex-col justify-between"
                            >
                                <div className="card__content flex flex-col gap-4 p-4">
                                    <span className="card__badge mb-2 text-sm text-white bg-[#22c55e] px-2 py-1 rounded-full">
                                        {getRemainingDays(food.expiredDateTime)} days left
                                    </span>

                                    <div className="card__image rounded-xl overflow-hidden">
                                        <img
                                            src={food.foodImage}
                                            alt={food.foodName}
                                            className="w-full h-40 object-cover"
                                        />
                                    </div>

                                    <p className="card__title text-lg font-bold text-gray-700">
                                        {food.foodName}
                                    </p>

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
                                </div>

                                <div className="card__footer flex justify-center pt-4 pb-6 mx-2">
                                    <Link to={`/fooddetails/${food._id}`} className="w-full">
                                        <button className="card__button bg-[#22c55e] text-white rounded-full px-4 py-2 font-semibold hover:bg-green-600 cursor-pointer w-full">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* See More Button */}
                <div className="flex justify-center mt-10">
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
        </section>
    );
};

export default FeaturedFoods;
