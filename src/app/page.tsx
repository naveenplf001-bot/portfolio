import Link from "next/link";
import WorkSection from "@/components/WorkSection";
import ScrollReveal, { Parallax, Magnetic, AnimatedCounter, TiltCard } from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import { CursorGlow, FloatingParticles, SpotlightCard, ScrollProgress } from "@/components/AdvancedEffects";
import { getPortfolioData } from "@/lib/portfolio";

const defaultSettings = {
  hero_name: 'Your Name',
  hero_title: 'Build & Grow Digital',
  hero_bio: 'We build products that grow businesses — from full-stack web apps to marketing funnels that actually convert. Code, content, and strategy under one roof.',
  contact_email: 'your.email@example.com',
};

// Services data — the unified offering
const services = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Web Development',
    desc: 'Custom websites and web applications built with modern frameworks. Fast, scalable, and optimized for conversions.',
    tags: ['React / Next.js', 'Full-Stack', 'APIs', 'Databases'],
    color: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-500/20 hover:border-blue-500/40',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: 'Digital Marketing',
    desc: 'Data-driven campaigns across Google, Meta, and email that bring qualified leads and measurable ROI.',
    tags: ['Paid Ads', 'SEO', 'Email Funnels', 'Analytics'],
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/20 hover:border-emerald-500/40',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Content & Video',
    desc: 'Scroll-stopping content strategy, video production, and social media management that builds real audiences.',
    tags: ['Video Production', 'Social Media', 'Copywriting', 'Branding'],
    color: 'from-purple-500 to-pink-600',
    borderColor: 'border-purple-500/20 hover:border-purple-500/40',
  },
];

