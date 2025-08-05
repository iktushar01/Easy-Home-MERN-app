import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  {
    id: 1,
    image: 'https://i.postimg.cc/zDRQMh9K/pexels-sebastians-731082.jpg',
    title: 'Find Your Dream Home',
    description: 'Explore premium properties across the country',
    cta: 'Browse Listings',
    ctaLink: '/properties'
  },
  {
    id: 2,
    image: 'https://i.postimg.cc/BQ9zG60y/pexels-homelane-com-492179-1776574.jpg',
    title: 'Trusted Real Estate Platform',
    description: 'Verified properties from trusted agents',
    cta: 'About Us',
    ctaLink: '/about'
  },
  {
    id: 3,
    image: 'https://i.postimg.cc/CLGQMgMK/pexels-heyho-7174388.jpg',
    title: 'Modern & Luxury Properties',
    description: 'Discover homes with premium amenities',
    cta: 'Manage Your Dashboard',
    ctaLink: '/dashboard'
  }
];

const SimpleSlider = () => {
  return (
    <div className="relative h-[70vh] w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              
              {/* Background image */}
              <img 
                src={slide.image} 
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 p-4">
                <div className="max-w-4xl space-y-6">
                  <h2 className="text-4xl md:text-6xl font-bold">
                    {slide.title}
                  </h2>
                  <p className="text-xl md:text-2xl max-w-2xl mx-auto">
                    {slide.description}
                  </p>
                  <a 
                    href={slide.ctaLink}
                    className="inline-block mt-6 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-opacity-90"
                  >
                    {slide.cta}
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimpleSlider;