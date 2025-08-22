// src/@types/service.ts

// Basic structure for rich text children (e.g., text, bold, italic)
export interface RichTextChild {
    type: string;
    text?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    children?: RichTextChild[]; // For nested elements like list-item -> text
  }
  
  // Structure for a rich text block (e.g., paragraph, list)
  export interface RichTextContent {
    type: string;
    children: RichTextChild[];
    format?: string; // e.g., 'ordered', 'unordered' for lists
  }
  
  // Type for a service category
  export interface ServiceCategory {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string; // The locale this specific category instance belongs to
    name: string;
    description: RichTextContent[] | null; // Category can have its own rich text description
    // If categories themselves had localizations, you'd add:
    // localizations?: ServiceCategoryLocalization[];
  }
  
  // Type for localized versions of the main service
  export interface ServiceLocalization {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    description: RichTextContent[] | null;
    title: string;
  }
  
  // Main Service Content type
  export interface ServiceContent {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string; // The locale this specific service instance belongs to
    description: RichTextContent[] | null;
    title: string;
    coverImage: any | null; // Assuming coverImage might be populated later
    service_categories: ServiceCategory[]; // Populated sub-categories
    localizations: ServiceLocalization[]; // Localized versions of this service
  }
  
  // API response for multiple services (e.g., /api/services)
  export interface ServicesResponse {
    data: ServiceContent[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  }
  
  // API response for a single service (e.g., /api/services/{id})
  export interface SingleServiceResponse {
    data: ServiceContent;
    meta: {}; // Meta might be empty for single entry or contain basic info
  }