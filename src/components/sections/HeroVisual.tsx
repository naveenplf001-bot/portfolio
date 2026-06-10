// Right-column "visual story" of the hero: Your Idea -> We Build -> We Grow ->
// Your Results. Pure presentational markup, extracted from the hero to keep
// Hero.tsx focused on layout and the data-driven left column.
export default function HeroVisual() {
  return (
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
  );
}
