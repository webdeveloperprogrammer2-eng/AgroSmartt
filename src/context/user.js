import { createContext, useContext } from "react";

export const UserContext = createContext(null);

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser бояд дар дохили UserProvider истифода шавад");
  return ctx;
}
