import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

// Stripe publishable key
const stripePromise = loadStripe(
    "pk_test_51RuFCD2N3HoHVSaoW7VxBVoMp4Wc4REQrh0EnYlar3Ej52hF8hs2Xe1f4BbY7Dfq5AhLPvcHpLSUwVzdVKVPi9lA00F7nQdlAE"
);

const CheckoutForm = ({ price, user }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    // Create Payment Intent
    useEffect(() => {
        if (price > 0) {
            axios
                .post("https://ass11github.vercel.app/create-payment-intent", { price })
                .then((res) => setClientSecret(res.data.clientSecret))
                .catch((err) => {
                    console.error("Error fetching client secret:", err);
                    toast.error("Failed to initialize payment.");
                });
        }
    }, [price]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        // Validate email
        const email = user?.email;
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            toast.error("Invalid email for payment. Please check your account.");
            return;
        }

        setLoading(true);

        try {
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.name || "Anonymous",
                        email: email,
                    },
                },
            });

            if (error) {
                toast.error(error.message);
                setLoading(false);
                return;
            }

            if (paymentIntent.status === "succeeded") {
                toast.success("Payment Successful 🎉");

                // Save payment info to backend
                const paymentData = {
                    email: user.email,
                    amount: price,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    status: "succeeded",
                };

                await axios.post("https://ass11github.vercel.app/payments", paymentData);

                // Update membership
                await axios.patch(`https://ass11github.vercel.app/users/membership/${user.email}`);

                navigate("/dashboard/membership/success");
            }
        } catch (err) {
            console.error("Payment error:", err);
            toast.error("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl"
        >
            <CardElement className="border p-4 rounded mb-4" />
            <button
                type="submit"
                disabled={!stripe || !clientSecret || loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            >
                {loading ? "Processing..." : `Pay $${price}`}
            </button>
        </form>
    );
};

const Membership = ({ user }) => {
    const price = 10; // Example membership fee
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm price={price} user={user} />
        </Elements>
    );
};

export default Membership;
