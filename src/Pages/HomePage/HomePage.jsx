import React from 'react';
import Slider from './HomePageComponents/Slider';
import AdvertisementSection from './HomePageComponents/AdvertisementSection';
import LatestReview from './HomePageComponents/LatestReview';

const HomePage = () => {
    return (
        <div>
            <Slider></Slider>
            <AdvertisementSection/>
            <LatestReview/>
        </div>
    );
};

export default HomePage;