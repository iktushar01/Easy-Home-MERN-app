import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';

const properties = [
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

const Slider = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade, Parallax]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: (index, className) => {
            return `<span class="${className} bg-white opacity-70 hover:opacity-100 transition-opacity duration-300"></span>`;
          }
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        effect={isMobile ? 'slide' : 'fade'}
        fadeEffect={{ crossFade: true }}
        parallax={true}
        loop={true}
        speed={1000}
        grabCursor={true}
        className="h-full w-full"
      >
        {properties.map((property) => (
          <SwiperSlide key={property.id}>
            <div 
              className="relative h-full w-full"
              data-swiper-parallax="-25%"
            >
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
              
              {/* Background image with parallax effect */}
              <div 
                className="h-full w-full bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${property.image})`,
                  backgroundAttachment: isMobile ? 'scroll' : 'fixed'
                }}
                data-swiper-parallax="-15%"
              />
              
              {/* Content with staggered animation */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-4">
                <div 
                  className="max-w-4xl space-y-6"
                  data-swiper-parallax-opacity="0"
                  data-swiper-parallax-y="100"
                >
                  <h2 className="text-4xl md:text-6xl font-bold leading-tight animate-fadeInUp">
                    {property.title}
                  </h2>
                  <p className="text-xl md:text-2xl max-w-2xl mx-auto animate-fadeInUp animate-delay-100">
                    {property.description}
                  </p>
                  <div className="animate-fadeInUp animate-delay-200">
                    <a 
                      href={property.ctaLink}
                      className="inline-block mt-6 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      {property.cta}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom navigation buttons */}
        <div className="swiper-button-next after:text-white hover:after:opacity-100 after:opacity-70 after:text-2xl"></div>
        <div className="swiper-button-prev after:text-white hover:after:opacity-100 after:opacity-70 after:text-2xl"></div>
      </Swiper>

      {/* Add some global styles for animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-delay-100 {
          animation-delay: 0.1s;
        }
        .animate-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default Slider;