import type { Skill } from "@/types";
import ScrollReveal from "@/components/ScrollReveal";

export default function Skills({ skills }: { skills: Skill[] }) {
  const skillCategories = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section id="skills" className="py-28 relative overflow-hidden bg-gradient-to-b from-[#09090b] via-purple-950/20 to-[#09090b]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-indigo-600/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <ScrollReveal>
        <div className="text-center mb-14 px-6">
          <p className="text-indigo-400 font-mono text-sm mb-4 tracking-wider uppercase">Toolkit</p>
          <h2 className="section-heading">
            Technologies we
            <span className="text-gradient"> swear by.</span>
          </h2>
        </div>
        </ScrollReveal>

        <div className="space-y-4">
          {Object.entries(skillCategories).map(([category, catSkills], idx) => {
            const direction = idx % 2 === 0 ? 'scroll-left' : 'scroll-right';
            const speed = idx === 0 ? '60s' : idx === 1 ? '70s' : '50s';
            const doubled = [...catSkills, ...catSkills];

            return (
              <div key={category} className="relative">
                <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[var(--background)] to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[var(--background)] to-transparent z-10" />

                <div className={`flex gap-3 ${direction}`} style={{ animationDuration: speed }}>
                  {doubled.map((skill, i) => (
                    <div
                      key={`${skill.id}-${i}`}
                      className="flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-full bg-zinc-800/40 border border-zinc-700/30 hover:border-zinc-600/50 hover:bg-zinc-800/70 transition-all duration-200 cursor-default group"
                    >
                      <div className={`w-7 h-7 rounded-lg ${skill.color} flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}>
                        <span className="text-white font-bold text-[9px]">{skill.icon || skill.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium text-sm text-zinc-400 group-hover:text-white transition-colors whitespace-nowrap">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-8 mt-10 px-6">
          {Object.entries(skillCategories).map(([category, catSkills]) => {
            const color = category.includes('Marketing') ? 'bg-emerald-400' : category.includes('Content') ? 'bg-purple-400' : 'bg-blue-400';
            return (
              <div key={category} className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-xs text-zinc-500">{category} ({catSkills.length})</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
