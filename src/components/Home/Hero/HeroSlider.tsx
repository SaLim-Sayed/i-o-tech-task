"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";

import { SWIPER_CONFIG } from "./constants/heroSlider";
import { getSlideImageSrc } from "./utils/heroSlider";
 
import SlideBackground from "./components/SlideBackground";
import SlideContent from "./components/SlideContent";
import PersonImage from "./components/PersonImage";
import CustomPagination from "./components/CustomPagination";
import CustomStyles from "./components/CustomStyles";
import LoadingState from "./components/LoadingState";
import { useHeroSlider } from "./hooks/ useHeroSlider";

const HeroSlider: React.FC = () => {
    const { slides, isLoading, error, hasApiData } = useHeroSlider();

    if (isLoading) {
        return <LoadingState />;
    }

    if (error) {
        console.error('Error loading slides:', error);
    }

    return (
        <div className="flex w-full cursor-pointer overflow-hidden relative">
                        <div className="swiper-pagination swiper-pagination-vertical  rtl:right-16 ltr:left-16  top-1/2 transform -translate-y-1/2"></div>

            <Swiper
                {...SWIPER_CONFIG}
                className="h-[500px] sm:h-screen w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide.id || index}>
                        <div className="relative overflow-hidden h-full">
                            <SlideBackground 
                                imageSrc={getSlideImageSrc(slide)} 
                                alt="Background" 
                            />
                            
                            <div className="relative z-20 h-full flex items-center">
                                <div className="container mx-auto px-4 sm:px-8 lg:px-16">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                                        <SlideContent slide={slide} />
                                        <PersonImage slide={slide} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

          

        </div>
    );
};

export default HeroSlider;