import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
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
    { name: "Conor Mcgregor", profession: "Food Donor", avatar: conor, quote: "Sharing surplus food feels amazing! I know it's helping someone in need every day." },
    { name: "Kevin Pietersen", profession: "Food Receiver", avatar: kp, quote: "Thanks to this platform, I can get fresh meals without wasting money. It’s life-changing!" },
    { name: "Mehedi Noor", profession: "Volunteer", avatar: mehedi, quote: "Connecting donors and receivers is simple here. Seeing food reach those who need it most is rewarding." },
    { name: "Rohit Sharma", profession: "Community Organizer", avatar: rohit, quote: "This platform brings communities together. People care, share, and support each other effortlessly." },
    { name: "Shakib Al Hasan", profession: "Food Donor", avatar: shakib, quote: "I love reducing food waste while helping someone enjoy a good meal. It feels fulfilling every time." },
];

export default function Reviews() {
    const [loading, setLoading] = useState(true);
    const [showAnimation, setShowAnimation] = useState(false);

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    // Scroll animation trigger
    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('reviews-container');
            if (!element) return;
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                setShowAnimation(true);
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            id="reviews-container"
            className="reviews-container px-4 sm:px-6 py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={showAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
        >
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
                    initialSlide={1}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 30,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Pagination]}
                    className="reviews-swiper"
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 20 },
                        640: { slidesPerView: 1.3, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 25 },
                        1024: { slidesPerView: 3, spaceBetween: 30 },
                    }}
                >
                    {reviewsData.map((review, index) => (
                        <SwiperSlide key={index} className="review-slide">
                            <motion.div
                                className="review-card bg-white rounded-xl p-6 shadow-md cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)' }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <div className="review-avatar-wrapper flex justify-center mb-4">
                                    <img
                                        src={review.avatar}
                                        alt={review.name}
                                        className="review-avatar w-20 h-20 rounded-full object-cover"
                                    />
                                </div>
                                <div className="review-content text-center">
                                    <h3 className="review-name text-lg font-bold">{review.name}</h3>
                                    <p className="review-profession text-sm text-gray-500 mb-3">{review.profession}</p>
                                    <div className="review-quote text-gray-700 italic text-sm">
                                        <p>"{review.quote}"</p>
                                    </div>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </motion.div>
    );
}
