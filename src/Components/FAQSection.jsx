import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { FaChevronDown } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import faqAnimation from '../../assets/FAQ.json';

const faqs = [
  {
    question: "How can I share my excess food?",
    answer:
      "List your available food items on our platform. Specify quantity, location, and expiry, and interested users can request them.",
  },
  {
    question: "How do I request food?",
    answer:
      "Browse available food items, select what you need, and submit a request. The donor will be notified to coordinate pickup.",
  },
  {
    question: "Is there any cost involved?",
    answer:
      "No, our platform is free for both donors and recipients to reduce food waste and help those in need.",
  },
  {
    question: "Can I donate perishable food?",
    answer:
      "Yes, ensure it is safe to consume, properly packaged, and will be picked up before expiration.",
  },
  {
    question: "How do I ensure food safety?",
    answer:
      "Always package food properly, label it clearly, and only donate fresh, safe-to-eat items.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-24 bg-green-50 px-6 md:px-16 overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 flex justify-center items-center opacity-20 pointer-events-none">
        <Lottie animationData={faqAnimation} loop={true} className="w-full max-w-2xl" />
      </div>

      {/* Content overlay */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left text content */}
        {loading ? (
          <div className="space-y-4 z-10">
            <div className="h-10 w-64 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-4 w-96 bg-gray-300 rounded animate-pulse"></div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-6 w-full max-w-md bg-gray-300 rounded animate-pulse"></div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-left z-10"
          >
            <h2 className="text-4xl font-bold text-deepgreen mb-4">
              Frequently Asked Questions
            </h2>

            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Our food sharing platform helps reduce waste and connect people who want to
              share food with those who need it. Here are some helpful points to get
              started:
            </p>

            <motion.ul
              className="space-y-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delayChildren: 0.3,
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              {[
                "Ensure food items are safe and properly packaged.",
                "Communicate clearly with donors or recipients for smooth pickup.",
                "Check expiration dates before sharing or accepting food.",
                "You may also offer small donations to support platform operations.",
                "Volunteering helps support the food-sharing community.",
              ].map((text, index) => (
                <motion.li
                  key={index}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  className="flex items-start gap-3"
                >
                  <div className="w-7 h-7 flex items-center justify-center bg-lightgreen text-white rounded-full shadow-md">
                    <FaCheck size={14} />
                  </div>
                  <span className="text-gray-700 text-base leading-relaxed">
                    {text}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}

        {/* Right accordion */}
        {loading ? (
          <div className="space-y-4 z-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gray-300 rounded-lg animate-pulse w-full"
              ></div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="z-10"
          >
            <div className="bg-transparent rounded-xl divide-y">
              {faqs.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 transition-shadow transition-transform duration-300 rounded-lg mb-3
                    border border-[#22c55e] bg-white/[0.02] backdrop-blur-sm
                    hover:shadow-lg hover:-translate-y-0.5
                    ${openIndex === index ? "ring-2 ring-green-100 bg-white/10" : ""}`}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex justify-between items-center w-full font-semibold text-left text-deepgreen text-lg"
                  >
                    {item.question}
                    <FaChevronDown
                      className={`ml-2 transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-gray-700 mt-3 text-sm leading-relaxed"
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
