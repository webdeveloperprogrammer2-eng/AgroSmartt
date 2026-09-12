import { createContext, useContext } from "react";

export const LanguageContext = createContext(null);

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation бояд дар дохили LanguageProvider истифода шавад");
  }
  return ctx;
}
