import { Image } from "@heroui/react";
import { SlideProps } from "../../@types/heroSlider";
 
const PersonImage: React.FC<SlideProps> = ({ slide }) => (
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

export default PersonImage;