export interface MediaFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
  }
  
  export interface Media {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail?: MediaFormat;
      small?: MediaFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  export interface Localization {
    id: number;
    documentId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    subtitle: string;
    order: number | null;
  }
  
  export interface HeroContent {
    id: number;
    documentId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    subtitle: string;
    order: number | null;
    media: Media;
    localizations: Localization[];
  }
  
  export interface HeroResponse<T> {
    data: T[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  }
  