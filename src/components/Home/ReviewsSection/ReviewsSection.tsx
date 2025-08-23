"use client";

import { useApiQuery } from "@/src/hooks/useApiQuery"; // Assuming this hook is available
import { Image } from "@heroui/react"; // Assuming @heroui/react provides an Image component
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import "swiper/css";
import "swiper/css/navigation"; // Import for navigation styles
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProcessedReview, ReviewContent, ReviewsResponse } from "../@types/review"; // Adjust path as necessary

interface ReviewsSectionProps {
  locale?: "en" | "ar"; // Prop to control language
}

// Utility function to get the absolute URL for the review photo
const getReviewPhotoUrl = (
  photo: ReviewContent["photo"] | undefined
): string => {
   if (photo?.formats?.small?.url) {
    return `${photo.formats.small.url}`;
  }
  if (photo?.url) {
    return `${photo.url}`;
  }
  return "/images/person-placeholder.jpg"; 
};

const formatApiReviews = (
  data: ReviewContent[],
  locale: "en" | "ar"
): ProcessedReview[] => {
  return data.map((item: ReviewContent) => ({
    id: item.id,
    name: locale === "ar" ? item.name_ar : item.name_en,
    role: item.role, // Assuming role is not localized, or you'd need role_en/role_ar
    message: (locale === "ar" ? item.message_ar : item.message_en) || "No testimonial message provided.",
    imageSrc: getReviewPhotoUrl(item.photo),
  }));
};

// Swiper configuration for the reviews section
const REVIEWS_SWIPER_CONFIG = {
  modules: [Navigation, A11y],
  slidesPerView: 1, // Only one review displayed at a time
  spaceBetween: 30,
  navigation: {
    nextEl: ".reviews-swiper-button-next", // Custom next button class
    prevEl: ".reviews-swiper-button-prev", // Custom prev button class
  },
  loop: true, // Loop through slides
  speed: 800, // Transition speed
};

const ReviewsSection = ({ locale = "en" }: ReviewsSectionProps) => {
  const { data, isLoading, error } = useApiQuery<ReviewsResponse>({
    key: ["reviews"],
    endpoint: "reviews", // Ensure 'photo' relationship is populated
  });

  // Process the fetched data or use an empty array if not available
  const reviews = data?.data ? formatApiReviews(data.data, locale) : [];

  const sectionTitle = "What our clients are saying";
  const sectionDescription =
    "Our clients range from individual investors, to local, international as well as fortune 500 companies.Our clients range from individual investors, to local, international as well as fortune 500 companies.";

  if (isLoading) {
    return (
      <section className="bg-gradient-to-br from-[#4d2d1f] to-[#6d3e2c] text-white py-20 flex items-center justify-center min-h-[500px]">
        <div className="text-xl">Loading client reviews...</div>
      </section>
    );
  }

  if (error) {
    console.error("Error loading client reviews:", error);
    // Display an error message or provide fallback content
    return (
      <section className="bg-gradient-to-br from-[#4d2d1f] to-[#6d3e2c] text-white py-20 flex items-center justify-center min-h-[500px]">
        <div className="text-red-300 text-xl">
          Failed to load client reviews. Please try again later.
        </div>
      </section>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <section className="bg-gradient-to-br from-[#4d2d1f] to-[#6d3e2c] text-white py-20 flex items-center justify-center min-h-[500px]">
        <div className="text-xl">No client reviews available.</div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-[#451f0e] to-[#481c0b] text-white py-20">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Title and Description */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">{sectionTitle}</h2>
          <p className="text-lg max-w-2xl">{sectionDescription}</p>
        </div>

        {/* Swiper Slider for Reviews */}
        <div className="relative">
          <Swiper {...REVIEWS_SWIPER_CONFIG} className="w-full">
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-transparent">
                  {/* Client Photo */}
                  <div className="flex justify-center lg:justify-start">
                    <div className="w-64 h-64 rounded-lg overflow-hidden bg-primaryColor-900 shadow-lg">
                      <Image
                        src={review.imageSrc}
                        alt={review.name}
                        width="100%"
                        height="100%"
                        radius="lg" // Rounded corners for the image itself
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="text-center lg:text-left space-y-4">
                    <p className="text-xl italic leading-relaxed">
                      &ldquo;{review.message}&rdquo;
                    </p>
                    <h3 className="text-2xl font-semibold mt-6">
                      {review.name}
                    </h3>
                    <p className="text-lg opacity-80">{review.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows for Swiper */}
          <div className="absolute bottom-5 ltr:right-10 rtl:left-10  flex rtl:flex-row-reverse items-center gap-4 z-10">
            {/* Previous Button */}
            <div className="reviews-swiper-button-prev p-3 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-colors flex items-center justify-center shadow-lg w-12 h-12">
                 <IoArrowBack/>
            </div>
            {/* Next Button */}
            <div className="reviews-swiper-button-next p-3 rounded-full bg-white text-[#4d2d1f] hover:bg-gray-200 cursor-pointer transition-colors flex items-center justify-center shadow-lg w-12 h-12">
           <IoArrowForward/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;