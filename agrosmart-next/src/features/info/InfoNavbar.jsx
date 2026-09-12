"use client";

import Link from "next/link";
import SettingsWidget from "../../components/shared/SettingsWidget";
import BrandLogo from "../../components/shared/BrandLogo";
import { useTranslation } from "../../context/language";

export default function InfoNavbar() {
  const { t } = useTranslation();

  return (
    <nav className="info-navbar fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50 px-6 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2 select-none">
          <BrandLogo className="h-10 w-10" />
          <span className="font-bold text-slate-900 tracking-tight text-xl">AgroSmart</span>
        </div>

        <div className="flex items-center gap-3">
          <SettingsWidget />
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 py-2 rounded-xl text-sm transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <i className="fa-solid fa-house"></i>
            <span>{t("backToMenu")}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
