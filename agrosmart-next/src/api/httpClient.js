import { BASE_URL } from "./config";

// Аз объект сатри query месозад: { userId: 3 } -> "?userId=3"
// Майдонҳои холӣ партофта мешаванд.
export function buildQuery(params) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params || {})) {
    if (value === undefined || value === null || value === "") continue;
    query.set(key, String(value));
  }
  const text = query.toString();
  return text ? `?${text}` : "";
}

// Хондани JSON ва партофтани хатогии фаҳмо агар сервер ҷавоби нодуруст диҳад
export async function parseOrThrow(res, errorMessage) {
  if (!res.ok) throw new Error(errorMessage);
  if (res.status === 204) return null;
  return res.json();
}

// Клиенти умумии CRUD барои ҳар resource-и json-server (масалан "jobs", "zamin", "mahsulot")
export function createResourceClient(resource) {
  const url = `${BASE_URL}/${resource}`;

  return {
    // Гирифтани ҳамаи сабтҳо
    async getAll() {
      const res = await fetch(url);
      return parseOrThrow(res, `Хатогӣ ҳангоми гирифтани ${resource}`);
    },

    // Гирифтани як сабт бо id
    async getById(id) {
      const res = await fetch(`${url}/${id}`);
      return parseOrThrow(res, `Сабт бо ин ID дар ${resource} ёфт нашуд`);
    },

    // Илова кардани сабти нав
    async create(data) {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Санаи сохташавӣ барои диаграммаи "Пешрафти сайт" лозим аст
        body: JSON.stringify({ createdAt: new Date().toISOString(), ...data }),
      });
      return parseOrThrow(res, `Хатогӣ ҳангоми иловаи сабт ба ${resource}`);
    },

    // Навсозии пурраи сабт
    async update(id, data) {
      const res = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return parseOrThrow(res, `Хатогӣ ҳангоми навсозии сабт дар ${resource}`);
    },

    // Навсозии қисман (PATCH)
    async patch(id, data) {
      const res = await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return parseOrThrow(res, `Хатогӣ ҳангоми навсозии сабт дар ${resource}`);
    },

    // Несткунии сабт
    async remove(id) {
      const res = await fetch(`${url}/${id}`, { method: "DELETE" });
      return parseOrThrow(res, `Хатогӣ ҳангоми несткунии сабт дар ${resource}`);
    },
  };
}
