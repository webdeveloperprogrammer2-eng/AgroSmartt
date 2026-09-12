import { ClipboardList } from "lucide-react";
import { jobsApi } from "../../../api/jobsApi";
import { text } from "./shared";

// Бахши дархостҳои харидорон дар панели идора
export const jobsSection = {
  key: "jobs",
  api: jobsApi,
  icon: ClipboardList,
  color: "text-sky-600",
  statKey: "requestsTitle",
  panelKey: "manageRequestsTitle",
  addKey: "createRequestTitle",
  editKey: "editRequestTitle",
  emptyKey: "noRequestsYet",
  deleteConfirmKey: "deleteRequestConfirm",
  addedKey: "requestAdded",
  updatedKey: "requestUpdated",
  deletedKey: "requestDeleted",
  title: (item) => item.companyName,
  meta: (t, item) => [
    item.productName,
    `${item.volume} — ${t("requiredVolumeLabel")}`,
    item.creatorName,
  ],
  fields: [
    { name: "companyName", labelKey: "companyPlaceholder", type: "text", required: true },
    { name: "productName", labelKey: "productPlaceholder", type: "text", required: true },
    { name: "volume", labelKey: "volumePlaceholder", type: "text", required: true },
    { name: "description", labelKey: "desc", type: "text" },
  ],
  toForm: (item) => ({
    companyName: item?.companyName || "",
    productName: item?.productName || "",
    volume: item?.volume ?? "",
    description: item?.description || "",
  }),
  toPayload: (form) => ({
    companyName: text(form.companyName),
    productName: text(form.productName),
    volume: text(form.volume),
    description: text(form.description),
  }),
  // Дархост бояд соҳиб дошта бошад — вагарна дар саҳифаи Муштарӣ
  // тугмаҳои таҳрир/несткунии соҳиб кор намекунанд
  createExtra: (t, user) => ({
    creatorName: user.userName || user.name || t("defaultFarmerName"),
    creatorPhone: user.userPhone || user.phone || "",
    createdAt: new Date().toISOString(),
  }),
};
