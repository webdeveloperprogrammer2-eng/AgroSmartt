"use client";

import { useEffect, useState } from "react";
import { ClipboardCheck, X, User, Phone } from "lucide-react";
import Modal from "../../components/shared/Modal";
import { useTranslation } from "../../context/language";
import { buyerInfoFrom } from "../../lib/notify";

// Дархости иҷораи замин. Рақами телефон дигар пурсида намешавад —
// он аз сабти номи корбар гирифта мешавад ва ба соҳиби замин меравад.
export default function ZaminCheckoutModal({ open, onClose, user, onSubmit }) {
  const [sending, setSending] = useState(false);
  const { t } = useTranslation();
  const { buyerName, buyerPhone } = buyerInfoFrom(user);

  useEffect(() => {
    if (open) setSending(false);
  }, [open]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    try {
      await onSubmit();
    } finally {
      setSending(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} className="market-modal">
      <div className="modal-content">
        <header className="modal-head">
          <h3 className="modal-title">
            <ClipboardCheck size={19} strokeWidth={2.4} />
            {t("checkoutTitle")}
          </h3>
          <button type="button" className="close-modal" onClick={onClose} aria-label={t("cancel")}>
            <X size={18} strokeWidth={2.6} />
          </button>
        </header>

        <form id="checkout-form" onSubmit={handleSubmit}>
          <div className="contact-card">
            <span className="contact-card-label">{t("yourContactInfo")}</span>
            <span className="contact-card-row">
              <User size={15} strokeWidth={2.2} />
              {buyerName || t("unknownValue")}
            </span>
            <span className="contact-card-row">
              <Phone size={15} strokeWidth={2.2} />
              {buyerPhone || t("unknownValue")}
            </span>
          </div>

          <p className="checkout-note">{t("landRequestNote")}</p>

          <button
            type="submit"
            className="confirm-order-btn confirm-order-btn-zamin"
            disabled={sending}
          >
            {t("checkout")}
          </button>
        </form>
      </div>
    </Modal>
  );
}
