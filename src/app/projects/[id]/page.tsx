import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Project } from '@/types';
import ImageCarousel from '@/components/ImageCarousel';
import ScrollReveal, { Parallax, Magnetic, TiltCard } from '@/components/ScrollReveal';
import { CursorGlow, SpotlightCard, TextReveal, ScrollProgress, ImageReveal, FloatingParticles } from '@/components/AdvancedEffects';
import Footer from '@/components/Footer';
import { getProject, getRelatedProjects, getFooterData, getAllProjectIds } from '@/lib/portfolio';

// Pre-render one static page per project for `output: 'export'`.
export function generateStaticParams() {
  return getAllProjectIds().map((id) => ({ id: String(id) }));
}

const CAT = {
  development: {
    label: 'Development', gradient: 'from-blue-600 to-indigo-600', gradientLight: 'from-blue-500 to-indigo-500',
    accent: 'text-blue-600', accentBold: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-800', badgeDark: 'bg-blue-500/15 text-blue-300 border-blue-500/25',
    tag: 'bg-blue-100 text-blue-700', tagDark: 'bg-white/10 text-white/70 border-white/10',
    heroBg: 'from-[#0a0f1f] via-[#111827] to-[#0a0f1f]',
    heroAccent: 'from-blue-500/20 to-indigo-500/20',
    metricBg: 'bg-blue-50 border-blue-200', metricValue: 'text-blue-700',
    ctaBg: 'from-blue-600 to-indigo-600',
  },
  marketing: {
    label: 'Marketing', gradient: 'from-emerald-600 to-teal-600', gradientLight: 'from-emerald-500 to-teal-500',
    accent: 'text-emerald-600', accentBold: 'text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-800', badgeDark: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    tag: 'bg-emerald-100 text-emerald-700', tagDark: 'bg-white/10 text-white/70 border-white/10',
    heroBg: 'from-[#0a1f17] via-[#0f2922] to-[#0a1f17]',
    heroAccent: 'from-emerald-500/20 to-teal-500/20',
    metricBg: 'bg-emerald-50 border-emerald-200', metricValue: 'text-emerald-700',
    ctaBg: 'from-emerald-600 to-teal-600',
  },
  content: {
    label: 'Content', gradient: 'from-purple-600 to-pink-600', gradientLight: 'from-purple-500 to-pink-500',
    accent: 'text-purple-600', accentBold: 'text-purple-700',
    badge: 'bg-purple-100 text-purple-800', badgeDark: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
    tag: 'bg-purple-100 text-purple-700', tagDark: 'bg-white/10 text-white/70 border-white/10',
    heroBg: 'from-[#1a0a2e] via-[#1f0f35] to-[#1a0a2e]',
    heroAccent: 'from-purple-500/20 to-pink-500/20',
    metricBg: 'bg-purple-50 border-purple-200', metricValue: 'text-purple-700',
    ctaBg: 'from-purple-600 to-pink-600',
  },
} as const;

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(parseInt(id));
  if (!project) notFound();

  const cat = (project.category || 'development') as keyof typeof CAT;
  const s = CAT[cat] || CAT.development;
  const related = getRelatedProjects(project.id, project.category || 'development');
  const footerData = getFooterData();

  const hasImage = project.image_url && !project.image_url.startsWith('/projects/');
  const hasVideo = !!project.video_url;
  const hasGallery = project.gallery && project.gallery.length > 0;
  const hasHighlights = project.highlights && project.highlights.length > 0;
  const hasMetrics = project.metrics && Object.keys(project.metrics).length > 0;
  const hasLongDesc = project.long_description && project.long_description.trim().length > 0;

  const allImages: string[] = [];
  if (hasImage) allImages.push(project.image_url!);
  if (hasGallery) allImages.push(...project.gallery!.filter(img => img !== project.image_url));

  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 font-sans">
      <ScrollProgress />

      {/* ===== HERO ===== */}
      <CursorGlow color={cat === 'marketing' ? 'rgba(16,185,129,0.1)' : cat === 'content' ? 'rgba(168,85,247,0.1)' : 'rgba(99,102,241,0.1)'} size={500} className={`bg-gradient-to-b ${s.heroBg} overflow-hidden`}>
        <Parallax speed={-0.1} className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br ${s.heroAccent} rounded-full blur-[120px]`} />
        </Parallax>
        <Parallax speed={0.07} className="absolute inset-0 pointer-events-none">
          <div className={`absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-gradient-to-br ${s.heroAccent} rounded-full blur-[100px] opacity-50`} />
        </Parallax>
        <FloatingParticles count={12} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        {/* Nav */}
        <nav className="sticky top-0 z-50 nav-solid">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="font-display font-bold text-lg tracking-tight text-white">Portfolio<span className="text-indigo-200">.</span></Link>
            <Link href="/#work" className="text-sm text-indigo-100 hover:text-white transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              All Projects
            </Link>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">
            <div className="animate-fade-up">
              <div className="flex items-center gap-2 mb-5">
                <Link href="/#work" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">Work</Link>
                <span className="text-zinc-700">/</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${s.badgeDark}`}>{s.label}</span>
                {project.featured && <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold border border-amber-500/25">Featured</span>}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-display font-bold tracking-tight leading-[1.1] mb-5">
                <TextReveal text={project.title} delay={200} stagger={60} />
              </h1>
              <p className="text-base md:text-lg text-zinc-400 leading-relaxed mb-8 max-w-lg">{project.description}</p>
              <div className="flex flex-wrap items-center gap-3 mb-8">
                {project.demo_url && <Magnetic strength={0.15}><a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 rounded-xl btn-gradient text-white font-semibold text-sm">Live Demo &nearr;</a></Magnetic>}
                {project.github_url && <Magnetic strength={0.15}><a href={project.github_url} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 rounded-xl bg-zinc-800 text-white font-semibold text-sm border border-zinc-700 hover:border-zinc-500 transition-all">Source Code &nearr;</a></Magnetic>}
                {hasVideo && <Magnetic strength={0.15}><a href={project.video_url!} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 text-white font-semibold text-sm border border-zinc-700 hover:border-zinc-500 transition-all"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>Watch</a></Magnetic>}
              </div>
              {project.tech_stack && project.tech_stack.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map(tag => <span key={tag} className={`px-3 py-1.5 rounded-full text-xs font-medium ${s.tagDark}`}>{tag}</span>)}
                </div>
              )}
            </div>
            <div className="animate-slide-right">
              {hasImage ? (
                <div className="relative">
                  <div className={`absolute -inset-6 bg-gradient-to-br ${s.gradientLight} rounded-3xl blur-2xl opacity-20 animate-pulse-glow`} />
                  <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/40">
                    <ImageReveal src={project.image_url!} alt={project.title} direction="left" />
                  </div>
                </div>
              ) : (
                <div className={`aspect-video rounded-2xl bg-gradient-to-br ${s.gradient} opacity-20 flex items-center justify-center`}>
                  <span className="text-[100px] font-black text-white/10">{project.title.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CursorGlow>

      {/* ===== METRICS BAND ===== */}
      {hasMetrics && (
        <section className={`relative py-14 bg-gradient-to-r ${s.gradient} overflow-hidden`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.08),transparent_50%)]" />
          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Object.entries(project.metrics!).map(([label, value], i) => (
                <ScrollReveal key={label} delay={i * 100} scale={0.9}>
                  <div className="text-center">
                    <div className="text-3xl md:text-5xl font-display font-bold text-white">{value}</div>
                    <div className="text-sm text-white/70 mt-2 font-medium">{label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== VIDEO ===== */}
      {hasVideo && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal><SectionLabel gradient={s.gradient}>Project Demo</SectionLabel></ScrollReveal>
            <ScrollReveal delay={150} scale={0.96} blur={4}>
              <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5">
                <video src={project.video_url!} controls className="w-full aspect-video bg-slate-900" poster={hasImage ? project.image_url! : undefined} />
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ===== OVERVIEW ===== */}
      {hasLongDesc && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <ScrollReveal><SectionLabel gradient={s.gradient}>Overview</SectionLabel></ScrollReveal>
                <ScrollReveal delay={100}>
                  <div className="text-slate-600 leading-[1.9] space-y-5 text-base">
                    {project.long_description!.split('\n').filter(Boolean).map((para, i) => <p key={i}>{para}</p>)}
                  </div>
                </ScrollReveal>
              </div>
              <div className="space-y-5">
                <ScrollReveal direction="right" delay={200}>
                  <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Project Info</h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs text-slate-400 uppercase tracking-wider">Category</span>
                        <div className="mt-1"><span className={`px-3 py-1 rounded-full text-xs font-semibold border ${s.badge}`}>{s.label}</span></div>
                      </div>
                      {project.tech_stack && project.tech_stack.length > 0 && (
                        <div>
                          <span className="text-xs text-slate-400 uppercase tracking-wider">Tech Stack</span>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {project.tech_stack.map(tag => <span key={tag} className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${s.tag}`}>{tag}</span>)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
                {(project.demo_url || project.github_url || project.video_url) && (
                  <ScrollReveal direction="right" delay={300}>
                    <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-sm">
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Links</h3>
                      <div className="space-y-3">
                        {project.demo_url && <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-sm ${s.accent} hover:opacity-80 transition-all`}><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>Live Demo</a>}
                        {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>Source Code</a>}
                        {project.video_url && <a href={project.video_url} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 text-sm ${s.accent} hover:opacity-80 transition-all`}><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>Watch Video</a>}
                      </div>
                    </div>
                  </ScrollReveal>
                )}
                <ScrollReveal direction="right" delay={400} scale={0.95}>
                  <div className={`rounded-2xl p-6 bg-gradient-to-br ${s.ctaBg} relative overflow-hidden shadow-lg`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
                    <div className="relative z-10">
                      <h3 className="font-display font-bold text-white text-lg mb-2">Need something similar?</h3>
                      <p className="text-white/70 text-sm mb-4">Let&apos;s build it together.</p>
                      <Magnetic strength={0.2}><Link href="/#contact" className="inline-block px-5 py-2.5 rounded-lg bg-white text-slate-900 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">Get in Touch</Link></Magnetic>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== HIGHLIGHTS ===== */}
      {hasHighlights && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal><SectionLabel gradient={s.gradient}>What Was Delivered</SectionLabel></ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.highlights!.map((h, i) => (
                <ScrollReveal key={i} delay={i * 80} scale={0.93} blur={3}>
                  <SpotlightCard className="group flex gap-4 items-start rounded-xl p-5 bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${s.gradient} flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md`}>
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{h}</p>
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== GALLERY ===== */}
      {allImages.length > 1 && (
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal><SectionLabel gradient={s.gradient}>Screenshots</SectionLabel></ScrollReveal>
            <ScrollReveal delay={150} scale={0.97} blur={4}>
              <ImageCarousel images={allImages} title={project.title} />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ===== RELATED ===== */}
      {related.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal><h2 className="text-xl font-display font-bold mb-6 text-slate-900">More {s.label} Projects</h2></ScrollReveal>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((rp, rIdx) => {
                const rs = CAT[(rp.category || 'development') as keyof typeof CAT] || CAT.development;
                const rpHasImage = rp.image_url && !rp.image_url.startsWith('/projects/');
                return (
                  <ScrollReveal key={rp.id} delay={rIdx * 120} scale={0.93} blur={4}>
                    <TiltCard intensity={6}>
                      <Link href={`/projects/${rp.id}`} className="block group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <div className={`h-32 bg-gradient-to-br ${rs.gradient} relative overflow-hidden`}>
                          {rpHasImage ? <img src={rp.image_url!} alt={rp.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" /> : <div className="flex items-center justify-center h-full"><span className="text-5xl font-black text-white/20">{rp.title.charAt(0)}</span></div>}
                        </div>
                        <div className="p-4">
                          <h3 className="font-display font-semibold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">{rp.title}</h3>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">{rp.description}</p>
                        </div>
                      </Link>
                    </TiltCard>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Transition + Footer in dark wrapper so colors match homepage exactly */}
      <div className="bg-[#09090b] text-zinc-100">
        <div className="h-2 bg-gradient-to-b from-slate-50 to-[#09090b]" />
        <Footer brandName={footerData.brandName} email={footerData.email} socials={footerData.socials} />
      </div>
    </div>
  );
}

function SectionLabel({ children, gradient }: { children: string; gradient: string }) {
  return (
    <h2 className="flex items-center gap-3 text-xl font-display font-bold mb-6 text-slate-900">
      <span className={`w-1.5 h-6 rounded-full bg-gradient-to-b ${gradient}`} />
      {children}
    </h2>
  );
}
