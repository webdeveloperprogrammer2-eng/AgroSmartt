import { createResourceClient } from "./httpClient";

const base = createResourceClient("mahsulot");

export const mahsulotApi = {
  ...base,

  getByUser(userId) {
    return base.getAll({ userId });
  },
};
