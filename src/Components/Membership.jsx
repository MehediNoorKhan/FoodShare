import React, { useContext, useEffect, useState } from "react";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import AuthContext from "../Provider/AuthContext";
import membershipBanner from "../assets/membership.png";
import alreadyMember from "../../assets/already_member.png";
import successAnimation from "../../assets/success.json";
import MembershipSkeleton from "../Skeletons/MembershipSkeleton";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

const stripePromise = loadStripe(
    "pk_test_51RuFCD2N3HoHVSaoW7VxBVoMp4Wc4REQrh0EnYlar3Ej52hF8hs2Xe1f4BbY7Dfq5AhLPvcHpLSUwVzdVKVPi9lA00F7nQdlAE"
);

// ----- Checkout Form Component -----
const CheckoutForm = ({ price, user, onMembershipUpdate }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);
    const [initLoading, setInitLoading] = useState(true);

    useEffect(() => {
        if (!price || !user?.email) return;

        setInitLoading(true);
        axios
            .post("http://localhost:5000/create-payment-intent", { price })
            .then((res) => setClientSecret(res.data.clientSecret))
            .catch(() => toast.error("Failed to initialize payment."))
            .finally(() => setInitLoading(false));
    }, [price, user?.email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        setLoading(true);
        try {
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card,
                    billing_details: {
                        name: user?.name || "Anonymous",
                        email: user.email,
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

                await axios.patch(`http://localhost:5000/users/membership/${user.email}`, {
                    membership: "yes",
                });

                toast.success("Your membership is now active!");
                onMembershipUpdate("yes");
            }
        } catch {
            toast.error("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (initLoading) return <MembershipSkeleton />;

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto p-6 rounded-2xl shadow-lg bg-green-100/90 border-2 border-[#22c55e]"
        >
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#065f46",
                            "::placeholder": { color: "#10b981" },
                        },
                        invalid: { color: "#f87171" },
                    },
                }}
                className="border-2 border-green-200 p-4 rounded mb-4"
            />
            <button
                type="submit"
                disabled={!stripe || !clientSecret || loading}
                className="w-full bg-[#22c55e] text-white py-2 cursor-pointer rounded-md font-semibold hover:bg-[#24725e] transition"
            >
                {loading ? "Processing..." : `Pay $${price}`}
            </button>
        </motion.form>
    );
};

// ----- Membership Component -----
const Membership = () => {
    const { user, userData, updateMembership } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState(null);
    const [membershipStatus, setMembershipStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const price = 10;

    useEffect(() => {
        if (!user?.email || !userData) return;

        setCurrentUser(userData);
        setMembershipStatus(userData.membership || "no");
        setLoading(false);
    }, [user, userData]);

    // Background wrapper
    const BackgroundWrapper = ({ children }) => (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${membershipBanner})`, filter: "blur(8px)" }}
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <motion.div
                className="relative z-10 w-full max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {children}
            </motion.div>
        </div>
    );

    // Loading skeleton
    if (loading || !currentUser)
        return (
            <BackgroundWrapper>
                <MembershipSkeleton />
            </BackgroundWrapper>
        );

    // Already a member
    if (membershipStatus === "yes")
        return (
            <BackgroundWrapper>
                <motion.div
                    className="flex flex-col items-center justify-center relative lg:pt-0"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <img
                        src={alreadyMember}
                        alt="Already a member"
                        className="max-w-full w-[250px] sm:w-[300px] md:w-[400px] rounded-lg mb-8 pt-32 lg:pt-8"
                    />
                    <div className="absolute top-20 lg:-top-4  transform -translate-y-1/2">
                        <Lottie loop animationData={successAnimation} style={{ width: 180, height: 180 }} />
                    </div>
                </motion.div>
            </BackgroundWrapper>
        );

    // Payment form for new member
    return (
        <BackgroundWrapper>
            <motion.div
                className="w-full max-w-xl bg-green-100/90 shadow-lg rounded-2xl p-6 sm:p-8"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold text-[#22c55e] mb-4 text-center">
                    Pay $10 to Become a Member
                </h2>
                <p className="text-gray-700 mb-6 text-center text-sm sm:text-base">
                    After payment, your membership will be activated.
                </p>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        price={price}
                        user={currentUser}
                        onMembershipUpdate={(status) => {
                            setMembershipStatus(status);
                            updateMembership(currentUser.email, status);
                        }}
                    />
                </Elements>
            </motion.div>
        </BackgroundWrapper>
    );
};

export default Membership;
