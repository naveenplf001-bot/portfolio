export interface Project {
  id: number;
  title: string;
  description: string;
  long_description?: string;
  category?: string;
  image_url?: string;
  video_url?: string;
  demo_url?: string;
  github_url?: string;
  tech_stack?: string[];
  highlights?: string[];
  metrics?: Record<string, string>;
  gallery?: string[];
  featured?: boolean;
  order?: number;
}

export interface Skill {
  id: number;
  name: string;
  icon?: string;
  color: string;
  category?: string;
  order?: number;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
}

export interface Review {
  id: number;
  name: string;
  email: string;
  message: string;
  rating: number;
  featured?: boolean;
  order?: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image_url?: string;
  order?: number;
}

export interface PortfolioData {
  settings: Record<string, string>;
  projects: Project[];
  skills: Skill[];
  socials: SocialLink[];
  reviews: Review[];
  team: TeamMember[];
}
