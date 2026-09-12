"use client";

import { useState } from "react";
import Modal from "../../components/shared/Modal";
import { useTranslation } from "../../context/language";

const emptyForm = { company: "", product: "", volume: "", desc: "" };

export default function CreateRequestModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const { t } = useTranslation();

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    setForm(emptyForm);
  }

  return (
    <Modal open={open} onClose={onClose} className="CustomModal">
      <div className="modal-header header-blue">
        <h3>📝 {t("createRequestTitle")}</h3>
        <button type="button" className="close-x" onClick={onClose} aria-label={t("cancel")}>
          ✕
        </button>
      </div>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="create-company">{t("companyPlaceholder")}</label>
          <input
            id="create-company"
            type="text"
            placeholder={t("companyPlaceholder")}
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="create-product">{t("productPlaceholder")}</label>
          <input
            id="create-product"
            type="text"
            placeholder={t("productPlaceholder")}
            value={form.product}
            onChange={(e) => update("product", e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="create-volume">{t("volumePlaceholder")}</label>
          <input
            id="create-volume"
            type="text"
            placeholder={t("volumePlaceholder")}
            value={form.volume}
            onChange={(e) => update("volume", e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="create-desc">{t("desc")}</label>
          <textarea
            id="create-desc"
            placeholder={t("desc")}
            value={form.desc}
            onChange={(e) => update("desc", e.target.value)}
            required
          ></textarea>
        </div>
        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            {t("cancel")}
          </button>
          <button type="submit" className="btn-submit submit-blue">
            {t("save")}
          </button>
        </div>
      </form>
    </Modal>
  );
}
