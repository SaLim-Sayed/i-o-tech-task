 import { SlideData } from "../../@types/heroSlider";
import { API_BASE_URL, DEFAULT_BACKGROUND_IMAGE, DEFAULT_PERSON_PLACEHOLDER } from "../constants/heroSlider";

export const formatApiSlides = (data: any[]): SlideData[] => {
    return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.subtitle,
        imageSrc: DEFAULT_BACKGROUND_IMAGE,
        personImage: item.media?.formats?.small?.url
            ? `${API_BASE_URL}${item.media.formats.small.url}`
            : DEFAULT_PERSON_PLACEHOLDER,
        locale: item.locale,
        localizations: item.localizations || [],
    }));
};

export const getSlideImageSrc = (slide: SlideData): string => {
    return slide.imageSrc || DEFAULT_BACKGROUND_IMAGE;
};

export const getSlideTitle = (slide: SlideData): string => {
    return slide.title || "Lorem Ipsum";
};

export const getSlideDescription = (slide: SlideData): string => {
    return slide.description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
};