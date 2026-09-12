"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "agrosmart-theme";

// Реҷаи захирашуда ё танзимоти системаи корбар.
// МУҲИМ: Next.js саҳифаро аввал дар СЕРВЕР месозад, дар он ҷо на `window`
// ҳаст ва на `localStorage`. Барои ҳамин ин функсия танҳо дар браузер
// (дар дохили useEffect) даъват мешавад.
function readTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

// Ин hook реҷаи торик/равшанро дар тамоми сомона идора мекунад
export function useTheme() {
  const [theme, setTheme] = useState("light");

  // Қадами 1 — ҳангоми кушода шудани саҳифа реҷаи захирашударо мегирем
  useEffect(() => {
    setTheme(readTheme());
  }, []);

  // Қадами 2 — ҳар тағйирро ҳам дар <html>, ҳам дар хотира сабт мекунем
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return { theme, toggleTheme };
}
