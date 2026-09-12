import { Sprout } from "lucide-react";
import { zaminApi } from "../../../api/zaminApi";
import { CITIES, cityLabel, normalizeCity } from "../../../lib/catalog";
import { PLACEHOLDER_IMG } from "../../../lib/images";
import { num, text, ownerExtra } from "./shared";

// Бахши заминҳои иҷора дар панели идора
export const zaminSection = {
  key: "zamin",
  api: zaminApi,
  icon: Sprout,
  color: "text-emerald-600",
  statKey: "landRent",
  panelKey: "manageLandsTitle",
  addKey: "addLand",
  editKey: "editLand",
  emptyKey: "noLands",
  deleteConfirmKey: "deleteLandConfirm",
  addedKey: "landAddedToMarket",
  updatedKey: "landUpdated",
  deletedKey: "landDeleted",
  title: (item) => item.name,
  meta: (t, item) => [
    cityLabel(t, item.city),
    `${item.price} ${t("somoniShort")}`,
    `${t("landSize")}: ${item.leftovers ?? 0}`,
  ],
  fields: [
    { name: "name", labelKey: "landObjectNameLabel", type: "text", required: true },
    { name: "img", labelKey: "landImgLabel", type: "image" },
    { name: "city", labelKey: "cityOnlyLabel", type: "select", options: CITIES, half: true },
    { name: "leftovers", labelKey: "landAreaLabel", type: "number", half: true },
    { name: "price", labelKey: "landRentPriceLabel", type: "number", required: true },
    { name: "desc", labelKey: "landDescLabel", type: "text" },
  ],
  toForm: (item) => ({
    name: item?.name || "",
    img: item?.img || "",
    city: normalizeCity(item?.city),
    leftovers: item?.leftovers ?? "",
    price: item?.price ?? "",
    desc: item?.desc || "",
  }),
  toPayload: (form, t) => ({
    type: "zamin",
    name: text(form.name) || t("landDefaultName"),
    img: text(form.img) || PLACEHOLDER_IMG,
    city: form.city,
    leftovers: num(form.leftovers),
    price: num(form.price),
    desc: text(form.desc) || t("landNoExtraInfo"),
  }),
  createExtra: ownerExtra,
};
