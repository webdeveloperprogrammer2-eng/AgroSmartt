"use client";

import { useEffect, useState } from "react";
import Modal from "../../components/shared/Modal";
import ProductFormFields from "./ProductFormFields";
import { useTranslation } from "../../context/language";
import { CITIES, PRODUCT_CATEGORIES, normalizeCity, normalizeProductCategory } from "../../lib/catalog";
import { PLACEHOLDER_IMG } from "../../lib/images";

const emptyForm = {
  img: "",
  name: "",
  category: PRODUCT_CATEGORIES[0].value,
  city: CITIES[0].value,
  description: "",
  price: "",
  leftovers: "",
};

// Модали ягона барои иловаи ва таҳрири маҳсулот
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
              // Сабтҳои кӯҳна метавонанд номҳои дигар дошта бошанд — мутобиқ мекунем
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
          ✕
        </button>
      </div>

      <form className="modal-form" onSubmit={handleSubmit}>
        <ProductFormFields form={form} update={update} />

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
