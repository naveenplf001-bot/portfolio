import { ScrollProgress } from "@/components/AdvancedEffects";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Industries from "@/components/sections/Industries";
import Services from "@/components/sections/Services";
import WorkSection from "@/components/WorkSection";
import StatsBand from "@/components/sections/StatsBand";
import Skills from "@/components/sections/Skills";
import Reviews from "@/components/sections/Reviews";
import TrustBadges from "@/components/sections/TrustBadges";
import Team from "@/components/sections/Team";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import { getPortfolioData } from "@/lib/portfolio";

export default function Home() {
  // Static data import — replaces the original `/api/portfolio` fetch.
  // `getPortfolioData()` already merges in the default settings, so there's no
  // need to re-apply defaults here.
  const data = getPortfolioData();

  const settings = data.settings;
  const { projects = [], skills = [], socials = [], reviews = [], team = [] } = data;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
      <ScrollProgress />

      <Navbar settings={settings} />

      <Hero settings={settings} projects={projects} reviews={reviews} skills={skills} />

      <Industries />

      <div className="section-divider" />

      <Services />

      <div className="section-divider" />

      <WorkSection projects={projects} />

      <StatsBand projects={projects} reviews={reviews} />

      <div className="section-divider-purple" />

      <Skills skills={skills} />

      <div className="section-divider" />

      <Reviews reviews={reviews} />

      <div className="section-divider-warm" />

      <TrustBadges />

      <div className="section-divider-purple" />

      <Team team={team} />

      <div className="section-divider" />

      <Contact settings={settings} socials={socials} />

      <Footer brandName={settings.hero_name} email={settings.contact_email} socials={socials} />
    </div>
  );
}
