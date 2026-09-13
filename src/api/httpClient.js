import { BASE_URL } from "./config";

// Сервер дар Render-и ройгон пас аз чанд дақиқа бекорӣ хоб меравад ва
// дархости аввал метавонад 30-60 сония кашад ё тамоман афтад ("Failed to fetch").
// Барои ҳамин ҳар дархостро бо timeout мепечонем ва ҳангоми хатои шабака такрор мекунем.
const TIMEOUT_MS = 60000;
const RETRIES = 2;
const RETRY_DELAY_MS = 1500;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function apiFetch(url, options = {}) {
  let lastError = null;

  for (let attempt = 0; attempt <= RETRIES; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      return await fetch(url, { ...options, signal: controller.signal });
    } catch (err) {
      lastError = err;
      // Хатои шабака ё timeout — метавонад бедоршавии сервер бошад, такрор мекунем.
      if (attempt < RETRIES) await wait(RETRY_DELAY_MS * (attempt + 1));
    } finally {
      clearTimeout(timer);
    }
  }

  const error = new Error("errorNetwork");
  error.cause = lastError;
  throw error;
}

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
  return apiFetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => parseOrThrow(res, errorMessage));
}

export function createResourceClient(resource) {
  const url = `${BASE_URL}/${resource}`;

  return {
    async getAll(params) {
      const res = await apiFetch(`${url}${buildQuery(params)}`);
      const list = await parseOrThrow(res, `Хатогӣ ҳангоми гирифтани ${resource}`);
      return Array.isArray(list) ? list : [];
    },

    async getById(id) {
      const res = await apiFetch(`${url}/${id}`);
      return parseOrThrow(res, `Сабт бо ин ID дар ${resource} ёфт нашуд`);
    },

    // Санаи сохташавиро худамон мегузорем — бе он диаграммаи "Пешрафти сайт"
    // корбарон ва эълонҳои навро ҳисоб карда наметавонад.
    create(data) {
      const record = { createdAt: new Date().toISOString(), ...data };
      return sendJson(url, "POST", record, `Хатогӣ ҳангоми иловаи сабт ба ${resource}`);
    },

    // PUT сабтро пурра иваз мекунад, барои ҳамин санаи кӯҳнаро нигоҳ медорем
    async update(id, data) {
      let record = data;
      if (data && !data.createdAt) {
        const res = await apiFetch(`${url}/${id}`).catch(() => null);
        const current = res?.ok ? await res.json().catch(() => null) : null;
        if (current?.createdAt) record = { ...data, createdAt: current.createdAt };
      }
      return sendJson(`${url}/${id}`, "PUT", record, `Хатогӣ ҳангоми навсозии сабт дар ${resource}`);
    },

    patch(id, data) {
      return sendJson(`${url}/${id}`, "PATCH", data, `Хатогӣ ҳангоми навсозии сабт дар ${resource}`);
    },

    async remove(id) {
      const res = await apiFetch(`${url}/${id}`, { method: "DELETE" });
      return parseOrThrow(res, `Хатогӣ ҳангоми несткунии сабт дар ${resource}`);
    },
  };
}

// Сервери ройгони Render баъди бекорӣ хоб меравад ва дархости аввал 30-60 сония мекашад.
// Ҳангоми кушодани сайт онро фавран бедор мекунем, то вақти сабти ном тайёр бошад.
export function warmUpServer() {
  fetch(`${BASE_URL}/users`, { method: "HEAD" }).catch(() => {});
}
