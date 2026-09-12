import { mahsulotApi } from "../../api/mahsulotApi";
import { zaminApi } from "../../api/zaminApi";
import { aptekaApi } from "../../api/aptekaApi";

// --- Маҳсулот (http://localhost:8000/mahsulot) ---
export async function fetchMyProducts(userId) {
  const all = await mahsulotApi.getAll();
  return all.filter((item) => String(item.userId) === String(userId));
}

export async function addProduct(product) {
  return mahsulotApi.create(product);
}

export async function updateProduct(id, product) {
  return mahsulotApi.update(id, product);
}

export async function deleteProduct(id) {
  return mahsulotApi.remove(id);
}

// --- Замин (http://localhost:8000/zamin) ---
export async function fetchMyLands(userId) {
  const all = await zaminApi.getAll();
  return all.filter((item) => String(item.userId) === String(userId));
}

export async function addLand(land) {
  return zaminApi.create(land);
}

export async function updateLand(id, land) {
  return zaminApi.update(id, land);
}

export async function deleteLand(id) {
  return zaminApi.remove(id);
}

// --- Дорувори (http://localhost:8000/ZaminApteka) ---
export async function fetchMyMedicines(userId) {
  const all = await aptekaApi.getAll();
  return all.filter((item) => String(item.userId) === String(userId));
}

export async function addMedicine(medicine) {
  return aptekaApi.create(medicine);
}

export async function updateMedicine(id, medicine) {
  return aptekaApi.update(id, medicine);
}

export async function deleteMedicine(id) {
  return aptekaApi.remove(id);
}
