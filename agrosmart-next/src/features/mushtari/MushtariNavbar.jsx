"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "../../context/language";
import SettingsWidget from "../../components/shared/SettingsWidget";

// Навбар ва пардаи (drawer) саҳифаи дархостҳо
export default function MushtariNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useTranslation();

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <nav className="main-navbar">
        <div className="nav-logo">AgroSmart Dashboard</div>
        <div className="nav-actions-group">
          <Link href="/" className="nav-btn-link desktop-nav-links">
            🏠 {t("home")}
          </Link>
          <SettingsWidget />
          {/* Тугмаи кабинет ҳамеша дар охири навбар меистад */}
          <Link href="/profile" className="nav-btn-link desktop-nav-links">
            👤 {t("cabinet")}
          </Link>
          <button
            type="button"
            className="mobile-menu-hamburger"
            onClick={() => setDrawerOpen(true)}
            aria-label={t("openMenu")}
          >
            ☰
          </button>
        </div>
      </nav>

      <div
        className={`sidebar-overlay ${drawerOpen ? "active" : ""}`}
        onClick={closeDrawer}
        aria-hidden="true"
      ></div>
      <div className={`right-drawer ${drawerOpen ? "active" : ""}`}>
        <button
          type="button"
          className="close-drawer-btn"
          onClick={closeDrawer}
          aria-label={t("cancel")}
        >
          ✕
        </button>
        <div className="divider"></div>
        <nav className="drawer-menu">
          {/* Баъди гузаштан ба саҳифаи нав парда худаш пӯшида шавад */}
          <Link href="/" className="menu-item" onClick={closeDrawer}>
            🏠 {t("home")}
          </Link>
          <Link href="/profile" className="menu-item" onClick={closeDrawer}>
            👤 {t("cabinet")}
          </Link>
          <Link href="/bozor" className="menu-item" onClick={closeDrawer}>
            🛒 {t("market")}
          </Link>
        </nav>
      </div>
    </>
  );
}
