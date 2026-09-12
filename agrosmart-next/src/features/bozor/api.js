import { mahsulotApi } from "../../api/mahsulotApi";

// Маҳсулоти бозор аз ҳамон json-server гирифта мешавад, ки кабинети деҳқон
// ба он сабт мекунад (http://localhost:8000/mahsulot). Пештар ин саҳифа
// ба mockapi.io-и бегона муроҷиат мекард, барои ҳамин маҳсулоти
// иловакардаи корбар дар бозор пайдо намешуд.
export async function fetchProducts() {
  const data = await mahsulotApi.getAll();
  return Array.isArray(data) ? data : [];
}
