// Auto-scrolling marquee of industries served. Static content, no props.
export default function Industries() {
  return (
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
  );
}
