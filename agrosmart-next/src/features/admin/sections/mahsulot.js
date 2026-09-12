import { Package } from "lucide-react";
import { mahsulotApi } from "../../../api/mahsulotApi";
import {
  CITIES,
  PRODUCT_CATEGORIES,
  cityLabel,
  productCategoryLabel,
  normalizeCity,
  normalizeProductCategory,
} from "../../../lib/catalog";
import { PLACEHOLDER_IMG } from "../../../lib/images";
import { num, text, ownerExtra } from "./shared";

// Бахши маҳсулоти бозор дар панели идора
export const mahsulotSection = {
  key: "mahsulot",
  api: mahsulotApi,
  icon: Package,
  color: "text-amber-600",
  statKey: "market",
  panelKey: "manageProductsTitle",
  addKey: "addProduct",
  editKey: "editProduct",
  emptyKey: "noProducts",
  deleteConfirmKey: "deleteProductConfirm",
  addedKey: "productAdded",
  updatedKey: "productUpdated",
  deletedKey: "productDeleted",
  title: (item) => item.name,
  meta: (t, item) => [
    productCategoryLabel(t, item.category),
    cityLabel(t, item.city),
    `${item.price} ${t("somoniShort")}`,
    `${item.leftovers ?? 0} ${t("pieceShort")}`,
  ],
  fields: [
    { name: "name", labelKey: "productNameLabel", type: "text", required: true },
    { name: "img", labelKey: "productImgLabel", type: "image" },
    { name: "category", labelKey: "categoryLabel", type: "select", options: PRODUCT_CATEGORIES, half: true },
    { name: "city", labelKey: "cityOnlyLabel", type: "select", options: CITIES, half: true },
    { name: "price", labelKey: "priceSomoniLabel", type: "number", required: true, half: true },
    { name: "leftovers", labelKey: "quantity", type: "number", required: true, half: true },
    { name: "description", labelKey: "desc", type: "text" },
  ],
  toForm: (item) => ({
    name: item?.name || "",
    img: item?.img || "",
    category: normalizeProductCategory(item?.category),
    city: normalizeCity(item?.city),
    price: item?.price ?? "",
    leftovers: item?.leftovers ?? "",
    description: item?.description || "",
  }),
  toPayload: (form) => ({
    name: text(form.name),
    img: text(form.img) || PLACEHOLDER_IMG,
    category: form.category,
    city: form.city,
    price: num(form.price),
    leftovers: num(form.leftovers),
    description: text(form.description),
  }),
  createExtra: ownerExtra,
};
