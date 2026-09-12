import { BASE_URL } from "./config";
import { apiFetch, buildQuery, parseOrThrow } from "./httpClient";

const url = `${BASE_URL}/favorites`;

export const favoritesApi = {
  async list(userId) {
    if (userId == null) return [];
    const res = await apiFetch(`${url}${buildQuery({ userId })}`);
    const data = await parseOrThrow(res, "Нигоҳдоштаҳо гирифта нашуданд");
    return Array.isArray(data) ? data : [];
  },

  add(userId, itemType, itemId) {
    return apiFetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, itemType, itemId: String(itemId) }),
    }).then((res) => parseOrThrow(res, "Ба нигоҳдоштаҳо илова нашуд"));
  },

  async remove(userId, itemType, itemId) {
    const query = buildQuery({ userId, itemType, itemId: String(itemId) });
    const res = await apiFetch(`${url}${query}`, { method: "DELETE" });
    return parseOrThrow(res, "Аз нигоҳдоштаҳо хориҷ нашуд");
  },
};
