import { HeroContent, HeroResponse } from "@/src/@types/hero";
import { useApiQuery } from "@/src/hooks/useApiQuery";
 import { formatApiSlides } from "../utils/heroSlider";
import { FALLBACK_SLIDES } from "../constants/heroSlider";
import { SlideData } from "../../@types/heroSlider";

export const useHeroSlider = () => {
    const { data, isLoading, error } = useApiQuery<HeroResponse<HeroContent>>({
        key: ["slides"],
        endpoint: "hero-contents?populate=*"
    });

    // Process slides data
    const apiSlides = data?.data ? formatApiSlides(data.data) : [];
    const slides: SlideData[] = apiSlides.length > 0 ? apiSlides : FALLBACK_SLIDES;

    return {
        slides,
        isLoading,
        error,
        hasApiData: apiSlides.length > 0
    };
};