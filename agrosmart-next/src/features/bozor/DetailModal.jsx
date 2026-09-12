"use client";

import { X } from "lucide-react";
import Modal from "../../components/shared/Modal";
import { useTranslation } from "../../context/language";
import { cityLabel, productCategoryLabel } from "../../lib/catalog";
import { imgOrPlaceholder } from "../../lib/images";

// Модали муфассалоти маҳсулот
export default function DetailModal({ open, onClose, product }) {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose} className="market-modal detail-modal">
      <div className="modal-content">
        <button type="button" className="close-modal close-floating" onClick={onClose} aria-label={t("cancel")}>
          <X size={18} strokeWidth={2.6} />
        </button>
        {product && (
          <div className="product-detail-view">
            <img
              src={imgOrPlaceholder(product.img)}
              className="product-detail-img"
              alt={product.name}
            />
            <h2 className="product-detail-title">{product.name}</h2>

            <dl className="detail-rows">
              <div className="detail-row">
                <dt>{t("price")}</dt>
                <dd className="detail-value-accent">{product.price} {t("somoniShort")}</dd>
              </div>
              <div className="detail-row">
                <dt>{t("quantity")}</dt>
                <dd>{product.leftovers} {t("kg")}</dd>
              </div>
              <div className="detail-row">
                <dt>📍 {t("cityLabel")}</dt>
                <dd>{cityLabel(t, product.city)}</dd>
              </div>
              <div className="detail-row">
                <dt>{t("categoryLabel")}</dt>
                <dd>{productCategoryLabel(t, product.category)}</dd>
              </div>
              {product.description && (
                <div className="detail-row detail-row-block">
                  <dt>ℹ️ {t("desc")}</dt>
                  <dd>{product.description}</dd>
                </div>
              )}
            </dl>
          </div>
        )}
      </div>
    </Modal>
  );
}
