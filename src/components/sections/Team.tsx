import Link from "next/link";
import type { TeamMember } from "@/types";
import ScrollReveal from "@/components/ScrollReveal";

export default function Team({ team }: { team: TeamMember[] }) {
  if (team.length === 0) return null;

  return (
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
  );
}
