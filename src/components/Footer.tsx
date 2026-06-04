import Link from 'next/link';
import type { SocialLink } from '@/types';
import { Magnetic } from '@/components/ScrollReveal';

interface FooterProps {
  brandName?: string;
  email?: string;
  socials?: SocialLink[];
}

export default function Footer({ brandName = 'Portfolio', email = '', socials = [] }: FooterProps) {
  const firstName = brandName.split(' ')[0];

  return (
    <footer className="relative bg-gradient-to-b from-[#09090b] via-indigo-950/30 to-indigo-950/50 pt-20 pb-8 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/[0.06] rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* CTA banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-12 mb-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">Ready to start your project?</h3>
              <p className="text-white/70 text-sm md:text-base">Let&apos;s turn your idea into something real. No commitment, just a conversation.</p>
            </div>
            <Magnetic strength={0.15}>
              <Link href="/#contact" className="inline-block px-8 py-4 rounded-xl bg-white text-indigo-700 font-display font-bold text-sm hover:bg-indigo-50 transition-all shadow-lg flex-shrink-0">
                Get in Touch
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display font-bold text-xl text-white">
              {firstName}<span className="text-indigo-400">.</span>
            </Link>
            <p className="text-zinc-500 text-sm mt-3 leading-relaxed max-w-xs">
              A team of 6 building products, running campaigns, and creating content that drives real results.
            </p>
            {socials.length > 0 && (
              <div className="flex gap-3 mt-5">
                {socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-zinc-800/60 border border-zinc-700/40 flex items-center justify-center text-zinc-400 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-200 text-xs font-bold"
                  >
                    {social.platform.charAt(0)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Services</h4>
            <ul className="space-y-2.5">
              {['Web Development', 'Mobile Apps', 'UI/UX Design', 'Digital Marketing', 'SEO & Growth', 'Content Creation'].map(s => (
                <li key={s}><Link href="/#services" className="text-zinc-500 hover:text-white text-sm transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Our Work', href: '/#work' },
                { label: 'Team', href: '/#team' },
                { label: 'Reviews', href: '/#reviews' },
                { label: 'Contact', href: '/#contact' },
              ].map(item => (
                <li key={item.label}><Link href={item.href} className="text-zinc-500 hover:text-white text-sm transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              {email && (
                <li className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <a href={`mailto:${email}`} className="text-zinc-500 hover:text-white text-sm transition-colors break-all">{email}</a>
                </li>
              )}
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-zinc-500 text-sm">Reply within 24 hours</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-zinc-500 text-sm">Remote — Worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-800/60 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-xs">
            &copy; {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service'].map(item => (
              <span key={item} className="text-zinc-600 hover:text-zinc-400 text-xs cursor-pointer transition-colors">{item}</span>
            ))}
          </div>
          <Link href="#" className="text-zinc-600 hover:text-indigo-400 text-xs transition-colors flex items-center gap-1">
            Back to top
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
