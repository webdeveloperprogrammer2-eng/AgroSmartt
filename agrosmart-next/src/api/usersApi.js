import { BASE_URL } from "./config";
import { createResourceClient } from "./httpClient";

// Корбарон — http://localhost:8000/users
const base = createResourceClient("users");

export const usersApi = {
  ...base,

  // ҲАМАИ корбарони бо ин рақами телефон.
  // Дар база як рақам метавонад ба якчанд ҳисоб тааллуқ дошта бошад
  // (масалан SuperAdmin ва корбари оддӣ), барои ҳамин рӯйхати пурра
  // бармегардонем — вагарна фақат аввалинаш ёфт мешуд ва боқимонда
  // ҳеҷ гоҳ ворид шуда наметавонистанд.
  async findAllByPhone(phone) {
    const res = await fetch(`${BASE_URL}/users?userPhone=${encodeURIComponent(String(phone).trim())}`);
    if (!res.ok) throw new Error("Хатогӣ ҳангоми ҷустуҷӯи корбар");
    const list = await res.json();
    return Array.isArray(list) ? list : [];
  },

  // Ҳамаи ронандагон. Филтр дар худи браузер аст, зеро корбарони кӯҳна
  // умуман майдони accountType надоранд.
  async getDrivers() {
    const list = await base.getAll();
    return (Array.isArray(list) ? list : []).filter((user) => user.accountType === "driver");
  },

  // Як корбар бо рақами телефон (барои санҷиши такрор ҳангоми сабти ном)
  async findByPhone(phone) {
    const list = await usersApi.findAllByPhone(phone);
    return list[0] || null;
  },
};
