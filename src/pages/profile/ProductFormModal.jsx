import { useEffect, useState } from "react";
import Modal from "../../components/shared/Modal";
import ImagePicker from "../../components/shared/ImagePicker";
import { useTranslation } from "../../context/language";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CITIES, PRODUCT_CATEGORIES, normalizeCity, normalizeProductCategory } from "../../lib/catalog";
import { PLACEHOLDER_IMG } from "../../lib/images";

import { X } from "lucide-react";
const emptyForm = {
  img: "",
  name: "",
  category: PRODUCT_CATEGORIES[0].value,
  city: CITIES[0].value,
  description: "",
  price: "",
  leftovers: "",
};

export default function ProductFormModal({ open, onClose, title, submitLabel, headerClass, initialData, onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const { t } = useTranslation();

  useEffect(() => {
    if (open) {
      setForm(
        initialData
          ? {
              img: initialData.img || "",
              name: initialData.name || "",
              category: normalizeProductCategory(initialData.category),
              city: normalizeCity(initialData.city),
              description: initialData.description || "",
              price: initialData.price ?? "",
              leftovers: initialData.leftovers ?? "",
            }
          : emptyForm
      );
    }
  }, [open, initialData]);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      img: form.img || PLACEHOLDER_IMG,
      name: form.name.trim(),
      category: form.category,
      city: form.city,
      description: form.description.trim(),
      price: Number(form.price) || 0,
      leftovers: Number(form.leftovers) || 0,
    });
  }

  return (
    <Modal open={open} onClose={onClose} className="CustomModal AddModal">
      <div className={`modal-header ${headerClass}`}>
        <h3>{title}</h3>
        <button type="button" className="close-x" onClick={onClose} aria-label={t("cancel")}>
          <X size={18} />
        </button>
      </div>
      <form className="modal-form" onSubmit={handleSubmit}>
        <ImagePicker
          id="product-img"
          label={t("productImgLabel")}
          value={form.img}
          onChange={(v) => update("img", v)}
        />
        <div className="input-group">
          <label htmlFor="product-name">{t("productNameLabel")}</label>
          <input
            id="product-name"
            type="text"
            placeholder={t("productNamePlaceholder")}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-category">{t("categoryLabel")}</label>
          <Select value={form.category} onValueChange={(v) => update("category", v)}>
            <SelectTrigger id="product-category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {t(c.key)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="input-group">
          <label htmlFor="product-city">{t("cityOnlyLabel")}</label>
          <Select value={form.city} onValueChange={(v) => update("city", v)}>
            <SelectTrigger id="product-city">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CITIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {t(c.key)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="input-group">
          <label htmlFor="product-desc">{t("descriptionFieldLabel")}</label>
          <textarea
            id="product-desc"
            placeholder={t("productDescPlaceholder")}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          ></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="product-price">{t("priceTjsLabel")}</label>
          <input
            id="product-price"
            type="number"
            min="0"
            step="0.01"
            placeholder="0"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-leftovers">{t("totalQuantityLabel")}</label>
          <input
            id="product-leftovers"
            type="number"
            min="0"
            placeholder="0"
            value={form.leftovers}
            onChange={(e) => update("leftovers", e.target.value)}
            required
          />
        </div>
        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            {t("backBtn")}
          </button>
          <button type="submit" className="btn-submit submit-green">
            {submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
}
