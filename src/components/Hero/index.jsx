import Image from "next/image";

import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
register();

const Hero = ({ slides }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiperContainer = swiperRef.current;
    const params = {
      navigation: true,
      pagination: true,
      // These are new...
      injectStyles: [
        `

        .swiper-button-next,
        .swiper-button-prev {
          background-color: #4CAF50; 
          background-position: center;
          background-size: 10px;
          background-repeat: no-repeat;
          padding: 8px 16px;
          border-radius: 100%;
          color: #fff;
        }
        
        .swiper-button-prev {
          background-image: url("/box-arrow-in-left.svg");
        }
        
        .swiper-button-next {
          background-image: url("/box-arrow-in-right.svg");
        }
        
        .swiper-button-next::after,
        .swiper-button-prev::after {
          content: "";
        }
        
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background-color: black; /* Green */
        }
        
      `,
      ],
    };

    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);

  return (
    <swiper-container ref={swiperRef} init="false" class="sliderContainer">
      {slides.map((slide, index) => (
        <swiper-slide class="blue-slide" key={index}>
          <Image
            src={slide}
            alt={`Slide ${index + 1}`}
            fill
            className="slideImage"
            priority
            unoptimized={true}
          />
        </swiper-slide>
      ))}
    </swiper-container>
  );
};

export default Hero;
