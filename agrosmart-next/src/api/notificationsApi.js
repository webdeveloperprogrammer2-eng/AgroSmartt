import { BASE_URL } from "./config";
import { createResourceClient } from "./httpClient";

// Хабарномаҳо — http://localhost:8000/notifications
// Ин ҷойгузини боти Telegram аст: ҳар фармоиш ба соҳиби ҳамон маҳсулот/
// замин/дору мерасад ва ӯ онро дар кабинети худ мебинад.
const base = createResourceClient("notifications");

export const notificationsApi = {
  ...base,

  // Хабарномаҳои як корбар — навтаринаш дар боло
  async getForUser(userId) {
    if (userId == null) return [];
    const res = await fetch(
      `${BASE_URL}/notifications?userId=${encodeURIComponent(String(userId))}&_sort=id&_order=desc`
    );
    if (!res.ok) throw new Error("Хатогӣ ҳангоми гирифтани хабарномаҳо");
    const list = await res.json();
    return Array.isArray(list) ? list : [];
  },

  // Хондашуда қайд кардан
  markRead(id) {
    return base.patch(id, { read: true });
  },
};
