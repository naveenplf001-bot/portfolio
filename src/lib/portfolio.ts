// ============================================================================
// Static portfolio data access layer
// ----------------------------------------------------------------------------
// Replaces the original PostgreSQL/API-driven data fetching. All content is
// read synchronously from the bundled static JSON file (src/data/portfolio.json),
// which was migrated 1:1 from the live database. No database, server, or network
// requests are involved — these functions are pure and run at build time.
// ============================================================================

import type { PortfolioData, Project, SocialLink } from '@/types';
import data from '@/data/portfolio.json';

// The JSON is typed loosely on import (e.g. nullable fields); cast to our domain
// types. Values like `video_url: null` map cleanly onto the optional fields.
const portfolioData = data as unknown as PortfolioData;

const defaultSettings: Record<string, string> = {
  hero_name: 'Your Name',
  hero_title: 'Build & Grow Digital',
  hero_bio:
    'We build products that grow businesses — from full-stack web apps to marketing funnels that actually convert. Code, content, and strategy under one roof.',
  contact_email: 'your.email@example.com',
};

/** All portfolio data (settings, projects, skills, socials, reviews, team). */
export function getPortfolioData(): PortfolioData {
  return {
    ...portfolioData,
    settings: { ...defaultSettings, ...portfolioData.settings },
  };
}

/** A single project by id, or null if it doesn't exist. */
export function getProject(id: number): Project | null {
  if (!id || Number.isNaN(id)) return null;
  return portfolioData.projects.find((p) => p.id === id) ?? null;
}

/** Up to 3 other projects in the same category (for the "related" section). */
export function getRelatedProjects(id: number, category: string): Project[] {
  return portfolioData.projects
    .filter((p) => (p.category || 'development') === category && p.id !== id)
    .slice(0, 3);
}

/** Brand name, contact email, and socials used by the shared footer. */
export function getFooterData(): { brandName: string; email: string; socials: SocialLink[] } {
  const settings = { ...defaultSettings, ...portfolioData.settings };
  return {
    brandName: settings.hero_name || 'Portfolio',
    email: settings.contact_email || '',
    socials: portfolioData.socials,
  };
}

/** Every project id — used by generateStaticParams to pre-render detail pages. */
export function getAllProjectIds(): number[] {
  return portfolioData.projects.map((p) => p.id);
}

/**
 * Whether a project's `image_url` points to a real uploaded asset.
 *
 * The seed data uses placeholder paths like `/projects/ecommerce.jpg` that
 * don't exist on disk; the UI treats those as "no image" and renders a
 * gradient fallback instead. Centralised here so the rule lives in one place
 * rather than being re-typed as `!url.startsWith('/projects/')` across the UI.
 */
export function hasRealImage(url?: string): boolean {
  return !!url && !url.startsWith('/projects/');
}
