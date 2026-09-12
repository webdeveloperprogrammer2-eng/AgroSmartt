import { BASE_URL } from "./config";
import { buildQuery, parseOrThrow } from "./httpClient";

// Танзимоти корбар — /settings (Swagger: тамғаи Settings).
// Пештар забон ва мавзӯъ танҳо дар localStorage буданд ва дар
// дастгоҳи дигар гум мешуданд — ҳоло дар сервер нигоҳ дошта мешаванд.
const url = `${BASE_URL}/settings`;

function send(path, method, data, errorMessage) {
  return fetch(`${url}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => parseOrThrow(res, errorMessage));
}

export const settingsApi = {
  // { user: {...}, preferences: { language, theme, notifications } }
  async get(userId) {
    const res = await fetch(`${url}${buildQuery({ userId })}`);
    return parseOrThrow(res, "Танзимот гирифта нашуд");
  },

  // Ном, шаҳр, синну сол, аватар (data-URL; сатри холӣ суратро нест мекунад)
  updateProfile(userId, data) {
    return send("/profile", "PATCH", { userId, ...data }, "Маълумот нигоҳ дошта нашуд");
  },

  // Рақам логин аст — бинобар ин парол ҳатмист
  updatePhone(userId, userPhone, password) {
    return send("/phone", "PATCH", { userId, userPhone, password }, "Рақам иваз нашуд");
  },

  updatePassword(userId, oldPassword, newPassword) {
    return send("/password", "PATCH", { userId, oldPassword, newPassword }, "Парол иваз нашуд");
  },

  updatePreferences(userId, preferences) {
    return send("/preferences", "PATCH", { userId, ...preferences }, "Танзимот нигоҳ дошта нашуд");
  },

  // Ҳамроҳи корбар молҳо, заминҳо, сӯҳбатҳо ва нигоҳдоштаҳои ӯ нест мешаванд
  deleteAccount(userId, password) {
    return send("/account", "DELETE", { userId, password }, "Ҳисоб нест карда нашуд");
  },
};
