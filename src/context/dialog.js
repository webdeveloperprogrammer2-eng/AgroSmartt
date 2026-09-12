import { createContext, useContext } from "react";

export const DialogContext = createContext(null);

export function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog бояд дар дохили DialogProvider истифода шавад");
  return ctx;
}
