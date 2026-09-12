import { BASE_URL } from "./config";
import { apiFetch, buildQuery, parseOrThrow } from "./httpClient";

const url = `${BASE_URL}/settings`;

function send(path, method, data, errorMessage) {
  return apiFetch(`${url}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => parseOrThrow(res, errorMessage));
}

export const settingsApi = {
  async get(userId) {
    const res = await apiFetch(`${url}${buildQuery({ userId })}`);
    return parseOrThrow(res, "Танзимот гирифта нашуд");
  },

  updateProfile(userId, data) {
    return send("/profile", "PATCH", { userId, ...data }, "Маълумот нигоҳ дошта нашуд");
  },

  updatePhone(userId, userPhone, password) {
    return send("/phone", "PATCH", { userId, userPhone, password }, "Рақам иваз нашуд");
  },

  updatePassword(userId, oldPassword, newPassword) {
    return send("/password", "PATCH", { userId, oldPassword, newPassword }, "Парол иваз нашуд");
  },

  updatePreferences(userId, preferences) {
    return send("/preferences", "PATCH", { userId, ...preferences }, "Танзимот нигоҳ дошта нашуд");
  },

  deleteAccount(userId, password) {
    return send("/account", "DELETE", { userId, password }, "Ҳисоб нест карда нашуд");
  },
};
