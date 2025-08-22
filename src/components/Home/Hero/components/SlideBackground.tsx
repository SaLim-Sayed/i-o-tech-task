import { Image } from "@heroui/react";
import { SlideBackgroundProps } from "../../@types/heroSlider";

const SlideBackground: React.FC<SlideBackgroundProps> = ({ imageSrc, alt }) => (
    <div className="absolute inset-0">
        <Image
            src={imageSrc}
            alt={alt}
            width="100%"
            height="100%"
            radius="none"
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-orange-950/60 z-10" />
    </div>
);

export default SlideBackground;