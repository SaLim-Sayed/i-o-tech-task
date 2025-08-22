export interface SlideData {
    description: string;
    id: number;
    title: string;
    subtitle: string;
    imageSrc: string;
    professionalImage?: string;
    ctaText: string;
    category: 'project-management' | 'landscape-design' | 'engineering';
  }
  
  export interface TeamMember {
    id: number;
    name: string;
    role: string;
    bio: string;
    profileImage: string;
    socialLinks: {
      linkedin?: string;
      twitter?: string;
      email?: string;
    };
    category: 'lawyer' | 'consultant' | 'manager';
  }
  
  export interface Client {
    id: number;
    name: string;
    logo: string;
    testimonial?: string;
    websiteUrl?: string;
  }
  
  export interface Service {
    id: number;
    name: string;
    description: string;
    icon: string;
    featuredImage: string;
    slug: string;
  }
  
  export interface NewsletterFormData {
    email: string;
  }
  
  export interface SearchResult {
    type: 'team' | 'service';
    id: number;
    title: string;
    description: string;
    image?: string;
    slug: string;
  }
  
  