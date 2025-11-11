import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AOS from "aos";
import foodsharing from "../../assets/foodsharing.jpg";
import "./ContactForm.css";

export default function ContactForm() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 800, once: true });

        const img = new Image();
        img.src = foodsharing;
        img.onload = () => setLoading(false);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: "success",
            title: "Your message has been sent successfully.",
            showConfirmButton: false,
            timer: 2000,
        });
        e.target.reset();
    };

    return (
        <section className="py-16" id="contact">
            <div className="max-w-7xl mx-auto px-4">
                <h2
                    data-aos="fade-up"
                    className="text-3xl md:text-4xl font-bold text-deepgreen text-center mb-12"
                >
                    Contact Us
                </h2>

                <div className="contact-container flex flex-col md:flex-row md:gap-10">

                    {/* Left Image or Skeleton */}
                    <div data-aos="fade-right" className="contact-image flex-1">
                        {loading ? (
                            <div className="w-full h-64 md:h-full bg-gray-300 animate-pulse rounded"></div>
                        ) : (
                            <img
                                src={foodsharing}
                                alt="Food Sharing"
                                className="w-full h-full object-cover rounded"
                            />
                        )}
                    </div>

                    {/* Right Form */}
                    <div
                        data-aos="fade-left"
                        className="contact-form-wrapper bg-green-50 flex flex-col justify-center items-center p-6 md:p-8 md:gap-4 rounded shadow-sm"
                    >
                        {/* Social Icons */}
                        <div className="social-icons flex justify-around items-center gap-4 mb-6">
                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/cristiano/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <button className="button btn-instagram" style={{ backgroundColor: "#E1306C" }}>
                                    <svg fill="white" viewBox="0 0 24 24" height="24" width="24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.768.127 4.548.397 3.515 1.43c-1.033 1.033-1.303 2.253-1.36 3.537C2.012 6.332 2 6.741 2 10s.012 3.668.07 4.948c.057 1.284.327 2.504 1.36 3.537 1.033 1.033 2.253 1.303 3.537 1.36C8.332 21.988 8.741 22 12 22s3.668-.012 4.948-.07c1.284-.057 2.504-.327 3.537-1.36 1.033-1.033 1.303-2.253 1.36-3.537.058-1.28.07-1.689.07-4.948s-.012-3.668-.07-4.948c-.057-1.284-.327-2.504-1.36-3.537-1.033-1.033-2.253-1.303-3.537-1.36C15.668.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.879 1.44 1.44 0 0 0 0-2.879z" />
                                    </svg>
                                </button>
                            </a>

                            {/* Facebook */}
                            <a href="https://www.facebook.com/Cristiano" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <button className="button btn-facebook" style={{ backgroundColor: "#1877F2" }}>
                                    <svg fill="white" viewBox="0 0 24 24" height="24" width="24">
                                        <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.657-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.326-.597 1.326-1.326V1.326C24 .597 23.403 0 22.675 0z" />
                                    </svg>
                                </button>
                            </a>

                            {/* YouTube */}
                            <a href="https://www.youtube.com/@Cristiano" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <button className="button btn-youtube" style={{ backgroundColor: "#FF0000" }}>
                                    <svg fill="white" viewBox="0 0 24 24" height="24" width="24">
                                        <path d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z" />
                                    </svg>
                                </button>
                            </a>

                            {/* Twitter / X */}
                            <a href="https://twitter.com/Cristiano" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
                                <button className="button btn-x" style={{ backgroundColor: "#1DA1F2" }}>
                                    <svg fill="white" viewBox="0 0 24 24" height="24" width="24">
                                        <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775a4.932 4.932 0 0 0 2.163-2.723 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.384 4.482A13.944 13.944 0 0 1 1.671 3.149a4.822 4.822 0 0 0-.666 2.475c0 1.708.869 3.214 2.188 4.099a4.904 4.904 0 0 1-2.228-.616c-.054 1.996 1.397 3.873 3.446 4.287a4.936 4.936 0 0 1-2.224.084 4.928 4.928 0 0 0 4.604 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.01-7.496 14.01-13.986 0-.21-.005-.423-.014-.633a9.936 9.936 0 0 0 2.411-2.534l-.047-.02z" />
                                    </svg>
                                </button>
                            </a>
                        </div>


                        {/* Form */}
                        <form className="contact-form flex flex-col gap-3" onSubmit={handleSubmit}>
                            <h2 className="text-xl md:text-2xl font-bold mb-4">Send Us Message</h2>

                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" placeholder="Your Name" required />

                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" placeholder="Your Email" required />

                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" name="subject" placeholder="Subject" required />

                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" placeholder="Write your message..." rows="4" required />

                            <button type="submit" className="contact-submit w-full">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
