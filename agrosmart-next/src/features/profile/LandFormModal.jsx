"use client";

import { useEffect, useState } from "react";
import Modal from "../../components/shared/Modal";
import ImagePicker from "../../components/shared/ImagePicker";
import { useTranslation } from "../../context/language";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CITIES, normalizeCity } from "../../lib/catalog";
import { PLACEHOLDER_IMG } from "../../lib/images";

const emptyForm = { img: "", name: "", city: CITIES[0].value, size: "", desc: "", price: "" };

// Модали ягона барои иловаи ва таҳрири замин
export default function LandFormModal({ open, onClose, title, submitLabel, headerClass, initialData, onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const { t } = useTranslation();

  useEffect(() => {
    if (open) {
      setForm(
        initialData
          ? {
              img: initialData.img || "",
              name: initialData.name || "",
              city: normalizeCity(initialData.city),
              size: initialData.leftovers ?? "",
              desc: initialData.desc || "",
              price: initialData.price ?? "",
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
      type: "zamin",
      img: form.img || PLACEHOLDER_IMG,
      name: form.name.trim() || t("landDefaultName"),
      city: form.city,
      price: Number(form.price) || 0,
      leftovers: Number(form.size) || 0,
      desc: form.desc.trim() || t("landNoExtraInfo"),
    });
  }

  return (
    <Modal open={open} onClose={onClose} className="CustomModal LandModal">
      <div className={`modal-header ${headerClass}`}>
        <h3>{title}</h3>
        <button type="button" className="close-x" onClick={onClose} aria-label={t("cancel")}>
          ✕
        </button>
      </div>
      <form className="modal-form" onSubmit={handleSubmit}>
        <ImagePicker
          id="land-img"
          label={t("landImgLabel")}
          value={form.img}
          onChange={(v) => update("img", v)}
        />
        <div className="input-group">
          <label htmlFor="land-name">{t("landObjectNameLabel")}</label>
          <input
            id="land-name"
            type="text"
            placeholder={t("landObjectNamePlaceholder")}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="land-city">{t("cityLabel")}</label>
          <Select value={form.city} onValueChange={(v) => update("city", v)}>
            <SelectTrigger id="land-city">
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
          <label htmlFor="land-size">{t("landAreaLabel")}</label>
          <input
            id="land-size"
            type="number"
            min="0"
            placeholder="0"
            value={form.size}
            onChange={(e) => update("size", e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="land-desc">{t("landDescLabel")}</label>
          <textarea
            id="land-desc"
            placeholder={t("landDescPlaceholder")}
            value={form.desc}
            onChange={(e) => update("desc", e.target.value)}
          ></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="land-price">{t("landRentPriceLabel")}</label>
          <input
            id="land-price"
            type="number"
            min="0"
            step="0.01"
            placeholder="0"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            required
          />
        </div>
        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            {t("backBtn")}
          </button>
          <button type="submit" className="btn-submit submit-blue">
            {submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
}
