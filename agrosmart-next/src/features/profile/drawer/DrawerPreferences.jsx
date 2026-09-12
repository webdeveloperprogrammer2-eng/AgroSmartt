"use client";

import { Bell, Globe, Moon, Sun } from "lucide-react";
import { useTheme } from "../../../hooks/useTheme";
import { useTranslation } from "../../../context/language";

const LANGS = [
  { code: "tj", flag: "🇹🇯", name: "Тоҷикӣ" },
  { code: "ru", flag: "🇷🇺", name: "Русский" },
  { code: "en", flag: "🇬🇧", name: "English" },
];

// Афзалиятҳо: мавзӯъ, забон, хабарномаҳо.
// Ҳар тағйир фавран ба /settings/preferences меравад, то дар
// дастгоҳи дигар низ ҳамин танзимот бошад.
export default function DrawerPreferences({ notifications, onSave }) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useTranslation();

  function changeTheme() {
    const next = theme === "dark" ? "light" : "dark";
    toggleTheme();
    onSave({ theme: next });
  }

  function changeLanguage(code) {
    setLanguage(code);
    onSave({ language: code });
  }

  return (
    <div className="dw-group">
      <h4 className="dw-group-title">{t("settings")}</h4>

      <div className="dw-row">
        <span className="dw-row-label">
          {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
          {t("theme")}
        </span>
        <button
          type="button"
          className={`dw-switch ${theme === "dark" ? "is-on" : ""}`}
          onClick={changeTheme}
          aria-label={t("theme")}
        >
          <span />
        </button>
      </div>

      <div className="dw-row">
        <span className="dw-row-label">
          <Bell size={16} />
          {t("notifications")}
        </span>
        <button
          type="button"
          className={`dw-switch ${notifications ? "is-on" : ""}`}
          onClick={() => onSave({ notifications: !notifications })}
          aria-label={t("notifications")}
        >
          <span />
        </button>
      </div>

      <div className="dw-langs">
        <span className="dw-row-label">
          <Globe size={16} />
          {t("language")}
        </span>
        <div className="dw-lang-grid">
          {LANGS.map((item) => (
            <button
              key={item.code}
              type="button"
              className={`dw-lang ${language === item.code ? "is-active" : ""}`}
              onClick={() => changeLanguage(item.code)}
            >
              <span>{item.flag}</span>
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
