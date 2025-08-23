import { ProcessedReview, ReviewContent } from "../../@types/review";

 
export const getReviewPhotoUrl = (
  photo: ReviewContent["photo"] | undefined
): string => {
  if (photo?.formats?.small?.url) return photo.formats.small.url;
  if (photo?.url) return photo.url;
  return "/images/person-placeholder.jpg";
};

export const formatApiReviews = (
  data: ReviewContent[],
  locale: "en" | "ar"
): ProcessedReview[] => {
  return data.map((item: ReviewContent) => ({
    id: item.id,
    name: locale === "ar" ? item.name_ar : item.name_en,
    role: item.role,
    message:
      (locale === "ar" ? item.message_ar : item.message_en) ||
      "No testimonial message provided.",
    imageSrc: getReviewPhotoUrl(item.photo),
  }));
};
