import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const AddFood = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imageUploading, setImageUploading] = useState(false);
    const imageHostKey = import.meta.env.VITE_IMGBB_KEY;

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

            // Resize image for faster upload
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
                return;
            }

            // SweetAlert2 success after image upload
            await Swal.fire("Success!", "Image uploaded successfully 🎉", "success");

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

            // Example: if your backend is on port 5000
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

    return (
        <div
            className="min-h-screen relative flex items-center justify-center px-4 py-16 mt-16 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: "url('https://i.ibb.co/bgHJ1Mww/bgofweb.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

            <div className="relative w-full max-w-md bg-white/10 border border-green-500 backdrop-blur-md rounded-2xl p-8 shadow-lg shadow-green-400/50">
                <h2 className="text-3xl font-bold text-center text-green-300 mb-6">
                    Add Food
                </h2>

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

                    <input
                        type="file"
                        name="foodImage"
                        accept="image/*"
                        required
                        className="file-input file-input-bordered w-full border-green-500 bg-white/40 text-black"
                        disabled={imageUploading}
                    />

                    <textarea
                        name="additionalNotes"
                        placeholder="Additional Notes (optional)"
                        className="textarea textarea-bordered w-full border-green-500 bg-white/40 text-black"
                    ></textarea>

                    <button
                        type="submit"
                        disabled={loading || imageUploading}
                        className={`btn w-full bg-green-500 hover:bg-green-600 text-white font-semibold ${loading || imageUploading ? "cursor-not-allowed opacity-60" : ""
                            }`}
                    >
                        {loading || imageUploading ? "Uploading..." : "Add Food"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddFood;
