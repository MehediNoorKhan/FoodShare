import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import AddFoodSkeleton from "../Skeletons/AddFoodSkeleton";
import Lottie from "lottie-react"; // Import Lottie
import limitReachedAnimation from "../../assets/limitreached.json"; // Import JSON animation

const AddFood = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const [postCount, setPostCount] = useState(null); // Track user's post count
    const imageHostKey = import.meta.env.VITE_IMGBB_KEY;

    // Fetch user post count
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/users/${user?.email}`);
                setPostCount(res.data?.post || 0);
            } catch (err) {
                console.error(err);
                setPostCount(0);
            }
        };
        if (user?.email) fetchUserData();
    }, [user?.email]);

    const handleAddFood = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const foodName = form.foodName.value;
        const quantity = form.quantity.value;
        const pickupLocation = form.pickupLocation.value;
        const expireDate = form.expireDate.value;
        const additionalNotes = form.additionalNotes.value;
        const imageFile = form.foodImage.files[0];

        if (!imageFile) {
            Swal.fire("Error", "Please select an image", "error");
            setLoading(false);
            return;
        }

        try {
            setImageUploading(true);

            const resizeImage = (file, maxWidth = 600, maxHeight = 600) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    const reader = new FileReader();
                    reader.onload = (e) => (img.src = e.target.result);
                    img.onload = () => {
                        const canvas = document.createElement("canvas");
                        let width = img.width;
                        let height = img.height;
                        if (width > height && width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        } else if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);
                        canvas.toBlob((blob) => resolve(blob), file.type, 0.75);
                    };
                    reader.readAsDataURL(file);
                });
            };

            const resizedBlob = await resizeImage(imageFile);
            const formData = new FormData();
            formData.append("image", resizedBlob);

            const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
            const imgRes = await fetch(url, { method: "POST", body: formData });
            const imgData = await imgRes.json();
            setImageUploading(false);

            if (!imgData.success) {
                setLoading(false);
                Swal.fire("Error", "Image upload failed", "error");
                return;
            }

            Swal.fire("Success!", "Image uploaded successfully 🎉", "success");

            const foodData = {
                foodName,
                foodImage: imgData.data.url,
                foodQuantity: Number(quantity),
                pickupLocation,
                expiredDateTime: expireDate,
                additionalNotes,
                donorName: user?.displayName,
                donorEmail: user?.email,
                foodStatus: "available",
                createdAt: new Date(),
            };

            await axios.post("http://localhost:5000/food", foodData);

            Swal.fire("Added!", "Food added successfully ✅", "success");
            navigate("/availablefood");

        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Something went wrong", "error");
        } finally {
            setLoading(false);
            setImageUploading(false);
        }
    };

    // Don't load the page until postCount is fetched
    if (postCount === null) return <AddFoodSkeleton />;

    // Show limit reached if postCount > 9
    if (postCount > 9) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
                <Lottie
                    animationData={limitReachedAnimation}
                    loop={true}
                    className="w-80 h-80"
                />
                <h2 className="text-3xl text-red-500 font-bold text-center mb-2 -mt-12">
                    You have reached the limit of Adding Post!
                </h2>
                <p className="text-center text-gray-500 mb-4 text-2xl">To add more  <button
                    onClick={() => navigate("/membership")}
                    className="btn bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition"
                >
                    Be a Member
                </button></p>

            </div>
        );
    }

    return (
        <div
            className="min-h-screen relative flex items-center justify-center px-4 py-16 mt-16 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://i.ibb.co/bgHJ1Mww/bgofweb.jpg')" }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

            <div className="relative w-full max-w-md bg-white/10 border border-green-500 backdrop-blur-md rounded-2xl p-8 shadow-lg shadow-green-400/50">
                <h2 className="text-3xl font-bold text-center text-green-300 mb-6">
                    Add Food
                </h2>

                {loading ? (
                    <AddFoodSkeleton />
                ) : (
                    <form onSubmit={handleAddFood} className="space-y-4">

                        <input
                            type="text"
                            name="foodName"
                            required
                            placeholder="Food Name"
                            className="input input-bordered w-full border-green-500 bg-white/40 text-black"
                        />

                        <input
                            type="number"
                            name="quantity"
                            required
                            placeholder="Food Quantity"
                            className="input input-bordered w-full border-green-500 bg-white/40 text-black"
                        />

                        <input
                            type="text"
                            name="pickupLocation"
                            required
                            placeholder="Pickup Location"
                            className="input input-bordered w-full border-green-500 bg-white/40 text-black"
                        />

                        <input
                            type="datetime-local"
                            name="expireDate"
                            required
                            className="input input-bordered w-full border-green-500 bg-white/40 text-black"
                        />

                        {imageUploading ? (
                            <div className="h-12 w-full bg-white/30 rounded animate-pulse"></div>
                        ) : (
                            <input
                                type="file"
                                name="foodImage"
                                accept="image/*"
                                required
                                className="file-input file-input-bordered w-full border-green-500 bg-white/40 text-black"
                            />
                        )}

                        <textarea
                            name="additionalNotes"
                            placeholder="Additional Notes (optional)"
                            className="textarea textarea-bordered w-full border-green-500 bg-white/40 text-black"
                        />

                        <button
                            type="submit"
                            disabled={loading || imageUploading}
                            className={`btn w-full bg-green-500 hover:bg-green-600 text-white font-semibold ${loading || imageUploading ? "cursor-not-allowed opacity-60" : ""}`}
                        >
                            {imageUploading ? "Uploading Image..." : loading ? "Submitting..." : "Add Food"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AddFood;
