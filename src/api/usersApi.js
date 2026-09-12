import { createResourceClient } from "./httpClient";

const base = createResourceClient("users");

function digitsOnly(value) {
  return String(value || "").replace(/\D/g, "");
}

export const usersApi = {
  ...base,

  async findAllByPhone(phone) {
    const wanted = digitsOnly(phone);
    if (!wanted) return [];
    const list = await base.getAll();
    return list.filter((user) => digitsOnly(user.userPhone) === wanted);
  },

  async getDrivers() {
    const list = await base.getAll();
    return list.filter((user) => user.accountType === "driver");
  },

  async findByPhone(phone) {
    const list = await usersApi.findAllByPhone(phone);
    return list[0] || null;
  },
};
