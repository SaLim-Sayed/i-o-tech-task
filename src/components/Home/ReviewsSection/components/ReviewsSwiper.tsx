"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import ReviewCard from "./ReviewCard";
 

import "swiper/css";
import "swiper/css/navigation";
import { ProcessedReview } from "../../@types/review";
import { REVIEWS_SWIPER_CONFIG } from "../utils/reviews.config";

interface ReviewsSwiperProps {
  reviews: ProcessedReview[];
}

const ReviewsSwiper = ({ reviews }: ReviewsSwiperProps) => {
  return (
    <div className="relative">
      <Swiper {...REVIEWS_SWIPER_CONFIG} className="w-full">
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <div className="absolute bottom-5 ltr:right-10 rtl:left-10 flex rtl:flex-row-reverse items-center gap-4 z-10">
        <div className="reviews-swiper-button-prev p-3 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer transition-colors flex items-center justify-center shadow-lg w-12 h-12">
          <IoArrowBack />
        </div>
        <div className="reviews-swiper-button-next p-3 rounded-full bg-white text-[#4d2d1f] hover:bg-gray-200 cursor-pointer transition-colors flex items-center justify-center shadow-lg w-12 h-12">
          <IoArrowForward />
        </div>
      </div>
    </div>
  );
};

export default ReviewsSwiper;
