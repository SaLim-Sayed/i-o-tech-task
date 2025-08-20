"use client";

import { Image } from "@heroui/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
    A11y,
    Autoplay,
    Navigation,
    Pagination,
    Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Slide data array

const SwiperPage = () => {
    const slides = [
        { id: 1, title: "Project Management", imageSrc: "/images/slides/slide1.jpg" },
        { id: 2, title: "Landscape Design", imageSrc: "/images/slides/slide1.jpg" },
    ];

    return (
        <div className="flex w-full cursor-pointer overflow-hidden">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                slidesPerView={1}
                cssMode={true}
                pagination={{
                    clickable: true,
                    el: ".swiper-pagination",
                    bulletClass: "swiper-pagination-bullet",
                    bulletActiveClass: "swiper-pagination-bullet-active",
                }}
                mousewheel={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                loop={true}
            >
                <div className="swiper-pagination swiper-pagination-vertical  right-16  top-1/2 transform -translate-y-1/2"></div>

                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative  overflow-hidden h-[500px] sm:h-screen ">
                            <div className="absolute   inset-0">
                                <div className="absolute inset-0 bg-black/50   z-40 "></div>
                                <Image
                                    src={slide.imageSrc}
                                    alt="Description"
                                    width="100%"
                                    radius="none"
                                    className=" min-h-[500px] w-full h-full"
                                />
                            </div>

                            <div className="flex items-end  gap-4 sm:p-20   justify-center h-full w-full ">
                               
                                <div className="relative z-40 h-full w-full  flex flex-col items-start justify-end bg-gradient-to-b from-white   to-orange-200 bg-clip-text text-white   ">
                                    <h1 className="text-lg md:text-3xl font-bold mb-6  ">
                                        4 Dimensions Engineering Consultant
                                    </h1>
                                    <div className="text-xl md:text-6xl font-[800]  mb-8">
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

export default SwiperPage;
