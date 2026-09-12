"use client";

import { useEffect, useState } from "react";
import Modal from "../../components/shared/Modal";
import { useTranslation } from "../../context/language";

const emptyForm = { companyName: "", productName: "", volume: "", description: "" };

// Модали таҳрири дархост. Ҳангоми кушода шудан бо маълумоти дархости интихобшуда пур мешавад.
export default function EditRequestModal({ open, onClose, request, onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const { t } = useTranslation();

  useEffect(() => {
    if (request) {
      setForm({
        companyName: request.companyName || "",
        productName: request.productName || "",
        volume: request.volume || "",
        description: request.description || "",
      });
    }
  }, [request]);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <Modal open={open} onClose={onClose} className="CustomModal">
      <div className="modal-header header-blue">
        <h3>✏️ {t("editRequestTitle")}</h3>
        <button type="button" className="close-x" onClick={onClose} aria-label={t("cancel")}>
          ✕
        </button>
      </div>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="edit-company">{t("companyPlaceholder")}</label>
          <input
            id="edit-company"
            type="text"
            value={form.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="edit-product">{t("productPlaceholder")}</label>
          <input
            id="edit-product"
            type="text"
            value={form.productName}
            onChange={(e) => update("productName", e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="edit-volume">{t("volumePlaceholder")}</label>
          <input
            id="edit-volume"
            type="text"
            value={form.volume}
            onChange={(e) => update("volume", e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="edit-desc">{t("desc")}</label>
          <textarea
            id="edit-desc"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
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
