import { Image } from "@heroui/react";
import { ProcessedReview } from "../../@types/review";
 
interface ReviewCardProps {
  review: ProcessedReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-transparent">
      {/* Client Photo */}
      <div className="flex justify-center lg:justify-start">
        <div className="w-64 h-64 rounded-lg overflow-hidden bg-primaryColor-900 shadow-lg">
          <Image
            src={review.imageSrc}
            alt={review.name}
            width="100%"
            height="100%"
            radius="lg"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Testimonial Content */}
      <div className="text-center lg:text-left space-y-4">
        <p className="text-xl italic leading-relaxed">
          &ldquo;{review.message}&rdquo;
        </p>
        <h3 className="text-2xl font-semibold mt-6">{review.name}</h3>
        <p className="text-lg opacity-80">{review.role}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
