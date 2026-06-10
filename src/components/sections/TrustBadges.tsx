import ScrollReveal from "@/components/ScrollReveal";

export default function TrustBadges() {
  return (
    <section className="py-16 bg-violet-950/25">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-center font-mono text-xs text-zinc-500 uppercase tracking-widest mb-8">Trusted &amp; Recognized</p>
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
  );
}
