// src/@types/team.ts

export interface TeamMemberPhotoFormat {
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
  
  export interface TeamMemberPhoto {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail: TeamMemberPhotoFormat;
      small: TeamMemberPhotoFormat;
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
  
  export interface TeamMemberLocalization {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    name: string;
    role: string;
  }
  
  export interface TeamMemberContent {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    name: string;
    role: string;
    photo: TeamMemberPhoto; // The `photo` field is populated
    localizations: TeamMemberLocalization[];
  }
  
  export interface TeamMembersResponse {
    data: TeamMemberContent[];
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
  export interface ProcessedTeamMember {
    id: number;
    name: string;
    role: string;
    imageSrc: string; // Absolute URL for the image
    // Add contact info if the API provides it, for now using placeholder icons
  }