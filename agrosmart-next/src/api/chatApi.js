import { BASE_URL } from "./config";
import { buildQuery, parseOrThrow } from "./httpClient";

// Сӯҳбати харидор ва фурӯшанда — /chats (Swagger: тамғаи Chat).
// Ин resource-и оддии CRUD нест, барои ҳамин клиенти умумӣ истифода намешавад.
const url = `${BASE_URL}/chats`;

function post(path, data, errorMessage) {
  return fetch(`${url}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => parseOrThrow(res, errorMessage));
}

export const chatApi = {
  // Ҳамаи сӯҳбатҳои корбар. Ҳар сӯҳбат `peerId`, `lastMessage` ва
  // `unreadCount`-и худро дорад — рӯйхатро бе дархостҳои иловагӣ месозем.
  async getMyChats(userId) {
    if (userId == null) return [];
    const res = await fetch(`${url}${buildQuery({ userId })}`);
    const list = await parseOrThrow(res, "Хатогӣ ҳангоми гирифтани сӯҳбатҳо");
    return Array.isArray(list) ? list : [];
  },

  // Як сӯҳбат. Сервер месанҷад, ки корбар иштирокчии он бошад (403).
  async getById(chatId, userId) {
    const res = await fetch(`${url}/${chatId}${buildQuery({ userId })}`);
    return parseOrThrow(res, "Сӯҳбат ёфт нашуд");
  },

  // Кушодани сӯҳбат бо фурӯшандаи мол.
  // Агар чунин сӯҳбат аллакай бошад, сервер ҳамонро бармегардонад — такрор намешавад.
  open({ buyerId, sellerId, productId, productName, productType }) {
    return post(
      "",
      { buyerId, sellerId, productId, productName, productType },
      "Сӯҳбат кушода нашуд"
    );
  },

  // Таърихи паёмҳо. `_before` — ID-и паёме, ки аз он пеш бор мекунем (варақгардонӣ).
  async getMessages(chatId, { userId, limit, before } = {}) {
    const query = buildQuery({ userId, _limit: limit, _before: before });
    const res = await fetch(`${url}/${chatId}/messages${query}`);
    const list = await parseOrThrow(res, "Хатогӣ ҳангоми гирифтани паёмҳо");
    return Array.isArray(list) ? list : [];
  },

  // Паёми матнӣ
  sendText(chatId, userId, text) {
    return post(`/${chatId}/messages`, { userId, text }, "Паём фиристода нашуд");
  },

  // Паёми овозӣ. `audio` бояд ҳатман data-URL бошад
  // (масалан "data:audio/webm;base64,..."), вагарна сервер 400 медиҳад.
  sendVoice(chatId, userId, { audio, duration, mimeType = "audio/webm" }) {
    return post(
      `/${chatId}/messages`,
      { userId, kind: "voice", audio, duration, mimeType },
      "Паёми овозӣ фиристода нашуд"
    );
  },

  // Ҳамаи паёмҳои сӯҳбатро хондашуда қайд мекунад
  markRead(chatId, userId) {
    return post(`/${chatId}/read`, { userId }, "Хатогӣ ҳангоми қайди хондашуда");
  },

  // Шумораи умумии паёмҳои нахонда — барои нишони сурх дар навбар
  async unreadCount(userId) {
    if (userId == null) return 0;
    const res = await fetch(`${url}/unread/count${buildQuery({ userId })}`);
    const data = await parseOrThrow(res, "Хатогӣ ҳангоми ҳисоби паёмҳои нахонда");
    return Number(data?.unread) || 0;
  },
};
