import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../Hooks/useAuth";

export default function AddFood() {
    const { user, token } = useAuth(); // user.email, user.displayName
    const [users, setUsers] = useState([]);
    const [foundCount, setFoundCount] = useState(0);
    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch all users safely
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get("https://ass11github.vercel.app/users");
                setUsers(res.data || []);
            } catch (err) {
                console.error("Failed to fetch users:", err);
                setError("Could not load users. You can still add food for yourself.");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Fetch user's food count
    useEffect(() => {
        if (!user?.email) return;
        const fetchCount = async () => {
            try {
                const res = await axios.get(`https://ass11github.vercel.app/food/count/${user.email}`);
                setFoundCount(res.data.count || 0);
            } catch (err) {
                console.error("Failed to fetch food count:", err);
            }
        };
        fetchCount();
    }, [user?.email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!foodName || quantity < 1) return;

        const foodData = {
            donorEmail: user.email,
            donorName: user.displayName,
            foodName,
            foodQuantity: quantity,
            foodStatus: "available",
            createdAt: new Date(),
        };

        try {
            const res = await axios.post("https://ass11github.vercel.app/food", foodData);
            alert("Food added successfully!");
            setFoodName("");
            setQuantity(1);
            setFoundCount(prev => prev + 1); // update count
        } catch (err) {
            console.error("Failed to add food:", err);
            alert("Failed to add food. Try again.");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow rounded mt-8">
            <h2 className="text-xl font-bold mb-2">Add Food</h2>
            <p className="mb-4 text-gray-600">
                Hello, {user.displayName}! You have added <strong>{foundCount}</strong> food items so far.
            </p>
            {error && <p className="text-red-500 mb-2">{error}</p>}

            {/* ORIGINAL FORM */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                    <label className="block mb-1 font-medium">Food Name</label>
                    <input
                        type="text"
                        value={foodName}
                        onChange={(e) => setFoodName(e.target.value)}
                        className="w-full border px-2 py-1 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Quantity</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-full border px-2 py-1 rounded"
                        min={1}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Add Food
                </button>
            </form>
        </div>
    );
}
