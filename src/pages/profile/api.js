import { mahsulotApi } from "../../api/mahsulotApi";
import { zaminApi } from "../../api/zaminApi";
import { aptekaApi } from "../../api/aptekaApi";

export async function fetchMyProducts(userId) {
  if (userId == null) return [];
  return mahsulotApi.getByUser(userId);
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

export async function fetchMyLands(userId) {
  if (userId == null) return [];
  return zaminApi.getByUser(userId);
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

export async function fetchMyMedicines(userId) {
  if (userId == null) return [];
  return aptekaApi.getByUser(userId);
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
