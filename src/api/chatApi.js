import { BASE_URL } from "./config";
import { buildQuery, parseOrThrow } from "./httpClient";

const url = `${BASE_URL}/chats`;

function post(path, data, errorMessage) {
  return fetch(`${url}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => parseOrThrow(res, errorMessage));
}

export const chatApi = {
  async getMyChats(userId) {
    if (userId == null) return [];
    const res = await fetch(`${url}${buildQuery({ userId })}`);
    const list = await parseOrThrow(res, "Хатогӣ ҳангоми гирифтани сӯҳбатҳо");
    return Array.isArray(list) ? list : [];
  },

  async getById(chatId, userId) {
    const res = await fetch(`${url}/${chatId}${buildQuery({ userId })}`);
    return parseOrThrow(res, "Сӯҳбат ёфт нашуд");
  },

  open({ buyerId, sellerId, productId, productName, productType }) {
    return post(
      "",
      { buyerId, sellerId, productId, productName, productType },
      "Сӯҳбат кушода нашуд"
    );
  },

  async getMessages(chatId, { userId, limit, before } = {}) {
    const query = buildQuery({ userId, _limit: limit, _before: before });
    const res = await fetch(`${url}/${chatId}/messages${query}`);
    const list = await parseOrThrow(res, "Хатогӣ ҳангоми гирифтани паёмҳо");
    return Array.isArray(list) ? list : [];
  },

  sendText(chatId, userId, text) {
    return post(`/${chatId}/messages`, { userId, text }, "Паём фиристода нашуд");
  },

  sendVoice(chatId, userId, { audio, duration, mimeType = "audio/webm" }) {
    return post(
      `/${chatId}/messages`,
      { userId, kind: "voice", audio, duration, mimeType },
      "Паёми овозӣ фиристода нашуд"
    );
  },

  markRead(chatId, userId) {
    return post(`/${chatId}/read`, { userId }, "Хатогӣ ҳангоми қайди хондашуда");
  },

  async unreadCount(userId) {
    if (userId == null) return 0;
    const res = await fetch(`${url}/unread/count${buildQuery({ userId })}`);
    const data = await parseOrThrow(res, "Хатогӣ ҳангоми ҳисоби паёмҳои нахонда");
    return Number(data?.unread) || 0;
  },
};
