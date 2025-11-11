import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import AOS from "aos";

const slides = [
    {
        id: 1,
        image:
            "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1600&q=80",
        heading: "Share Food, Spread Love",
        subheading: "Donate your extra food to someone who needs it more.",
        buttonText: "Find Foods",
        buttonLink: "/availablefood",
    },
    {
        id: 2,
        image:
            "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80",
        heading: "Be the Reason Someone Eats Today",
        subheading: "Your donation can save someone from hunger.",
        buttonText: "Start Donating",
        buttonLink: "/addfood",
    },
    {
        id: 3,
        image:
            "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&w=1600&q=80",
        heading: "Join the Movement",
        subheading: "Let’s reduce food waste and help each other.",
        buttonText: "How It Works",
        buttonLink: "/about",
    },
];

const Banner = () => {
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const img = new Image();
        img.src = slides[current].image;
        img.onload = () => setLoading(false);
    }, [current]);

    const { image, heading, subheading, buttonText, buttonLink } = slides[current];

    return (
        <div className="relative w-full h-[75vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">

            {loading ? (
                <div className="w-full h-full bg-gray-300 animate-pulse relative">
                    <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-4">
                        <div className="h-7 w-40 sm:w-64 bg-gray-400 rounded mb-4 animate-pulse"></div>
                        <div className="h-5 w-60 sm:w-96 bg-gray-400 rounded mb-4 animate-pulse"></div>
                        <div className="h-10 w-32 sm:w-40 bg-gray-500 rounded-full animate-pulse"></div>
                    </div>
                </div>
            ) : (
                <>
                    <img src={image} alt="Slide" className="w-full h-full object-cover" />

                    <div
                        data-aos="fade-up"
                        className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
                            {heading}
                        </h1>

                        <p className="text-sm sm:text-base md:text-xl mb-6 max-w-xl md:max-w-2xl">
                            {subheading}
                        </p>

                        <Link
                            to={buttonLink}
                            className="bg-[#22c55e] hover:bg-[#24725e] px-5 sm:px-6 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold shadow-lg transition"
                        >
                            {buttonText}
                        </Link>
                    </div>
                </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-3 bg-[#22c55e]" : "w-3 h-3 bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;
