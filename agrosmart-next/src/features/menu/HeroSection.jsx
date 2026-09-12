"use client";

import HeroIntro from "./HeroIntro";
import ServicesSection from "./ServicesSection";
import StatsSection from "./StatsSection";

// Мазмуни саҳифаи асосӣ аз се блоки алоҳида ҷамъ мешавад
export default function HeroSection() {
  return (
    <main className="home-main">
      <HeroIntro />
      <ServicesSection />
      <StatsSection />
    </main>
  );
}
