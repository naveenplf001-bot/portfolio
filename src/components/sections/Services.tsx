import ScrollReveal, { TiltCard } from "@/components/ScrollReveal";
import { SpotlightCard } from "@/components/AdvancedEffects";

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

export default function Services() {
  return (
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
  );
}
