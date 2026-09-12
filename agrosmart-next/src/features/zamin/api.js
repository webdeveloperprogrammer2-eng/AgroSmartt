import { zaminApi } from "../../api/zaminApi";

// Гирифтани ҳамаи заминҳо аз json-server (http://localhost:8000/zamin)
export async function fetchLands() {
  const data = await zaminApi.getAll();
  return Array.isArray(data) ? data : [];
}
