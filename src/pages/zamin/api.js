import { zaminApi } from "../../api/zaminApi";

export async function fetchLands() {
  return zaminApi.getAll();
}
