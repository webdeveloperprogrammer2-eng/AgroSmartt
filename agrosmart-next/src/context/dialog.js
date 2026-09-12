"use client";

import { createContext, useContext } from "react";

export const DialogContext = createContext(null);

// Ягона роҳи нишон додани хабар ва пурсиш дар тамоми сайт.
//
//   const dialog = useDialog();
//   dialog.success("Маҳсулот илова шуд");
//   dialog.error(t("error"));
//   if (await dialog.confirm({ title: "Нест кунем?" })) { ... }
//
// alert() / confirm()-и браузер дигар ҳеҷ ҷо истифода намешавад.
export function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog бояд дар дохили DialogProvider истифода шавад");
  return ctx;
}
