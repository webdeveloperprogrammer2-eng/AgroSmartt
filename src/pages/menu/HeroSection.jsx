import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Handshake,
  Leaf,
  MapPinned,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  TrendingUp,
  Truck,
} from "lucide-react";
import { useTranslation } from "../../context/language";

export default function HeroSection() {
  const { t } = useTranslation();

  const services = [
    {
      icon: ShoppingBasket,
      title: t("market"),
      text: "Маҳсулоти кишоварзиро мустақиман пайдо, пешниҳод ва харид кунед.",
      to: "/bozor",
      tone: "green",
    },
    {
      icon: MapPinned,
      title: t("landRent"),
      text: "Заминҳои дастрасро бинед ва барои иҷора пешниҳоди худро фиристед.",
      to: "/zamin",
      tone: "earth",
    },
    {
      icon: Handshake,
      title: t("requests"),
      text: "Бо харидорон ва ширкатҳо мустақиман ҳамкорӣ кунед.",
      to: "/mushtari",
      tone: "blue",
    },
    {
      icon: Truck,
      title: t("driversTitle"),
      text: "Ронандагони сабтшударо бо баҳо ва отзивҳояшон бинед ва зуд гап занед.",
      to: "/ronandagon",
      tone: "amber",
    },
  ];

  return (
    <main className="home-main">
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
              <Link to="/bozor" className="primary-cta">
                {t("heroStart")}
                <ArrowRight size={18} />
              </Link>
              <Link to="/info" className="secondary-cta">
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

      <section className="services-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">ЯК ПЛАТФОРМА</span>
            <h2>Ҳама чиз барои кишоварзӣ</h2>
          </div>
          <p>Аз замин то фурӯши маҳсулот — равандро дар як экосистемаи оддӣ идора кунед.</p>
        </div>

        <div className="service-grid">
          {services.map(({ icon: Icon, title, text, to, tone }) => (
            <Link className={`service-card ${tone}`} to={to} key={to}>
              <div className="service-icon"><Icon size={23} /></div>
              <div className="service-content">
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="service-link">{t("moreInfo")} <ArrowRight size={16} /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

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
        <Link to="/auth" className="primary-cta">
          {t("heroConnect")}
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
