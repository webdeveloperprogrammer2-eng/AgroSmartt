import { Pill } from "lucide-react";
import { aptekaApi } from "../../../api/aptekaApi";
import {
  CITIES,
  MEDICINE_CATEGORIES,
  cityLabel,
  medicineCategoryLabel,
  normalizeCity,
  normalizeMedicineCategory,
} from "../../../lib/catalog";
import { num, text, ownerExtra } from "./shared";

// Бахши дорувори дар панели идора
export const aptekaSection = {
  key: "apteka",
  api: aptekaApi,
  icon: Pill,
  color: "text-rose-600",
  statKey: "pharmacyTitle",
  panelKey: "managePharmacyTitle",
  addKey: "addMedicine",
  editKey: "editMedicine",
  emptyKey: "noMedicines",
  deleteConfirmKey: "deleteMedicineFromMarketConfirm",
  addedKey: "medicineAdded",
  updatedKey: "medicineUpdated",
  deletedKey: "medicineDeleted",
  title: (item) => item.name,
  meta: (t, item) => [
    medicineCategoryLabel(t, item.category),
    cityLabel(t, item.city),
    `${item.price} ${t("somoniShort")}`,
  ],
  fields: [
    { name: "name", labelKey: "medicineNameLabel", type: "text", required: true },
    { name: "img", labelKey: "medicineImgLabel", type: "image" },
    { name: "category", labelKey: "categoryLabel", type: "select", options: MEDICINE_CATEGORIES, half: true },
    { name: "city", labelKey: "cityOnlyLabel", type: "select", options: CITIES, half: true },
    { name: "price", labelKey: "priceSomoniLabel", type: "number", required: true, half: true },
    { name: "leftovers", labelKey: "quantity", type: "number", required: true, half: true },
    { name: "description", labelKey: "desc", type: "text" },
  ],
  toForm: (item) => ({
    name: item?.name || "",
    img: item?.img || "",
    category: normalizeMedicineCategory(item?.category),
    city: normalizeCity(item?.city),
    price: item?.price ?? "",
    leftovers: item?.leftovers ?? "",
    description: item?.description || "",
  }),
  toPayload: (form) => ({
    name: text(form.name),
    img: text(form.img),
    category: form.category,
    city: form.city,
    price: num(form.price),
    leftovers: num(form.leftovers),
    description: text(form.description),
  }),
  createExtra: ownerExtra,
};
