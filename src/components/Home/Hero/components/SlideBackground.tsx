import { Image } from "@heroui/react";
import { SlideBackgroundProps } from "../../@types/heroSlider";

const SlideBackground: React.FC<SlideBackgroundProps> = ({ imageSrc, alt }) => (
    <div className="absolute inset-0">
        <Image
            src={imageSrc}
            alt={alt}
            width="100%"
            height="10000"
            radius="none"
            className="w-full h-[800px] object-fill"
        />
        <div className="absolute inset-0 bg-orange-950/60 z-10" />
    </div>
);

export default SlideBackground;