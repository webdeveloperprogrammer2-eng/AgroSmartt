"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "../../context/user";
import { useTranslation } from "../../context/language";
import SettingsWidget from "../../components/shared/SettingsWidget";
import BrandLogo from "../../components/shared/BrandLogo";
import { CircleUserRound, Menu, X } from "lucide-react";

export default function MenuNavbar({ onProfileClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser();
  const { t } = useTranslation();
  const pathname = usePathname();

  const links = [
    { to: "/bozor", label: t("market") },
    { to: "/zamin", label: t("landRent") },
    { to: "/doruvori", label: t("pharmacy") },
    { to: "/mushtari", label: t("requests") },
    { to: "/borkashoni", label: t("cargoNav") },
    { to: "/ronandagon", label: t("driversTitle") },
    { to: "/info", label: t("moreInfo") },
  ];

  // Чатҳо танҳо барои воридшудагон маъно дорад, бинобар ин ба рӯйхат
  // шартан ҳамроҳ мешавад — вале намуди он ҳамон нав-истиноди оддист.
  if (user) links.push({ to: "/chats", label: t("chatsTitle") });

  function handleProfileClick() {
    setMenuOpen(false);
    onProfileClick(Boolean(user));
  }

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link href="/" className="brand" onClick={() => setMenuOpen(false)} aria-label="AgroSmart">
          <BrandLogo className="brand-mark" />
          <span className="brand-name">Agro<span>Smart</span><b>.tj</b></span>
        </Link>

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={t("openMenu")}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
          {links.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className={`nav-item ${pathname === item.to ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <SettingsWidget />
          <button type="button" className="profile-btn" onClick={handleProfileClick} aria-label={t("cabinet")}>
            <CircleUserRound size={21} strokeWidth={2} />
            <span>{t("cabinet")}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
