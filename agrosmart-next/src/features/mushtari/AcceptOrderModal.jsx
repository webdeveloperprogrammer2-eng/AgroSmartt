"use client";

import { useState } from "react";
import Modal from "../../components/shared/Modal";
import { useTranslation } from "../../context/language";

// Модали расмикунонии дархости клиент (баъд аз тугмаи "Тамос")
export default function AcceptOrderModal({ open, onClose, request, onSubmit }) {
  const [hasProduct, setHasProduct] = useState(false);
  const [price, setPrice] = useState("");
  const { t } = useTranslation();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
    setHasProduct(false);
    setPrice("");
  }

  if (!request) return null;

  const checkboxLabel = t("hasProductLabel");
  const priceLabelText = t("proposedPricePerKgLabel");

  return (
    <Modal open={open} onClose={onClose} className="CustomModal">
      <div className="modal-header header-blue">
        <h3>🤝 {t("acceptModalTitle")}</h3>
        <button type="button" className="close-x" onClick={onClose} aria-label={t("cancel")}>
          ✕
        </button>
      </div>
      <form className="modal-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="accept-company">{t("companyPlaceholder")}</label>
          <input id="accept-company" type="text" readOnly className="input-readonly" value={request.companyName} />
        </div>
        <div className="input-group">
          <label htmlFor="accept-phone">{t("phone")}:</label>
          <input
            id="accept-phone"
            type="text"
            readOnly
            className="input-readonly input-readonly-accent"
            value={request.creatorPhone || "—"}
          />
        </div>
        <div className="input-group">
          <label htmlFor="accept-product">{t("productPlaceholder")}:</label>
          <input
            id="accept-product"
            type="text"
            readOnly
            className="input-readonly"
            value={`${request.productName} (${request.volume})`}
          />
        </div>

        <div className="checkbox-row">
          <input
            type="checkbox"
            id="hasProductCheckbox"
            checked={hasProduct}
            onChange={(e) => setHasProduct(e.target.checked)}
          />
          <label htmlFor="hasProductCheckbox">{checkboxLabel}</label>
        </div>

        {hasProduct && (
          <div className="input-group">
            <label htmlFor="accept-price">{priceLabelText}:</label>
            <input
              id="accept-price"
              type="number"
              min="0"
              step="0.1"
              placeholder="4.5"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        )}

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            {t("cancel")}
          </button>
          <button type="submit" className="btn-submit submit-blue">
            📞 {t("sendContract")}
          </button>
        </div>
      </form>
    </Modal>
  );
}
