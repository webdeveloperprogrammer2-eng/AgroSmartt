import { BASE_URL } from "./config";

export function buildQuery(params) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params || {})) {
    if (value === undefined || value === null || value === "") continue;
    query.set(key, String(value));
  }
  const text = query.toString();
  return text ? `?${text}` : "";
}

export async function parseOrThrow(res, errorMessage) {
  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || errorMessage);
  return data;
}

function sendJson(url, method, data, errorMessage) {
  return fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => parseOrThrow(res, errorMessage));
}

export function createResourceClient(resource) {
  const url = `${BASE_URL}/${resource}`;

  return {
    async getAll(params) {
      const res = await fetch(`${url}${buildQuery(params)}`);
      const list = await parseOrThrow(res, `Хатогӣ ҳангоми гирифтани ${resource}`);
      return Array.isArray(list) ? list : [];
    },

    async getById(id) {
      const res = await fetch(`${url}/${id}`);
      return parseOrThrow(res, `Сабт бо ин ID дар ${resource} ёфт нашуд`);
    },

    create(data) {
      return sendJson(url, "POST", data, `Хатогӣ ҳангоми иловаи сабт ба ${resource}`);
    },

    update(id, data) {
      return sendJson(`${url}/${id}`, "PUT", data, `Хатогӣ ҳангоми навсозии сабт дар ${resource}`);
    },

    patch(id, data) {
      return sendJson(`${url}/${id}`, "PATCH", data, `Хатогӣ ҳангоми навсозии сабт дар ${resource}`);
    },

    async remove(id) {
      const res = await fetch(`${url}/${id}`, { method: "DELETE" });
      return parseOrThrow(res, `Хатогӣ ҳангоми несткунии сабт дар ${resource}`);
    },
  };
}
