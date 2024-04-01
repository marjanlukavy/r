import Image from "next/image";
import React from "react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Hero = ({ slides }) => {
  return (
    <div className="sliderContainer">
      <Swiper
        navigation={false}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Image
              src={slide}
              alt={`Slide ${index + 1}`}
              fill
              className="slideImage"
              priority
              unoptimized={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
