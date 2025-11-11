import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './Reviews.css';

// Local images import
import conor from '../assets/conor.jpeg';
import kp from '../assets/kp.jpeg';
import mehedi from '../assets/Mehedi.jpg';
import rohit from '../assets/rohit.jpg';
import shakib from '../assets/shakib.jpg';

const reviewsData = [
    {
        name: "Conor Mcgregor",
        profession: "Food Donor",
        avatar: conor,
        quote: "Sharing surplus food feels amazing! I know it's helping someone in need every day.",
    },
    {
        name: "Kevin Pietersen",
        profession: "Food Receiver",
        avatar: kp,
        quote: "Thanks to this platform, I can get fresh meals without wasting money. It’s life-changing!",
    },
    {
        name: "Mehedi Noor",
        profession: "Volunteer",
        avatar: mehedi,
        quote: "Connecting donors and receivers is simple here. Seeing food reach those who need it most is rewarding.",
    },
    {
        name: "Rohit Sharma",
        profession: "Community Organizer",
        avatar: rohit,
        quote: "This platform brings communities together. People care, share, and support each other effortlessly.",
    },
    {
        name: "Shakib Al Hasan",
        profession: "Food Donor",
        avatar: shakib,
        quote: "I love reducing food waste while helping someone enjoy a good meal. It feels fulfilling every time.",
    },
];

export default function Reviews() {
    const [loading, setLoading] = useState(true);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="reviews-container">
            {/* Heading */}
            <div className="text-center mb-12 flex flex-col gap-3">
                {loading ? (
                    <>
                        <div className="h-10 w-64 mx-auto bg-gray-300 rounded animate-pulse"></div>
                        <div className="h-4 w-40 mx-auto bg-gray-300 rounded animate-pulse"></div>
                    </>
                ) : (
                    <>
                        <h2 className="reviews-title text-3xl md:text-4xl font-bold">
                            Customer Reviews
                        </h2>
                        <p className="text-lightgreen font-semibold tracking-wide">
                            What People Are Saying
                        </p>
                    </>
                )}
            </div>

            {/* Swiper */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-64 bg-gray-200 rounded-xl animate-pulse mx-auto"
                        ></div>
                    ))}
                </div>
            ) : (
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    initialSlide={1} // 2nd card active initially
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 30,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination]}
                    className="reviews-swiper"
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 20 },
                        640: { slidesPerView: 1.5, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 30 },
                        1024: { slidesPerView: 3, spaceBetween: 40 },
                    }}
                >
                    {reviewsData.map((review, index) => (
                        <SwiperSlide key={index} className="review-slide">
                            <div className="review-card">
                                <div className="review-avatar-wrapper">
                                    <img
                                        src={review.avatar}
                                        alt={review.name}
                                        className="review-avatar"
                                    />
                                </div>
                                <div className="review-content">
                                    <h3 className="review-name">{review.name}</h3>
                                    <p className="review-profession">{review.profession}</p>
                                    <div className="review-quote">
                                        <p>"{review.quote}"</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}