export default function Home() {
  // Static data import — replaces the original `/api/portfolio` fetch.
  const data = getPortfolioData();

  const settings = { ...defaultSettings, ...data.settings };
  const { projects = [], skills = [], socials = [], reviews = [], team = [] } = data;

  const displayedReviews =
    reviews.filter((r) => r.featured).length > 0
      ? reviews.filter((r) => r.featured)
      : reviews.slice(0, 3);

  const skillCategories = skills.reduce(
    (acc, skill) => {
      const cat = skill.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>
  );

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
      <ScrollProgress />

      {/* ============ NAVBAR ============ */}
      <nav className="fixed top-0 w-full z-50 nav-solid">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-bold text-xl tracking-tight text-white">
            {settings.hero_name?.split(' ')[0] || 'Portfolio'}
            <span className="text-indigo-200">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {['Services', 'Work', 'Team', 'Reviews', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-indigo-100 hover:text-white transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>

          <Link
            href="#contact"
            className="px-5 py-2.5 text-sm font-display font-semibold rounded-lg bg-white text-indigo-700 hover:bg-indigo-50 transition-all duration-200 hover:shadow-lg"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </nav>

      {/* ============ HERO ============ */}
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
            <div className="lg:col-span-2 hidden lg:block">
              <div className="animate-fade-up relative" style={{ animationDelay: '400ms' }}>
                {/* Background glow behind the flow */}
                <div className="absolute -inset-8 bg-gradient-to-br from-indigo-500/[0.07] via-purple-500/[0.05] to-pink-500/[0.07] rounded-3xl blur-xl" />

                {/* Floating decorative elements */}
                <div className="absolute -top-6 -right-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/10 backdrop-blur-sm flex items-center justify-center animate-float" style={{ animationDelay: '3s' }}>
                  <svg className="w-6 h-6 text-blue-400/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                </div>
                <div className="absolute -bottom-4 -left-6 w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/10 backdrop-blur-sm flex items-center justify-center animate-float-delayed" style={{ animationDelay: '1s' }}>
                  <svg className="w-5 h-5 text-emerald-400/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="absolute top-1/3 -right-8 w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/10 backdrop-blur-sm flex items-center justify-center animate-float" style={{ animationDelay: '2s' }}>
                  <svg className="w-5 h-5 text-purple-400/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
                <div className="absolute bottom-1/4 -right-6 w-10 h-10 rounded-lg bg-amber-500/[0.07] border border-amber-500/10 flex items-center justify-center animate-float-delayed" style={{ animationDelay: '4s' }}>
                  <svg className="w-4 h-4 text-amber-400/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </div>

                <div className="relative space-y-4 max-w-xs mx-auto">

                  {/* Step 1 — Your Idea */}
                  <div className="animate-float group relative rounded-2xl bg-zinc-800/40 border border-zinc-700/40 p-5 flex items-center gap-4 hover:border-amber-500/30 transition-all duration-300">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/10">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                    </div>
                    <div>
                      <p className="font-display font-bold text-white text-sm">Your Idea</p>
                      <p className="text-xs text-zinc-500">Tell us what you want to build</p>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className="flex justify-center"><div className="w-px h-4 bg-gradient-to-b from-amber-500/30 to-blue-500/30" /></div>

                  {/* Step 2 — We Build */}
                  <div className="animate-float group relative rounded-2xl bg-zinc-800/40 border border-zinc-700/40 p-5 flex items-center gap-4 ml-6 hover:border-blue-500/30 transition-all duration-300" style={{ animationDelay: '1s' }}>
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/10">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                    <div>
                      <p className="font-display font-bold text-white text-sm">We Build It</p>
                      <p className="text-xs text-zinc-500">Website, app, or platform</p>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className="flex justify-center ml-6"><div className="w-px h-4 bg-gradient-to-b from-blue-500/30 to-emerald-500/30" /></div>

                  {/* Step 3 — We Grow */}
                  <div className="animate-float-delayed group relative rounded-2xl bg-zinc-800/40 border border-zinc-700/40 p-5 flex items-center gap-4 ml-12 hover:border-emerald-500/30 transition-all duration-300">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/10">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                    <div>
                      <p className="font-display font-bold text-white text-sm">We Grow It</p>
                      <p className="text-xs text-zinc-500">SEO, ads, content, funnels</p>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className="flex justify-center ml-12"><div className="w-px h-4 bg-gradient-to-b from-emerald-500/30 to-purple-500/30" /></div>

                  {/* Step 4 — Your Results */}
                  <div className="animate-float group relative rounded-2xl bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 border border-indigo-500/25 p-5 flex items-center gap-4 ml-6 hover:border-indigo-400/40 transition-all duration-300" style={{ animationDelay: '2s' }}>
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/15">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                    </div>
                    <div>
                      <p className="font-display font-bold text-white text-sm">Your Results</p>
                      <p className="text-xs text-zinc-400">Revenue, traffic, customers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

      {/* ============ CLIENT LOGOS / INDUSTRIES ============ */}
      <section className="py-10 bg-indigo-950/30 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 mb-6">
          <p className="text-center text-xs font-mono text-zinc-500 uppercase tracking-widest">Industries We Serve</p>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />
          <div className="flex gap-12 scroll-left items-center" style={{ animationDuration: '40s' }}>
            {[...Array(2)].flatMap((_, setIdx) => [
              { name: 'Healthcare', icon: '&#127973;' },
              { name: 'Fintech', icon: '&#128179;' },
              { name: 'E-Commerce', icon: '&#128722;' },
              { name: 'Education', icon: '&#127891;' },
              { name: 'SaaS', icon: '&#9729;&#65039;' },
              { name: 'Real Estate', icon: '&#127970;' },
              { name: 'Gaming', icon: '&#127918;' },
              { name: 'Logistics', icon: '&#128666;' },
              { name: 'AI / ML', icon: '&#129302;' },
              { name: 'Media', icon: '&#127909;' },
              { name: 'Startups', icon: '&#128640;' },
              { name: 'Retail', icon: '&#128717;' },
            ].map((item, i) => (
              <div key={`${setIdx}-${i}`} className="flex-shrink-0 flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-zinc-800/30 border border-zinc-700/20">
                <span className="text-lg" dangerouslySetInnerHTML={{ __html: item.icon }} />
                <span className="text-sm font-medium text-zinc-400 whitespace-nowrap">{item.name}</span>
              </div>
            )))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============ SERVICES ============ */}
      <section id="services" className="py-32 relative bg-gradient-to-b from-[#09090b] via-indigo-950/20 to-[#09090b]">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-indigo-400 font-mono text-sm mb-4 tracking-wider uppercase">What We Do</p>
            <h2 className="section-heading">
              One team for your
              <br />
              entire <span className="text-gradient">digital presence.</span>
            </h2>
            <p className="section-subtext mx-auto mt-4">
              Most businesses hire separate teams for dev, marketing, and content.
              We do all three — which means everything actually works together.
            </p>
          </div>
          </ScrollReveal>

          {/* Service capabilities */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {services.map((svc, i) => (
              <ScrollReveal key={svc.title} delay={i * 120} scale={0.92} blur={6}>
                <TiltCard className={`h-full`}>
                <SpotlightCard className={`group surface-card rounded-2xl p-8 border ${svc.borderColor} transition-colors duration-300 h-full`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-6 text-white transition-transform duration-300 group-hover:scale-110`}>
                    {svc.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3 text-white">{svc.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">{svc.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {svc.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-white/[0.04] text-zinc-400 text-xs border border-zinc-800">{tag}</span>
                    ))}
                  </div>
                </SpotlightCard>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Offering packages — horizontal scroll with large visual cards */}
          <div className="mt-16">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="font-mono text-sm text-indigo-400 uppercase tracking-wider mb-2">Who We Work With</p>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white">From students to <span className="text-gradient">enterprises.</span></h3>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  title: 'College Projects',
                  desc: 'Final-year builds, research prototypes, and academic projects — delivered with proper documentation and presentation-ready results.',
                  tag: 'Students & Academics',
                  emoji: '&#127891;',
                  gradient: 'from-amber-500/10 to-orange-500/10',
                  border: 'border-amber-500/15 hover:border-amber-400/40',
                  accent: 'text-amber-400',
                  tagBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                },
                {
                  title: 'Freelance & Portfolios',
                  desc: 'Personal brands, portfolio sites, and landing pages that make a lasting impression — fast turnaround, pixel-perfect results.',
                  tag: 'Individuals & Freelancers',
                  emoji: '&#9997;&#65039;',
                  gradient: 'from-cyan-500/10 to-blue-500/10',
                  border: 'border-cyan-500/15 hover:border-cyan-400/40',
                  accent: 'text-cyan-400',
                  tagBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
                },
                {
                  title: 'Startup MVPs',
                  desc: 'Idea to launch in weeks — web apps, marketing sites, ad campaigns, and growth strategy all bundled into one focused sprint.',
                  tag: 'Early-Stage Startups',
                  emoji: '&#128640;',
                  gradient: 'from-violet-500/10 to-purple-500/10',
                  border: 'border-violet-500/15 hover:border-violet-400/40',
                  accent: 'text-violet-400',
                  tagBg: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
                },
                {
                  title: 'Enterprise & Agencies',
                  desc: 'Large-scale platforms, SaaS products, multi-channel campaigns — full-service partnership with dedicated team allocation.',
                  tag: 'Established Companies',
                  emoji: '&#127970;',
                  gradient: 'from-rose-500/10 to-pink-500/10',
                  border: 'border-rose-500/15 hover:border-rose-400/40',
                  accent: 'text-rose-400',
                  tagBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
                },
              ].map((pkg, i) => (
                <ScrollReveal key={pkg.title} delay={i * 100} scale={0.95} blur={3}>
                  <div className={`group relative rounded-2xl bg-gradient-to-br ${pkg.gradient} border ${pkg.border} p-7 transition-all duration-300 overflow-hidden`}>
                    {/* Large emoji watermark */}
                    <span className="absolute -bottom-4 -right-2 text-7xl opacity-[0.06] select-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" dangerouslySetInnerHTML={{ __html: pkg.emoji }} />

                    <div className="relative z-10">
                      <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-medium border ${pkg.tagBg} mb-4`}>{pkg.tag}</span>
                      <h4 className={`font-display text-xl font-bold mb-3 ${pkg.accent}`}>{pkg.title}</h4>
                      <p className="text-zinc-300 text-sm leading-relaxed">{pkg.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Process strip */}
          <div className="mt-16">
            <ScrollReveal>
              <p className="text-center font-mono text-sm text-indigo-400 uppercase tracking-wider mb-8">How We Work</p>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { step: '01', title: 'Discovery', desc: 'Understand your goals, audience, and what success looks like', icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                ), color: 'from-blue-500 to-indigo-600' },
                { step: '02', title: 'Strategy', desc: 'Plan the tech stack, marketing channels, and content approach', icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" /></svg>
                ), color: 'from-violet-500 to-purple-600' },
                { step: '03', title: 'Execute', desc: 'Build, launch, and run campaigns — fast and lean', icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                ), color: 'from-amber-500 to-orange-600' },
                { step: '04', title: 'Optimize', desc: 'Track data, iterate, and scale what works', icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                ), color: 'from-emerald-500 to-teal-600' },
              ].map((item, i) => (
                <ScrollReveal key={item.step} delay={i * 120} scale={0.93} blur={4}>
                  <TiltCard intensity={6} className="h-full">
                    <SpotlightCard className="group relative h-full rounded-2xl border border-zinc-700/40 bg-zinc-900/60 p-6 transition-all duration-300 hover:border-zinc-600/60">
                      {/* Step number — large watermark */}
                      <span className="absolute top-4 right-5 text-4xl font-display font-bold text-white/[0.04] select-none">{item.step}</span>

                      {/* Icon */}
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                        {item.icon}
                      </div>

                      {/* Connector line (hidden on mobile, visible between cards) */}
                      {i < 3 && (
                        <div className="hidden lg:block absolute top-10 -right-3 w-6 h-px bg-zinc-700/50" />
                      )}

                      <h4 className="font-display font-bold text-lg text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                    </SpotlightCard>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============ WORK ============ */}
      <WorkSection projects={projects} />

      {/* ============ STATS BAND ============ */}
      <section className="relative py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.06),transparent_50%)]" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: projects.length * 5, suffix: '+', label: 'Projects Delivered' },
              { value: reviews.length * 4, suffix: '+', label: 'Happy Clients' },
              { value: 3, suffix: '+', label: 'Years Experience' },
              { value: 99, suffix: '%', label: 'Client Satisfaction' },
            ].map((stat) => (
              <ScrollReveal key={stat.label} scale={0.9}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2200} />
                  </div>
                  <div className="text-sm text-white/70 font-medium">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-purple" />

      {/* ============ SKILLS — MARQUEE ============ */}
      <section id="skills" className="py-28 relative overflow-hidden bg-gradient-to-b from-[#09090b] via-purple-950/20 to-[#09090b]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-indigo-600/[0.03] rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10">
          <ScrollReveal>
          <div className="text-center mb-14 px-6">
            <p className="text-indigo-400 font-mono text-sm mb-4 tracking-wider uppercase">Toolkit</p>
            <h2 className="section-heading">
              Technologies we
              <span className="text-gradient"> swear by.</span>
            </h2>
          </div>
          </ScrollReveal>

          <div className="space-y-4">
            {Object.entries(skillCategories).map(([category, catSkills], idx) => {
              const direction = idx % 2 === 0 ? 'scroll-left' : 'scroll-right';
              const speed = idx === 0 ? '60s' : idx === 1 ? '70s' : '50s';
              const doubled = [...catSkills, ...catSkills];

              return (
                <div key={category} className="relative">
                  <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
                  <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />

                  <div className={`flex gap-3 ${direction}`} style={{ animationDuration: speed }}>
                    {doubled.map((skill, i) => (
                      <div
                        key={`${skill.id}-${i}`}
                        className="flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-full bg-zinc-800/40 border border-zinc-700/30 hover:border-zinc-600/50 hover:bg-zinc-800/70 transition-all duration-200 cursor-default group"
                      >
                        <div className={`w-7 h-7 rounded-lg ${skill.color} flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}>
                          <span className="text-white font-bold text-[9px]">{skill.icon || skill.name.charAt(0)}</span>
                        </div>
                        <span className="font-medium text-sm text-zinc-400 group-hover:text-white transition-colors whitespace-nowrap">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-8 mt-10 px-6">
            {Object.entries(skillCategories).map(([category, catSkills]) => {
              const color = category.includes('Marketing') ? 'bg-emerald-400' : category.includes('Content') ? 'bg-purple-400' : 'bg-blue-400';
              return (
                <div key={category} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${color}`} />
                  <span className="text-xs text-zinc-500">{category} ({catSkills.length})</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============ REVIEWS ============ */}
      <section id="reviews" className="py-32 relative bg-gradient-to-b from-[#09090b] via-emerald-950/15 to-[#09090b]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-indigo-400 font-mono text-sm mb-4 tracking-wider uppercase">Testimonials</p>
            <h2 className="section-heading">
              From startups to
              <br />
              <span className="text-gradient">established brands.</span>
            </h2>
          </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedReviews.map((review, rIdx) => (
              <ScrollReveal key={review.id} delay={rIdx * 120} scale={0.93} blur={5}>
              <div
                className="surface-card rounded-2xl p-6 md:p-8 flex flex-col h-full"
              >
                <div className="flex items-center gap-0.5 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'text-amber-400' : 'text-zinc-700'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-zinc-300 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{review.message}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3 pt-5 border-t border-zinc-800">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-white">{review.name}</p>
                    <p className="text-xs text-zinc-500">{review.email}</p>
                  </div>
                </div>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-warm" />

      {/* ============ TRUST BADGES ============ */}
      <section className="py-16 bg-violet-950/25">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-center font-mono text-xs text-zinc-500 uppercase tracking-widest mb-8">Trusted & Recognized</p>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {[
              { name: 'ISO 27001', sub: 'Certified', icon: '&#128274;' },
              { name: 'Startup India', sub: 'Recognized', icon: '&#127470;&#127475;' },
              { name: 'Google Partner', sub: 'Certified', icon: '&#127919;' },
              { name: 'AWS', sub: 'Partner Network', icon: '&#9729;&#65039;' },
              { name: 'Meta Business', sub: 'Partner', icon: '&#128312;' },
              { name: 'MSME', sub: 'Registered', icon: '&#127981;' },
            ].map((badge, i) => (
              <ScrollReveal key={badge.name} delay={i * 80} scale={0.9}>
                <div className="flex items-center gap-3 group">
                  <span className="text-2xl grayscale group-hover:grayscale-0 transition-all duration-300" dangerouslySetInnerHTML={{ __html: badge.icon }} />
                  <div>
                    <p className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">{badge.name}</p>
                    <p className="text-[10px] text-zinc-600">{badge.sub}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider-purple" />

      {/* ============ TEAM ============ */}
      {team.length > 0 && (
        <section id="team" className="py-32 relative bg-gradient-to-b from-[#09090b] via-blue-950/15 to-[#09090b]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 right-0 w-[500px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-indigo-400 font-mono text-sm mb-4 tracking-wider uppercase">Our Team</p>
              <h2 className="section-heading">
                The people behind
                <br />
                <span className="text-gradient">the pixels.</span>
              </h2>
              <p className="section-subtext mx-auto mt-4">
                A small, focused team where everyone wears multiple hats — and every hat fits.
              </p>
            </div>
            </ScrollReveal>

            <ScrollReveal delay={150} blur={4}>
            <div className={`grid gap-5 ${
              team.length <= 4 ? 'grid-cols-2 md:grid-cols-4 max-w-3xl mx-auto' :
              team.length <= 6 ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-6' :
              'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
            }`}>
              {team.map((member) => (
                <div key={member.id} className="text-center group">
                  {member.image_url ? (
                    <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden mb-3 shadow-lg ring-2 ring-zinc-700/50 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2">
                      <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-3 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2">
                      <span className="text-white font-bold text-lg">{member.name.charAt(0)}</span>
                    </div>
                  )}
                  <h4 className="font-semibold text-white text-sm">{member.name}</h4>
                  <p className="text-zinc-500 text-xs mt-0.5">{member.role}</p>
                </div>
              ))}
            </div>

            {/* Hiring banner */}
            <div className="mt-12 glass rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">We&apos;re always looking for great people</p>
                  <p className="text-zinc-500 text-xs">Got skills? Let&apos;s talk.</p>
                </div>
              </div>
              <Link href="#contact" className="px-5 py-2.5 rounded-lg btn-gradient text-white text-sm font-medium transition-all">
                Join Us
              </Link>
            </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      <div className="section-divider" />

      {/* ============ CONTACT ============ */}
      <section id="contact" className="py-32 relative bg-gradient-to-b from-[#09090b] via-indigo-950/20 to-[#09090b]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-600/[0.06] rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <ScrollReveal>
          <div className="text-center mb-20">
            <p className="text-indigo-400 font-mono text-sm mb-4 tracking-wider uppercase">Let&apos;s Work Together</p>
            <h2 className="section-heading mb-6">
              Have a project
              <br />
              <span className="text-gradient">in mind?</span>
            </h2>
            <p className="section-subtext mx-auto">
              Whether it&apos;s a new product build, a growth campaign, or a content overhaul —
              we&apos;d love to hear about it.
            </p>
          </div>
          </ScrollReveal>

          <ScrollReveal delay={200} scale={0.96} blur={3}>
          <div className="grid md:grid-cols-5 gap-10">
            <div className="md:col-span-2 space-y-5">
              <div className="surface-card rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Email</p>
                  <a href={`mailto:${settings.contact_email}`} className="text-sm font-medium text-white hover:text-indigo-400 transition-colors">
                    {settings.contact_email}
                  </a>
                </div>
              </div>

              {socials.length > 0 && (
                <div className="surface-card rounded-xl p-5">
                  <p className="text-xs text-zinc-500 mb-3">Connect</p>
                  <div className="flex flex-wrap gap-2">
                    {socials.map((social) => (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-lg bg-zinc-800/60 border border-zinc-700/50 text-sm text-zinc-300 hover:text-white hover:border-indigo-500/40 transition-all"
                      >
                        {social.platform}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="surface-card rounded-xl p-5">
                <p className="text-xs text-zinc-500 mb-2">Response time</p>
                <p className="text-sm text-zinc-300">Usually within <span className="text-white font-medium">24 hours</span></p>
              </div>

              <div className="surface-card rounded-xl p-5">
                <p className="text-xs text-zinc-500 mb-2">I work with</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {['Startups', 'Agencies', 'D2C Brands', 'SaaS', 'Creators'].map((who) => (
                    <span key={who} className="px-2.5 py-1 rounded-md bg-white/[0.04] text-zinc-400 text-xs border border-zinc-800">
                      {who}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <form className="surface-card rounded-2xl p-6 md:p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800/60 border border-zinc-700/50 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-lg bg-zinc-800/60 border border-zinc-700/50 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">What do you need?</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-zinc-800/60 border border-zinc-700/50 text-zinc-300 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all text-sm appearance-none">
                    <option value="">Select a service</option>
                    <option value="web">Website / Web App</option>
                    <option value="marketing">Marketing Campaign</option>
                    <option value="content">Content / Video Production</option>
                    <option value="seo">SEO &amp; Organic Growth</option>
                    <option value="full">Full Digital Package</option>
                    <option value="other">Something Else</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Tell us more</label>
                  <textarea
                    rows={4}
                    placeholder="What are you building? What's the goal? Any timeline?"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800/60 border border-zinc-700/50 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all text-sm resize-none"
                  />
                </div>
                <button
                  type="button"
                  className="w-full py-3.5 rounded-xl btn-gradient text-white font-semibold transition-all duration-300"
                >
                  Send Message
                </button>
                <p className="text-xs text-zinc-600 text-center">No spam, no fluff. We&apos;ll reply within 24 hours.</p>
              </form>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <Footer brandName={settings.hero_name} email={settings.contact_email} socials={socials} />
    </div>
  );
}
