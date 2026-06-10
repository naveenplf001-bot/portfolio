import Link from "next/link";
import type { Project, Skill, Review } from "@/types";
import { Parallax, Magnetic, AnimatedCounter } from "@/components/ScrollReveal";
import { CursorGlow, FloatingParticles } from "@/components/AdvancedEffects";
import HeroVisual from "@/components/sections/HeroVisual";

interface HeroProps {
  settings: Record<string, string>;
  projects: Project[];
  reviews: Review[];
  skills: Skill[];
}

export default function Hero({ settings, projects, reviews, skills }: HeroProps) {
  return (
    <CursorGlow color="rgba(99, 102, 241, 0.1)" size={600} className="relative min-h-screen items-center overflow-hidden">
      {/* Parallax background orbs */}
      <FloatingParticles count={25} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Parallax speed={-0.12}><div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/25 rounded-full blur-[150px] animate-pulse-glow" /></Parallax>
        <Parallax speed={0.08}><div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-emerald-600/20 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDelay: '1s' }} /></Parallax>
        <Parallax speed={-0.06}><div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-purple-600/20 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDelay: '2s' }} /></Parallax>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left — Main content (3/5) */}
          <div className="lg:col-span-3">
            {/* Tagline badge */}
            <div className="animate-fade-up mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Development &bull; Marketing &bull; Content
              </span>
            </div>

            <h1 className="animate-fade-up font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1]" style={{ animationDelay: '100ms' }}>
              We{' '}
              <span className="relative inline-block">
                <span className="text-gradient animate-shimmer">build</span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M1 5.5Q50 1 100 5T199 3" stroke="url(#underline-grad)" strokeWidth="2" strokeLinecap="round" /><defs><linearGradient id="underline-grad" x1="0" x2="200" gradientUnits="userSpaceOnUse"><stop stopColor="#6366f1" /><stop offset="1" stopColor="#a855f7" /></linearGradient></defs></svg>
              </span>{' '}it.
              <br />
              We{' '}
              <span className="relative inline-block">
                <span className="text-gradient-warm animate-shimmer">grow</span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M1 5.5Q50 1 100 5T199 3" stroke="url(#underline-warm)" strokeWidth="2" strokeLinecap="round" /><defs><linearGradient id="underline-warm" x1="0" x2="200" gradientUnits="userSpaceOnUse"><stop stopColor="#f97316" /><stop offset="1" stopColor="#eab308" /></linearGradient></defs></svg>
              </span>{' '}it.
            </h1>

            <p className="animate-fade-up mt-7 text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed" style={{ animationDelay: '200ms' }}>
              {settings.hero_bio}
            </p>

            {/* CTA buttons */}
            <div className="animate-fade-up flex flex-col sm:flex-row gap-4 mt-10" style={{ animationDelay: '300ms' }}>
              <Magnetic strength={0.15}>
                <Link
                  href="#work"
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl btn-gradient text-white font-semibold text-base transition-all duration-300"
                >
                  See Our Work
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </Magnetic>
              <Magnetic strength={0.15}>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-zinc-700 hover:border-indigo-500/50 text-zinc-300 hover:text-white font-semibold text-base transition-all duration-300"
                >
                  Start a Project
                </Link>
              </Magnetic>
            </div>

            {/* Stats inline */}
            <div className="animate-fade-up mt-12 flex gap-8 md:gap-10" style={{ animationDelay: '450ms' }}>
              {[
                { value: projects.length, suffix: '+', label: 'Projects' },
                { value: reviews.length, suffix: '+', label: 'Clients' },
                { value: skills.length, suffix: '+', label: 'Tools' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-1.5">
                  <span className="text-3xl md:text-4xl font-display font-bold text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={1800} />
                  </span>
                  <span className="text-sm text-zinc-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Visual story: Your Idea → We Build → We Grow → Results */}
          <HeroVisual />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-up" style={{ animationDelay: '800ms' }}>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-zinc-700 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-indigo-400 animate-bounce" />
          </div>
        </div>
      </div>
    </CursorGlow>
  );
}
