import { BASE_URL } from "./config";
import { buildQuery, parseOrThrow } from "./httpClient";

// Нигоҳдоштаҳо (избранное) — /favorites (Swagger: тамғаи Favorites).
// Ҳар сатр ҳамроҳи худи мол (`item`) меояд; агар мол нест шуда бошад — `item: null`.
const url = `${BASE_URL}/favorites`;

export const favoritesApi = {
  async list(userId) {
    if (userId == null) return [];
    const res = await fetch(`${url}${buildQuery({ userId })}`);
    const data = await parseOrThrow(res, "Нигоҳдоштаҳо гирифта нашуданд");
    return Array.isArray(data) ? data : [];
  },

  // Такрор пахш кардан хато намедиҳад — сервер дубликат намесозад
  add(userId, itemType, itemId) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, itemType, itemId: String(itemId) }),
    }).then((res) => parseOrThrow(res, "Ба нигоҳдоштаҳо илова нашуд"));
  },

  // Хориҷ кардан бо худи мол — ID-и сатри favorites донистан лозим нест
  async remove(userId, itemType, itemId) {
    const query = buildQuery({ userId, itemType, itemId: String(itemId) });
    const res = await fetch(`${url}${query}`, { method: "DELETE" });
    return parseOrThrow(res, "Аз нигоҳдоштаҳо хориҷ нашуд");
  },
};
