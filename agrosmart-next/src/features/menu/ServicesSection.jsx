"use client";

import Link from "next/link";
import { ArrowRight, Handshake, MapPinned, ShoppingBasket, Truck } from "lucide-react";
import { useTranslation } from "../../context/language";

// Се хизмати асосии платформа — ҳар кадом ба саҳифаи худ мебарад
export default function ServicesSection() {
  const { t } = useTranslation();

  const services = [
    {
      icon: ShoppingBasket,
      title: t("market"),
      text: "Маҳсулоти кишоварзиро мустақиман пайдо, пешниҳод ва харид кунед.",
      href: "/bozor",
      tone: "green",
    },
    {
      icon: MapPinned,
      title: t("landRent"),
      text: "Заминҳои дастрасро бинед ва барои иҷора пешниҳоди худро фиристед.",
      href: "/zamin",
      tone: "earth",
    },
    {
      icon: Handshake,
      title: t("requests"),
      text: "Бо харидорон ва ширкатҳо мустақиман ҳамкорӣ кунед.",
      href: "/mushtari",
      tone: "blue",
    },
    {
      icon: Truck,
      title: t("driversTitle"),
      text: "Ронандагони сабтшударо бо баҳо ва отзивҳояшон бинед ва зуд гап занед.",
      href: "/ronandagon",
      tone: "amber",
    },
  ];

  return (
    <section className="services-section">
      <div className="section-heading">
        <div>
          <span className="section-kicker">ЯК ПЛАТФОРМА</span>
          <h2>Ҳама чиз барои кишоварзӣ</h2>
        </div>
        <p>Аз замин то фурӯши маҳсулот — равандро дар як экосистемаи оддӣ идора кунед.</p>
      </div>

      <div className="service-grid">
        {services.map(({ icon: Icon, title, text, href, tone }) => (
          <Link className={`service-card ${tone}`} href={href} key={href}>
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
  );
}
