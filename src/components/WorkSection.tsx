'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import type { Project } from '@/types';
import { hasRealImage } from '@/lib/portfolio';
import ScrollReveal, { TiltCard } from '@/components/ScrollReveal';

type Category = 'development' | 'marketing' | 'content';

function classify(project: Project): Category {
  const cat = project.category?.toLowerCase();
  if (cat === 'marketing') return 'marketing';
  if (cat === 'content') return 'content';
  return 'development';
}

// Accent config per category
const ACCENT = {
  development: {
    gradient: 'from-indigo-600 via-blue-600 to-cyan-500',
    tag: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    link: 'text-blue-400 hover:text-blue-300',
    heading: 'text-blue-400',
    glow: 'bg-blue-600/5',
    iconBg: 'from-blue-500 to-indigo-600',
  },
  marketing: {
    gradient: 'from-emerald-600 via-teal-600 to-cyan-500',
    tag: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    link: 'text-emerald-400 hover:text-emerald-300',
    heading: 'text-emerald-400',
    glow: 'bg-emerald-600/5',
    iconBg: 'from-emerald-500 to-teal-600',
  },
  content: {
    gradient: 'from-purple-600 via-pink-600 to-rose-500',
    tag: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    link: 'text-purple-400 hover:text-purple-300',
    heading: 'text-purple-400',
    glow: 'bg-purple-600/5',
    iconBg: 'from-purple-500 to-pink-600',
  },
} as const;

const SECTIONS: {
  cat: Category;
  icon: ReactNode;
  label: string;
  title: [string, string];
  subtitle: string;
}[] = [
  {
    cat: 'development',
    icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    label: 'Development',
    title: ['Products built to', ' scale.'],
    subtitle: 'Full-stack web applications with clean architecture, fast load times, and real users.',
  },
  {
    cat: 'marketing',
    icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    label: 'Marketing',
    title: ['Campaigns that drive', ' results.'],
    subtitle: 'SEO, paid ads, email funnels — data-driven strategies with measurable outcomes.',
  },
  {
    cat: 'content',
    icon: (
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Content & Creative',
    title: ['Content that builds', ' audiences.'],
    subtitle: 'Video production, social media, and brand content people actually engage with.',
  },
];

export default function WorkSection({ projects }: { projects: Project[] }) {
  const grouped: Record<Category, Project[]> = {
    development: [],
    marketing: [],
    content: [],
  };
  projects.forEach(p => {
    grouped[classify(p)].push(p);
  });

  return (
    <>
      {SECTIONS.map((section, sIdx) => {
        const items = grouped[section.cat];
        if (items.length === 0) return null;
        const accent = ACCENT[section.cat];

        return (
          <CategorySection
            key={section.cat}
            section={section}
            items={items}
            accent={accent}
            sIdx={sIdx}
          />
        );
      })}
    </>
  );
}

const INITIAL_COUNT = 3;

function CategorySection({
  section,
  items,
  accent,
  sIdx,
}: {
  section: typeof SECTIONS[number];
  items: Project[];
  accent: typeof ACCENT[Category];
  sIdx: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = items.length > INITIAL_COUNT;
  const visibleItems = expanded ? items : items.slice(0, INITIAL_COUNT);
  const hiddenCount = items.length - INITIAL_COUNT;

  return (
    <section
      id={sIdx === 0 ? 'work' : undefined}
      className={`py-24 relative ${sIdx % 2 === 1 ? 'noise' : ''}`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute ${sIdx % 2 === 0 ? 'top-1/4 left-0' : 'bottom-0 right-0'} w-[500px] h-[500px] ${accent.glow} rounded-full blur-[150px]`} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end gap-6 mb-10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${accent.iconBg} flex items-center justify-center`}>
                  {section.icon}
                </div>
                <span className={`text-sm font-mono ${accent.heading} uppercase tracking-wider`}>
                  {section.label}
                </span>
                <span className="text-xs text-zinc-600 font-mono">{items.length} projects</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
                {section.title[0]}
                <span className={accent.heading}>{section.title[1]}</span>
              </h2>
            </div>
            <p className="text-base text-zinc-300 leading-relaxed max-w-sm">
              {section.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Project grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleItems.map((project, pIdx) => (
            <ScrollReveal key={project.id} delay={pIdx * 100} distance={25} scale={0.95} blur={4}>
              <TiltCard intensity={5} className="h-full">
                <ProjectCard project={project} accent={accent} cat={section.cat} />
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        {/* View more / View less */}
        {hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className={`group inline-flex items-center gap-2 px-6 py-3 rounded-xl border transition-all duration-300 font-medium text-sm ${
                expanded
                  ? 'border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500'
                  : `border-zinc-700 ${accent.heading} hover:border-zinc-500`
              }`}
            >
              {expanded ? (
                <>
                  Show Less
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  View {hiddenCount} More {section.label} Project{hiddenCount > 1 ? 's' : ''}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// --- Uniform Project Card ---
function ProjectCard({
  project,
  accent,
  cat,
}: {
  project: Project;
  accent: typeof ACCENT[Category];
  cat: Category;
}) {
  const hasImage = hasRealImage(project.image_url);
  const hasVideo = !!project.video_url;

  return (
    <div className="group surface-card rounded-2xl overflow-hidden flex flex-col">
      {/* Clickable media area */}
      <Link href={`/projects/${project.id}`} className={`relative h-48 bg-gradient-to-br ${accent.gradient} overflow-hidden block`}>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.08),transparent_50%)]" />

        {/* If real image exists, show it */}
        {hasImage && (
          <img
            src={project.image_url!}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {/* Video play indicator */}
        {hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20 transition-transform duration-300 group-hover:scale-110">
              <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Placeholder content when no real image */}
        {!hasImage && !hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[80px] font-black text-white/[0.06] transition-transform duration-700 group-hover:scale-110">
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Content type icon overlay (bottom-right) */}
        {cat === 'content' && !hasVideo && (
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/10">
            <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {cat === 'marketing' && (
          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/10">
            <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        )}

        {/* Multi-image indicator (ready for when you add multiple photos) */}
        {hasImage && (
          <div className="absolute top-3 right-3 flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          </div>
        )}
      </Link>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/projects/${project.id}`} className="block">
          <h3 className="text-lg font-display font-bold mb-2 group-hover:text-indigo-400 transition-colors leading-tight">
            {project.title}
          </h3>
        </Link>

        <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Tech / tool tags */}
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech_stack.slice(0, 4).map(tag => (
              <span
                key={tag}
                className={`px-2.5 py-0.5 rounded-md text-xs font-medium border ${accent.tag}`}
              >
                {tag}
              </span>
            ))}
            {project.tech_stack.length > 4 && (
              <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-500 text-xs">
                +{project.tech_stack.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-4 pt-3 border-t border-zinc-800/60 mt-auto">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium transition-colors ${accent.link}`}
            >
              Live Demo &nearr;
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-400 hover:text-zinc-300 transition-colors"
            >
              Source Code &nearr;
            </a>
          )}
          {project.video_url && (
            <a
              href={project.video_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium transition-colors ${accent.link}`}
            >
              Watch &nearr;
            </a>
          )}
          {!project.demo_url && !project.github_url && !project.video_url && (
            <span className="text-sm text-zinc-500">Case Study</span>
          )}
        </div>
      </div>
    </div>
  );
}
