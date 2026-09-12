import { createResourceClient } from "./httpClient";

const base = createResourceClient("jobs");

export const jobsApi = {
  ...base,

  getByUser(userId) {
    return base.getAll({ userId });
  },
};
