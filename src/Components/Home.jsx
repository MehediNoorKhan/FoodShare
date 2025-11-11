import React from 'react';
import Banner from './Banner';
import FeaturedFoods from './FeaturedFoods';
import AnimatedCounter from './AnimatedCounter';
import FAQSection from './FAQSection';
import FeaturesSection from './FeaturesSection';
import Reviews from './Reviews';
import ContactForm from './ConactForm';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturesSection></FeaturesSection>
            <FeaturedFoods></FeaturedFoods>
            {/* <AnimatedCounter></AnimatedCounter> */}
            <Reviews></Reviews>
            <FAQSection></FAQSection>
            <ContactForm></ContactForm>

        </div>
    );
};

export default Home;