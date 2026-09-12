"use client";

import { useEffect, useState } from "react";
import { usersApi } from "../api/usersApi";
import { UserContext } from "./user";

// Дар sessionStorage фақат ID нигоҳ дошта мешавад, на маълумоти корбар
const SESSION_KEY = "agroSessionId";

// Дар база нақш метавонад бо ҳарфҳои гуногун навишта шавад —
// "SuperAdmin", "superadmin", "SUPERADMIN". Ҳамаашро якхела мекунем,
// вагарна муқоиса ҳеҷ гоҳ рост намебарояд ва админ дохил шуда наметавонад.
function normalizeRole(role) {
  return String(role || "").trim().toLowerCase();
}

// Провайдери марказии корбар — ҳамаи маълумот дар json-server (/users) нигоҳ дошта мешавад
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ҳангоми боркунии сайт — агар сессия монда бошад, корбарро аз сервер мегирем
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

  // Сабти корбари нав (форма пурра: ном, рақам, шаҳр, синну сол, парол).
  // Аввал тафтиш мекунем, ки бо ин рақам корбар аллакай нест — вагарна
  // ду ҳисоб бо як рақам пайдо мешуд ва ҳангоми вуруд ҳамеша аввалинаш меомад.
  // Хатогиҳо ҳамчун КАЛИДИ ТАРҶУМА партофта мешаванд — формаҳо онҳоро
  // тавассути t() ба забони ҷорӣ табдил медиҳанд (провайдери забон дар
  // ин ҷо дастрас нест, бинобар ин матни тайёр партофта намешавад).
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
      // Навъи ҳисоб (харидор/фурӯшанда/ронанда) ҷудо аз `role` нигоҳ дошта мешавад:
      // `role` танҳо барои ҳуқуқи админ аст, ин бошад — барои кори корбар дар сайт.
      accountType: formData.accountType || "buyer",
    });
    saveSession(created);
    return created;
  }

  // Воридшавии оддии корбар (Sign in).
  // Аз ҳамаи ҳисобҳои ин рақам ҳамонашро мегирем, ки паролаш мувофиқ аст.
  async function loginUser(phone, password) {
    const candidates = await usersApi.findAllByPhone(phone);
    const found = candidates.find((u) => u.password === password);
    if (!found) {
      throw new Error("authErrorWrongCredentials");
    }
    saveSession(found);
    return found;
  }

  // Воридшавии Admin/SuperAdmin — нақш бояд бо тугмаи интихобшуда мувофиқ бошад
  async function loginAdmin(phone, password, expectedRole) {
    const candidates = await usersApi.findAllByPhone(phone);
    const wanted = normalizeRole(expectedRole);

    // Агар бо ин рақам умуман ҳисоб набошад, ин хатои "ҳуқуқ надорад" нест —
    // рақам ё парол нодуруст аст. Пештар дар ин ҳолат паёми гумроҳкунандаи
    // "Admin/SuperAdmin-ро санҷед" мебаромад.
    if (candidates.length === 0) {
      throw new Error("authErrorWrongCredentials");
    }

    // АВВАЛ бо нақш ҷудо мекунем, БАЪД паролро месанҷем.
    // Як рақам метавонад якчанд ҳисоб дошта бошад (масалан SuperAdmin ва
    // корбари оддӣ бо ҳамон рақам). Агар аввал бо парол ҷустуҷӯ кунем,
    // ҳисоби нодуруст ёфт мешавад ва хатои дурӯғи "ҳуқуқ надорад" мебарояд.
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

  // setUser барои танзимот лозим аст: баъд аз /settings/profile маълумоти
  // нав фавран дар навбар ва парда нишон дода мешавад, бе аз нав вуруд кардан.
  const value = { user, setUser, loading, registerUser, loginUser, loginAdmin, logout, isAdmin, isSuperAdmin };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
