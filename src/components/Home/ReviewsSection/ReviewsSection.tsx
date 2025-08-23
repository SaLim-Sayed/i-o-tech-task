"use client";

import { useApiQuery } from "@/src/hooks/useApiQuery";
import { ReviewsResponse } from "../@types/review";
import { formatApiReviews } from "./utils/reviews.utils";
import ReviewsSwiper from "./components/ReviewsSwiper";
 

interface ReviewsSectionProps {
  locale?: "en" | "ar";
}

const ReviewsSection = ({ locale = "en" }: ReviewsSectionProps) => {
  const { data, isLoading, error } = useApiQuery<ReviewsResponse>({
    key: ["reviews"],
    endpoint: "reviews",
  });

  const reviews = formatApiReviews(data?.data || [], locale);

  const sectionTitle =
    locale === "ar" ? "آراء عملائنا" : "What our clients are saying";
  const sectionDescription =
    locale === "ar"
      ? "عملاؤنا يتنوعون من مستثمرين أفراد إلى شركات عالمية ومحلية..."
      : "Our clients range from individual investors, to local, international as well as Fortune 500 companies.";

  if (isLoading) {
    return (
      <section className="bg-gradient-to-br from-[#4d2d1f] to-[#6d3e2c] text-white py-20 flex items-center justify-center min-h-[500px]">
        <div className="text-xl">Loading client reviews...</div>
      </section>
    );
  }

  if (error) {
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
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">{sectionTitle}</h2>
          <p className="text-lg max-w-2xl">{sectionDescription}</p>
        </div>

        {/* Reviews Swiper */}
        <ReviewsSwiper reviews={reviews} />
      </div>
    </section>
  );
};

export default ReviewsSection;
