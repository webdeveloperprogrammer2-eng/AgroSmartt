"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useTranslation } from "../../context/language";
import { Settings, Sun, Moon, Check, Globe } from "lucide-react";

export default function SettingsWidget() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useTranslation();
  const containerRef = useRef(null);

  // Close panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="settings-widget-container" ref={containerRef}>
      {/* Floating Button */}
      <button
        type="button"
        className={`settings-floating-btn ${open ? "active" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={t("settings")}
      >
        <Settings className="settings-icon-spin" size={20} />
      </button>

      {/* Settings Panel */}
      {open && (
        <div className="settings-panel-card as-animate-in">
          <div className="settings-panel-header">
            <h4>{t("settings")}</h4>
          </div>

          <div className="settings-panel-body">
            {/* Theme Row */}
            <div className="settings-panel-row">
              <span className="row-label">
                {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
                {t("theme")}
              </span>
              <button
                type="button"
                className={`theme-switch-toggle ${theme === "dark" ? "is-dark" : "is-light"}`}
                onClick={toggleTheme}
              >
                <span className="toggle-handle"></span>
              </button>
            </div>

            <hr className="settings-divider" />

            {/* Language Selection */}
            <div className="settings-panel-section">
              <span className="section-label">
                <Globe size={18} />
                {t("language")}
              </span>
              <div className="lang-options-grid">
                <button
                  type="button"
                  className={`lang-option-btn ${language === "tj" ? "active" : ""}`}
                  onClick={() => {
                    setLanguage("tj");
                    setOpen(false);
                  }}
                >
                  <span className="flag-emoji">🇹🇯</span>
                  <span className="lang-name">Тоҷикӣ</span>
                  {language === "tj" && <Check size={14} className="check-indicator" />}
                </button>

                <button
                  type="button"
                  className={`lang-option-btn ${language === "ru" ? "active" : ""}`}
                  onClick={() => {
                    setLanguage("ru");
                    setOpen(false);
                  }}
                >
                  <span className="flag-emoji">🇷🇺</span>
                  <span className="lang-name">Русский</span>
                  {language === "ru" && <Check size={14} className="check-indicator" />}
                </button>

                <button
                  type="button"
                  className={`lang-option-btn ${language === "en" ? "active" : ""}`}
                  onClick={() => {
                    setLanguage("en");
                    setOpen(false);
                  }}
                >
                  <span className="flag-emoji">🇬🇧</span>
                  <span className="lang-name">English</span>
                  {language === "en" && <Check size={14} className="check-indicator" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
