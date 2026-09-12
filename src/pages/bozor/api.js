import { mahsulotApi } from "../../api/mahsulotApi";

export async function fetchProducts() {
  return mahsulotApi.getAll();
}
