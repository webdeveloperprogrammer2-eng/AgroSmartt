import { useCallback, useEffect, useMemo, useState } from "react";
import { translations } from "../locales/translations";
import { LanguageContext } from "./language";

const STORAGE_KEY = "agrosmart-lang";
const SUPPORTED = ["tj", "ru", "en"];
const DEFAULT_LANGUAGE = "tj";

const HTML_LANG = { tj: "tg", ru: "ru", en: "en" };

function getInitialLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return SUPPORTED.includes(saved) ? saved : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.setAttribute("lang", HTML_LANG[language] || language);
  }, [language]);

  const setLanguage = useCallback((next) => {
    setLanguageState(SUPPORTED.includes(next) ? next : DEFAULT_LANGUAGE);
  }, []);

  const t = useCallback(
    (key) => {
      const section = translations[language] || translations[DEFAULT_LANGUAGE];
      if (section[key] !== undefined) return section[key];

      const fallback = translations[DEFAULT_LANGUAGE][key];
      if (fallback !== undefined) return fallback;

      if (import.meta.env.DEV) {
        console.warn(`[i18n] Калиди тарҷума ёфт нашуд: "${key}"`);
      }
      return key;
    },
    [language]
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
