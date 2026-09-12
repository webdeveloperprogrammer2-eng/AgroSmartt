import { useEffect, useState } from "react";
import { usersApi } from "../api/usersApi";
import { UserContext } from "./user";

const SESSION_KEY = "agroSessionId";

function normalizeRole(role) {
  return String(role || "").trim().toLowerCase();
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedId = sessionStorage.getItem(SESSION_KEY);
    if (!savedId) {
      setLoading(false);
      return;
    }
    usersApi
      .getById(savedId)
      .then(setUser)
      .catch(() => sessionStorage.removeItem(SESSION_KEY))
      .finally(() => setLoading(false));
  }, []);

  function saveSession(u) {
    setUser(u);
    sessionStorage.setItem(SESSION_KEY, u.id);
  }

  async function registerUser(formData) {
    const phone = String(formData.userPhone || "").trim();
    const exists = await usersApi.findByPhone(phone);
    if (exists) {
      throw new Error("authErrorPhoneExists");
    }
    const created = await usersApi.create({
      ...formData,
      userPhone: phone,
      role: "user",
      accountType: formData.accountType || "buyer",
    });
    saveSession(created);
    return created;
  }

  async function loginUser(phone, password) {
    const candidates = await usersApi.findAllByPhone(phone);
    const found = candidates.find((u) => u.password === password);
    if (!found) {
      throw new Error("authErrorWrongCredentials");
    }
    saveSession(found);
    return found;
  }

  async function loginAdmin(phone, password, expectedRole) {
    const candidates = await usersApi.findAllByPhone(phone);
    const wanted = normalizeRole(expectedRole);

    if (candidates.length === 0) {
      throw new Error("authErrorWrongCredentials");
    }

    const sameRole = candidates.filter((u) => normalizeRole(u.role) === wanted);
    if (sameRole.length === 0) {
      throw new Error("authErrorNotThisRole");
    }

    const matched = sameRole.find((u) => u.password === password);
    if (!matched) {
      throw new Error("authErrorWrongCredentials");
    }

    saveSession(matched);
    return matched;
  }

  function logout() {
    setUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  }

  const role = normalizeRole(user?.role);
  const isSuperAdmin = role === "superadmin";
  const isAdmin = role === "admin" || isSuperAdmin;

  const value = { user, setUser, loading, registerUser, loginUser, loginAdmin, logout, isAdmin, isSuperAdmin };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
