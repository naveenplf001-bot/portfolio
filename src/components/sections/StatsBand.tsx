import type { Project, Review } from "@/types";
import ScrollReveal from "@/components/ScrollReveal";
import { AnimatedCounter } from "@/components/ScrollReveal";

interface StatsBandProps {
  projects: Project[];
  reviews: Review[];
}

export default function StatsBand({ projects, reviews }: StatsBandProps) {
  // Honest counts derived straight from the data. (Previously these were
  // inflated by arbitrary multipliers — projects.length * 5, reviews.length * 4 —
  // which advertised numbers the portfolio can't back up.)
  const stats = [
    { value: projects.length, suffix: '+', label: 'Projects Delivered' },
    { value: reviews.length, suffix: '+', label: 'Happy Clients' },
    { value: 3, suffix: '+', label: 'Years Experience' },
    { value: 99, suffix: '%', label: 'Client Satisfaction' },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.06),transparent_50%)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <ScrollReveal key={stat.label} scale={0.9}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2200} />
                </div>
                <div className="text-sm text-white/70 font-medium">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
