
export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  year: string;
  // Detail page additions
  tagline?: string;
  services?: string[];
  liveLink?: string;
  awards?: string[];
  results?: { label: string; value: string }[];
  performance?: { carbon: string; loadTime: string };
  gallery?: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}
