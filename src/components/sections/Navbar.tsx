import Link from "next/link";

export default function Navbar({ settings }: { settings: Record<string, string> }) {
  return (
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
  );
}
