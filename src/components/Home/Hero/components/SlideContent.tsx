import { SlideProps } from "../../@types/heroSlider";
import { getSlideTitle, getSlideDescription } from "../utils/heroSlider";

const SlideContent: React.FC<SlideProps> = ({ slide }) => (
    <div className="text-white space-y-6">
        <h1 className="text-3xl sm:text-xl lg:text-3xl font-bold leading-tight">
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

export default SlideContent;