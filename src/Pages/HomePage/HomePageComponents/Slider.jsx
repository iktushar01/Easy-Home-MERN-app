import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    image: 'https://i.postimg.cc/XNDtRHvz/pexels-zvolskiy-1879061.jpg',
    title: 'Find Your Dream Home',
    description: 'Explore premium properties across the country with our curated selection of luxury homes and apartments',
    cta: 'Browse Listings',
    ctaLink: '/properties',
    badge: 'New Listings',
    stats: [
      { value: '10K+', label: 'Properties' },
      { value: '98%', label: 'Satisfaction' }
    ]
  },
  {
    id: 2,
    image: 'https://i.postimg.cc/3NWVypt1/pexels-donaldtong94-189333.jpg',
    title: 'Trusted Real Estate Platform',
    description: 'Verified properties from trusted agents with complete transparency in every transaction',
    cta: 'About Us',
    ctaLink: '/about',
    badge: 'Verified',
    stats: [
      { value: '500+', label: 'Agents' },
      { value: '24/7', label: 'Support' }
    ]
  },
  {
    id: 3,
    image: 'https://i.postimg.cc/sx885X8r/pexels-jmeyer1220-668299.jpg',
    title: 'Modern & Luxury Properties',
    description: 'Discover homes with premium amenities and smart home technology for modern living',
    cta: 'Manage Your Dashboard',
    ctaLink: '/dashboard',
    badge: 'Featured',
    stats: [
      { value: '5K+', label: 'Clients' },
      { value: '4.9★', label: 'Rating' }
    ]
  }
];

const SimpleSlider = () => {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden cursor-grab active:cursor-grabbing">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1200}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full select-none">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
              
              {/* Background image with parallax effect */}
              <div className="swiper-parallax h-full w-full">
                <div 
                  className="swiper-parallax-bg h-full w-full"
                  data-swiper-parallax="-30%"
                >
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="h-full w-full object-cover scale-110 pointer-events-none"
                    draggable="false"
                  />
                </div>
              </div>
              
              {/* Content with animation */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 p-4 md:p-8">
                <div className="max-w-5xl space-y-6 transform transition-all duration-1000 ease-out">
                  {/* Badge */}
                  {slide.badge && (
                    <span className="inline-block px-4 py-2 bg-primary/90 text-white text-sm font-semibold rounded-full mb-4 animate-fade-in-up">
                      {slide.badge}
                    </span>
                  )}
                  
                  <h2 
                    className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
                    data-swiper-parallax="-200"
                  >
                    {slide.title}
                  </h2>
                  
                  <p 
                    className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90"
                    data-swiper-parallax="-100"
                  >
                    {slide.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex justify-center gap-8 mt-4">
                    {slide.stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold">{stat.value}</div>
                        <div className="text-sm opacity-80">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <a 
                    href={slide.ctaLink}
                    className="inline-block mt-8 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                    data-swiper-parallax="-50"
                  >
                    {slide.cta}
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        
        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </Swiper>
      
      {/* Custom CSS for Swiper */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255,255,255,0.5);
          opacity: 1;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          background: #fff;
          width: 30px;
          border-radius: 8px;
        }
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default SimpleSlider;