import { createResourceClient } from "./httpClient";

const base = createResourceClient("zamin");

export const zaminApi = {
  ...base,

  getByUser(userId) {
    return base.getAll({ userId });
  },
};
