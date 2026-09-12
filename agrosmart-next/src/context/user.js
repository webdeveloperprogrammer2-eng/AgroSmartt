"use client";

import { createContext, useContext } from "react";

// Худи контекст ва hook аз файли провайдер ҷудо нигоҳ дошта мешаванд,
// то файли .jsx танҳо компонент содир кунад ва Fast Refresh дуруст кор кунад.
export const UserContext = createContext(null);

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser бояд дар дохили UserProvider истифода шавад");
  return ctx;
}
