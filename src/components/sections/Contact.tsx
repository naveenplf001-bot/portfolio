import type { SocialLink } from "@/types";
import ScrollReveal from "@/components/ScrollReveal";

interface ContactProps {
  settings: Record<string, string>;
  socials: SocialLink[];
}

export default function Contact({ settings, socials }: ContactProps) {
  return (
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
            {/*
              Netlify Forms: a native POST form (no JS, no backend). Netlify's
              build bot detects it in the exported static HTML via the
              `data-netlify` attribute and the hidden `form-name` field, then
              captures submissions under the "contact" form in the dashboard.
            */}
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              action="/?submitted=true"
              className="surface-card rounded-2xl p-6 md:p-8 space-y-5"
            >
              {/* Required so Netlify can associate the POST with this form. */}
              <input type="hidden" name="form-name" value="contact" />
              {/* Honeypot: hidden from humans, catches spam bots that fill every field. */}
              <p className="hidden">
                <label>Don&apos;t fill this out if you&apos;re human: <input name="bot-field" /></label>
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800/60 border border-zinc-700/50 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800/60 border border-zinc-700/50 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-service" className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">What do you need?</label>
                <select id="contact-service" name="service" className="w-full px-4 py-3 rounded-lg bg-zinc-800/60 border border-zinc-700/50 text-zinc-300 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all text-sm appearance-none">
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
                <label htmlFor="contact-message" className="block text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider">Tell us more</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="What are you building? What's the goal? Any timeline?"
                  className="w-full px-4 py-3 rounded-lg bg-zinc-800/60 border border-zinc-700/50 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all text-sm resize-none"
                />
              </div>
              <button
                type="submit"
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
  );
}
