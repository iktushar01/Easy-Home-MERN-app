import React from 'react';
import Slider from './HomePageComponents/Slider';
import AdvertisementSection from './HomePageComponents/AdvertisementSection';
import LatestReview from './HomePageComponents/LatestReview';
import WhyChooseUs from './HomePageComponents/WhyChooseUs';
import FAQ from './HomePageComponents/FAQ';

const HomePage = () => {
    return (
        <div>
            <Slider></Slider>
            <AdvertisementSection/>
            <LatestReview/>
            <WhyChooseUs/>
            <FAQ/>
        </div>
    );
};

export default HomePage;