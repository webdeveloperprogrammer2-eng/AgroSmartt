import { createResourceClient } from "./httpClient";

const base = createResourceClient("notifications");

export const notificationsApi = {
  ...base,

  getForUser(userId) {
    if (userId == null) return Promise.resolve([]);
    return base.getAll({ userId, _sort: "id", _order: "desc" });
  },

  getForBuyer(buyerId) {
    if (buyerId == null) return Promise.resolve([]);
    return base.getAll({ buyerId, _sort: "id", _order: "desc" });
  },

  markRead(id) {
    return base.patch(id, { read: true });
  },
};
