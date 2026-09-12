"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { translations } from "../locales/translations";
import { LanguageContext } from "./language";

const STORAGE_KEY = "agrosmart-lang";
const SUPPORTED = ["tj", "ru", "en"];
const DEFAULT_LANGUAGE = "tj";

// Кодҳои HTML lang — "tj" коди дурусти забон нест, барои тоҷикӣ "tg" аст
const HTML_LANG = { tj: "tg", ru: "ru", en: "en" };

export function LanguageProvider({ children }) {
  // Дар сервери Next.js `localStorage` нест, бинобар ин ҳамеша аз забони
  // тоҷикӣ сар мекунем ва забони захирашударо дар браузер мегирем.
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED.includes(saved)) setLanguageState(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.setAttribute("lang", HTML_LANG[language] || language);
  }, [language]);

  // Забони номаълумро қабул намекунем, то тарҷумаҳо вайрон нашаванд
  const setLanguage = useCallback((next) => {
    setLanguageState(SUPPORTED.includes(next) ? next : DEFAULT_LANGUAGE);
  }, []);

  // Тарҷума: агар калид дар забони ҷорӣ набошад, ба тоҷикӣ бармегардем
  const t = useCallback(
    (key) => {
      const section = translations[language] || translations[DEFAULT_LANGUAGE];
      if (section[key] !== undefined) return section[key];

      const fallback = translations[DEFAULT_LANGUAGE][key];
      if (fallback !== undefined) return fallback;

      if (process.env.NODE_ENV === "development") {
        console.warn(`[i18n] Калиди тарҷума ёфт нашуд: "${key}"`);
      }
      return key;
    },
    [language]
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
