import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const properties = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Find Your Dream Home',
    description: 'Explore premium properties across the country'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Trusted Real Estate Platform',
    description: 'Verified properties from trusted agents'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Modern & Luxury Properties',
    description: 'Discover homes with premium amenities'
  }
];

const Slider = () => {
  return (
    <div className="relative h-[70vh] w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        loop={true}
        className="h-full w-full"
      >
        {properties.map((property) => (
          <SwiperSlide key={property.id}>
            <div className="relative h-full w-full">
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/60 z-10"></div>
              
              <img 
                src={property.image} 
                alt={property.title}
                className="h-full w-full object-cover"
              />
              
              {/* Centered text content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl">
                  {property.title}
                </h2>
                <p className="text-xl md:text-2xl max-w-2xl">
                  {property.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;