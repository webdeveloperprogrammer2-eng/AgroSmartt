import { createResourceClient } from "./httpClient";

const base = createResourceClient("ZaminApteka");

export const aptekaApi = {
  ...base,

  getByUser(userId) {
    return base.getAll({ userId });
  },
};
