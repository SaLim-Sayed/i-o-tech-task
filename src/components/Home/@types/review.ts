// src/@types/review.ts

// Reusing Photo related types. If you have a common types file (e.g., src/@types/common.ts),
// you can define Photo and PhotoFormat there and import them.
// For this example, I'll include them directly.
export interface ReviewPhotoFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string; // Relative URL
  }
  
  export interface ReviewPhoto {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail: ReviewPhotoFormat;
      small: ReviewPhotoFormat;
      // Add other formats if needed, e.g., medium, large
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string; // Relative URL
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  export interface ReviewContent {
    id: number;
    documentId: string;
    name_en: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    name_ar: string;
    disacription_en: string | null; // Note: 'disacription' typo from your API
    disacription_ar: string | null;
    message_ar: string | null;
    message_en: string | null;
    role: string;
    photo: ReviewPhoto; // The `photo` field is populated
  }
  
  export interface ReviewsResponse {
    data: ReviewContent[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  }
  
  // Interface for processed data, easier to use in the component
  export interface ProcessedReview {
    id: number;
    name: string;
    role: string;
    message: string;
    imageSrc: string; // Absolute URL for the image
  }