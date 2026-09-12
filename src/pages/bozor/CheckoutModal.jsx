import { useEffect, useState } from "react";
import { Check, ClipboardCheck, Phone, User, X } from "lucide-react";
import Modal from "../../components/shared/Modal";
import { useTranslation } from "../../context/language";
import { buyerInfoFrom } from "../../lib/notify";

export default function CheckoutModal({ open, onClose, user, onSubmit }) {
  const [address, setAddress] = useState("");
  const [sending, setSending] = useState(false);
  const { t } = useTranslation();
  const { buyerName, buyerPhone } = buyerInfoFrom(user);

  useEffect(() => {
    if (open) {
      setAddress("");
      setSending(false);
    }
  }, [open]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    try {
      await onSubmit(address.trim());
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

          <label htmlFor="delivery-address">{t("addressPlaceholder")}</label>
          <input
            type="text"
            id="delivery-address"
            placeholder={t("addressPlaceholder")}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <button type="submit" className="confirm-order-btn" disabled={sending}>
            {t("checkout")} <Check size={17} strokeWidth={2.6} />
          </button>
        </form>
      </div>
    </Modal>
  );
}
