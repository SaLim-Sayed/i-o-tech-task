export interface SlideData {
    id: number;
    title: string;
    description: string;
    imageSrc: string;
    personImage: string;
    locale?: string;
    localizations?: any[];
}

export interface SlideProps {
    slide: SlideData;
}

export interface SlideBackgroundProps {
    imageSrc: string;
    alt: string;
}