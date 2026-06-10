import Link from "next/link";

export default function Navbar({ settings }: { settings: Record<string, string> }) {
  return (
    <nav className="fixed top-0 w-full z-50 nav-solid">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" aria-label={`${settings.hero_name || 'Vision Grid'} — home`} className="flex items-center">
          <span className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/15 bg-white/5 flex items-center justify-center transition-transform duration-200 hover:scale-105">
            <img
              src="/logo-mark.png"
              alt={settings.hero_name || 'Vision Grid'}
              className="w-full h-full object-cover scale-110"
            />
          </span>
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
  );
}
