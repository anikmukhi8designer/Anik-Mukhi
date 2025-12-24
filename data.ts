
import { SiteContent } from './types';

/**
 * PORTFOLIO CONTENT CONFIGURATION
 * Edit this file to update your personal information, projects, and experience.
 * The UI will automatically reflect these changes.
 */

export const INITIAL_CONTENT: SiteContent = {
  "site_info": {
    "name": "ANIK MUKHI",
    "role": "UI/UX DESIGNER & VIBE CODER",
    "tagline": "DESIGNING CALM, HUMAN-CENTERED EXPERIENCES",
    "location": "GUJARAT, INDIA",
    "email": "anik.mukhi8@gmail.com",
    "resume_url": "#" // Link to your PDF resume here
  },
  "navigation": [
    { "label": "HOME", "href": "home", "type": "view" },
    { "label": "WORK", "href": "work", "type": "view" },
    { "label": "ABOUT", "href": "about", "type": "view" },
    { "label": "CONTACT", "href": "#contact", "type": "internal" }
  ],
  "about": {
    "label": "ABOUT ME",
    "intro": "I am Anik Mukhi, a designer and developer focused on crafting digital interfaces that feel as intentional as physical objects. I bridge the gap between aesthetics and performance.",
    "main_copy": "I believe that digital experiences should be as <i>tangible</i> as physical objects. My approach combines systematic engineering with artistic intuition to create products that feel <b>alive</b>.",
    "sub_copy": "Currently available for freelance partnerships and high-impact digital products. Based in London, working globally.",
    "skills": ["React", "TypeScript", "Motion", "Strategy", "UI/UX", "Branding", "Figma", "Webflow"],
    "education": [
      {
        "id": "ed1",
        "degree": "Bachelor of Design (UI/UX)",
        "institution": "Royal College of Art",
        "year": "2019"
      }
    ],
    "certificates": [
      {
        "id": "c1",
        "title": "Google UX Design Professional Certificate",
        "issuer": "Coursera",
        "year": "2023",
        "url": "#"
      },
      {
        "id": "c2",
        "title": "Advanced Interaction Design",
        "issuer": "Interaction Design Foundation",
        "year": "2022",
        "url": "#"
      }
    ]
  },
  "projects": [
    {
      "id": "lumina",
      "title": "Lumina Digital",
      "tagline": "Illuminating the future of architectural commerce.",
      "category": "E-commerce & Brand",
      "image": "https://images.unsplash.com/photo-1558444479-c8a51e9a12f6?auto=format&fit=crop&q=80&w=2000",
      "description": "A high-end editorial experience for a modern lighting house, focusing on brutalist aesthetics.",
      "year": "2024",
      "featured": true,
      "internalSlug": "lumina-digital",
      "services": ["Visual Identity", "Web Development"],
      "awards": ["Awwwards SOTD"],
      "performance": { "carbon": "0.24g CO2", "loadTime": "0.8s" },
      "contentBlocks": [
        {
          "type": "text",
          "title": "The Concept",
          "body": "Lumina was designed to bridge the gap between architectural coldness and digital warmth. Every interaction is weighted to feel like turning a physical page."
        },
        {
          "type": "gallery",
          "images": [
            "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=1600",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600"
          ]
        }
      ]
    },
    {
      "id": "aether",
      "title": "Aether Archive",
      "tagline": "A digital vault for speculative architectural concepts.",
      "category": "UI/UX Design",
      "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
      "description": "Minimalist documentation platform for speculative architecture.",
      "year": "2023",
      "featured": true,
      "internalSlug": "aether-archive",
      "services": ["UX Strategy", "Interface Design"],
      "contentBlocks": [
        {
          "type": "image",
          "images": ["https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1600"],
          "caption": "The main landing interface utilizing brutalist typography."
        }
      ]
    },
    {
      "id": "gain",
      "title": "Gain Network",
      "category": "Marketing Site",
      "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000",
      "description": "High-performance marketing site for a DeFi startup.",
      "year": "2024",
      "featured": false,
      "externalLink": "https://gain.network",
      "openInNewTab": true
    },
    {
      "id": "investa",
      "title": "Investa App",
      "category": "Fintech App",
      "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
      "description": "Smart rent saving app for salaried users in emerging markets.",
      "year": "2023",
      "featured": true,
      "externalLink": "https://google.com",
      "openInNewTab": true
    },
    {
      "id": "spec-v",
      "title": "Spec-V",
      "category": "Motion Design",
      "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000",
      "description": "Abstract motion study for a high-performance vehicle configurator.",
      "year": "2022",
      "featured": false,
      "internalSlug": "spec-v"
    }
  ],
  "experience": [
    {
      "id": "e1",
      "company": "Stellar Labs",
      "role": "Senior Product Designer",
      "period": "2023 — PRESENT", // "PRESENT" keyword is used to calculate tenure until current year
      "description": "Leading the design system team and defining the visual language for next-generation data visualization tools."
    },
    {
      "id": "e2",
      "company": "Nexus Studio",
      "role": "Visual Designer",
      "period": "2021 — 2023",
      "description": "Collaborated with global brands to craft immersive digital storytelling experiences and high-performance marketing sites."
    },
    {
      "id": "e3",
      "company": "Draft & Co",
      "role": "UI Developer",
      "period": "2019 — 2021",
      "description": "Bridging the gap between design and engineering, focused on complex React applications and fluid motion systems."
    }
  ],
  "footer": {
    "cta": "LET'S BUILD SOMETHING NEW.",
    "copyright": "ANIK MUKHI PORTFOLIO. ALL RIGHTS RESERVED.",
    "socials": [
      { "label": "Twitter", "url": "#" },
      { "label": "Instagram", "url": "#" },
      { "label": "LinkedIn", "url": "#" }
    ]
  }
};
