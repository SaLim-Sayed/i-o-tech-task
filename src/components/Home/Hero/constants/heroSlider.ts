import {
    A11y,
    Autoplay,
    Navigation,
    Pagination,
    Scrollbar,
} from "swiper/modules";
import { SlideData } from "../../@types/heroSlider";
 
export const FALLBACK_SLIDES: SlideData[] = [
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

export const SWIPER_CONFIG = {
    modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
    slidesPerView: 1 as const,
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

export const API_BASE_URL = "http://localhost:1337";
export const DEFAULT_BACKGROUND_IMAGE = "/images/slides/slide1.jpg";
export const DEFAULT_PERSON_PLACEHOLDER = "/images/person-placeholder.jpg";