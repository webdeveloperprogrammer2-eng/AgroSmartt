"use client";

import { useTranslation } from "../../context/language";

export function InfoTelegramCTA() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">{t("infoTgCtaTitle")}</h3>
        <p className="text-slate-400 max-w-xl mx-auto mb-6 text-sm">
          {t("infoTgCtaDesc")}
        </p>
        <a
          href="https://t.me/AgroSmartDarkhostbot"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center space-x-2 bg-[#229ED9] hover:bg-[#1e8ec4] text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-lg"
        >
          <i className="fa-brands fa-telegram text-xl"></i>
          <span>{t("infoTgCtaBtn")}</span>
        </a>
      </div>
    </div>
  );
}

export function InfoFooter() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-500 text-sm py-8 text-center border-t border-slate-800">
      <p>{t("infoFooterCopyright")}</p>
    </footer>
  );
}
