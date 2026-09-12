"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "../../context/language";

// Рақамҳои платформа ва даъвати охирин ба сабти ном
export default function StatsSection() {
  const { t } = useTranslation();

  return (
    <>
      <section className="stats-section">
        <div className="stats-panel">
          <div className="stats-intro">
            <span className="section-kicker">AGROSMART</span>
            <h2>Кишоварзии муосир бо як қадам наздиктар</h2>
          </div>
          <div className="stat">
            <strong>24/7</strong>
            <span>дастрасӣ ба платформа</span>
          </div>
          <div className="stat">
            <strong>3+</strong>
            <span>самти асосии хизматрасонӣ</span>
          </div>
          <div className="stat">
            <strong>100%</strong>
            <span>рақамӣ ва мустақим</span>
          </div>
        </div>
      </section>

      <section className="bottom-cta">
        <div>
          <span className="section-kicker">ҚАДАМИ НАВ</span>
          <h2>Ояндаи кишоварзӣ имрӯз оғоз мешавад.</h2>
          <p>Ба AgroSmart ҳамроҳ шавед ва замин, маҳсулот ва имкониятҳои навро якҷо пайдо кунед.</p>
        </div>
        <Link href="/auth" className="primary-cta">
          {t("heroConnect")}
          <ArrowRight size={18} />
        </Link>
      </section>
    </>
  );
}
