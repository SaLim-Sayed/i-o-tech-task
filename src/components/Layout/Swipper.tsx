"use client";

import { HeroContent, HeroResponse } from "@/src/@types/hero";
import { useApiQuery } from "@/src/hooks/useApiQuery";
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

// Types
interface SlideData {
    id: number;
    title: string;
    description: string;
    imageSrc: string;
    personImage: string;
    locale?: string;
    localizations?: any[];
}

// Constants
const FALLBACK_SLIDES: SlideData[] = [
    {
        id: 1,
        title: "Lorem Ipsum",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        imageSrc: "/images/slides/slide1.jpg",
        personImage: "/images/person1.jpg",
    },
    {
        id: 2,
        title: "Project Management",
        description: "Professional project management services with cutting-edge technology and experienced team members.",
        imageSrc: "/images/slides/slide1.jpg",
        personImage: "/images/person2.jpg",
    },
    {
        id: 3,
        title: "Landscape Design",
        description: "Creating beautiful and functional outdoor spaces blending seamlessly with the environment.",
        imageSrc: "/images/slides/slide1.jpg",
        personImage: "/images/person3.jpg",
    },
];

const SWIPER_CONFIG = {
    modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
    slidesPerView: 1,
    pagination: {
        clickable: true,
        el: ".custom-pagination",
        bulletClass: "custom-bullet",
        bulletActiveClass: "custom-bullet-active",
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    loop: true,
    speed: 1000,
};

// Utility functions
const formatApiSlides = (data: any[]): SlideData[] => {
    return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.subtitle,
        imageSrc: "/images/slides/slide1.jpg",
        personImage: item.media?.formats?.small?.url
            ? `http://localhost:1337${item.media.formats.small.url}`
            : "/images/person-placeholder.jpg",
        locale: item.locale,
        localizations: item.localizations || [],
    }));
};

const getSlideImageSrc = (slide: SlideData): string => {
    return slide.imageSrc || "/images/slides/slide1.jpg";
};

const getSlideTitle = (slide: SlideData): string => {
    return slide.title || "Lorem Ipsum";
};

const getSlideDescription = (slide: SlideData): string => {
    return slide.description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
};

// Components
const SlideBackground = ({ imageSrc, alt }: { imageSrc: string; alt: string }) => (
    <div className="absolute inset-0">
        <Image
            src={imageSrc}
            alt={alt}
            width="100%"
            height="100%"
            radius="none"
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
    </div>
);

const SlideContent = ({ slide }: { slide: SlideData }) => (
    <div className="text-white space-y-6">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
            {getSlideTitle(slide)}
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed max-w-2xl">
            {getSlideDescription(slide)}
        </p>
        <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
            Read More
        </button>
    </div>
);

const PersonImage = ({ slide }: { slide: SlideData }) => (
    <div className="hidden lg:flex justify-end">
        <div className="relative">
            <div className="w-80 bg-primaryColor-900 rounded-lg overflow-hidden">
                <Image
                    src={slide.personImage}
                    alt="Person"
                    width="100%"
                    height="100%"
                    radius="lg"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    </div>
);

const CustomPagination = () => (
    <div className="custom-pagination absolute ltr:left-10 rtl:right-10 sm:left-8 lg:left-16 top-1/2 transform -translate-y-1/2 z-30 flex flex-col space-y-3" />
);

const CustomStyles = () => (
    <style jsx global>{`
        .custom-pagination {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .custom-bullet {
            margin-bottom: 5px;
            width: 12px;
            height: 12px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }

        .custom-bullet:hover {
            background: rgba(255, 255, 255, 0.8);
            transform: scale(1.1);
        }

        .custom-bullet-active {
            background: white;
            border-color: rgba(255, 255, 255, 0.3);
            transform: scale(1.2);
        }

        @media (max-width: 768px) {
            .custom-pagination {
                left: 16px;
                gap: 8px;
            }
            
            .custom-bullet {
                width: 10px;
                height: 10px;
            }
        }
    `}</style>
);

// Main Component
const SwiperPage = () => {
    const { data, isLoading, error } = useApiQuery<HeroResponse<HeroContent>>({
        key: ["slides"],
        endpoint: "hero-contents?populate=*"
    });

    // Process slides data
    const apiSlides = data?.data ? formatApiSlides(data.data) : [];
    const slides = apiSlides.length > 0 ? apiSlides : FALLBACK_SLIDES;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        console.error('Error loading slides:', error);
        // Still show fallback slides on error
    }

    return (
        <div className="flex w-full cursor-pointer overflow-hidden relative">
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

            <CustomPagination />
            <CustomStyles />
        </div>
    );
};

export default SwiperPage;