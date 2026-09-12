"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Leaf, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { useTranslation } from "../../context/language";

// Қисми болоии саҳифаи асосӣ — сарлавҳа, тугмаҳо ва сурати AgroSmart
export default function HeroIntro() {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />

      <div className="hero-shell">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot"><Sparkles size={14} /></span>
            AgroSmart — рақамикунонии кишоварзӣ
          </div>

          <h1>
            {t("heroTitle").split(" ").slice(0, 3).join(" ")}{" "}
            <span> технология.</span>
          </h1>

          <p className="hero-description">{t("heroDesc")}</p>

          <div className="hero-actions">
            <Link href="/bozor" className="primary-cta">
              {t("heroStart")}
              <ArrowRight size={18} />
            </Link>
            <Link href="/info" className="secondary-cta">
              {t("moreInfo")}
            </Link>
          </div>

          <div className="trust-row">
            <div className="trust-item">
              <ShieldCheck size={18} />
              <span>Платформаи боэътимод</span>
            </div>
            <div className="trust-item">
              <TrendingUp size={18} />
              <span>Бозори рақамӣ</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />

          <div className="hero-image-card">
            <div className="image-card-top">
              <span><span className="status-dot" /> AgroSmart Live</span>
              <span className="live-pill">ONLINE</span>
            </div>
            <img src="/img/AgroSmartlogo-removebg-preview.png" alt="AgroSmart" />
            <div className="image-card-bottom">
              <div>
                <strong>+24%</strong>
                <span>рушди бозор</span>
              </div>
              <div className="mini-chart">
                <span /><span /><span /><span /><span /><span /><span />
              </div>
            </div>
          </div>

          <div className="floating-card floating-card-one">
            <div className="float-icon green"><Leaf size={18} /></div>
            <div><strong>Деҳқон</strong><span>мустақиман ба бозор</span></div>
          </div>

          <div className="floating-card floating-card-two">
            <div className="float-icon blue"><BarChart3 size={18} /></div>
            <div><strong>+1,240</strong><span>истифодабарандаи фаъол</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
