
export interface ContentBlock {
  type: 'text' | 'image' | 'gallery';
  title?: string;
  body?: string;
  images?: string[];
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string; // Thumbnail
  description: string;
  year: string;
  featured: boolean;
  externalLink?: string | null;
  liveLink?: string | null;
  location?: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  openInNewTab?: boolean;
  clientQuote?: {
    text: string;
    author: string;
    role?: string;
  };
  // Detail page data
  tagline?: string;
  services?: string[];
  awards?: string[];
  results?: { label: string; value: string }[];
  performance?: { carbon: string; loadTime: string };
  contentBlocks?: ContentBlock[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  url: string;
}

export interface NavLink {
  label: string;
  href: string;
  type?: 'internal' | 'external' | 'view';
}

export interface SiteContent {
  site_info: {
    name: string;
    role: string;
    tagline: string;
    location: string;
    email: string;
    resume_url: string;
  };
  navigation: NavLink[];
  about: {
    label: string;
    intro: string;
    main_copy: string;
    sub_copy: string;
    skills: string[];
    education: Education[];
    certificates: Certificate[];
  };
  projects: Project[];
  experience: Experience[];
  footer: {
    cta: string;
    copyright: string;
    socials: { label: string; url: string }[];
  };
}
