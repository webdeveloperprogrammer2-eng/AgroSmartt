import { ArrowRight, PackageOpen, ShoppingCart, Trash2, X } from "lucide-react";
import Modal from "../../components/shared/Modal";
import { useTranslation } from "../../context/language";

export default function CartModal({ open, onClose, cart, totalPrice, onRemove, onCheckout }) {
  const { t } = useTranslation();
  const isEmpty = cart.length === 0;

  return (
    <Modal open={open} onClose={onClose} className="market-modal cart-modal">
      <div className="modal-content">
        <header className="modal-head">
          <h3 className="modal-title">
            <ShoppingCart size={19} strokeWidth={2.4} />
            {t("cartTitle")}
            {!isEmpty && <span className="modal-count">{cart.length}</span>}
          </h3>
          <button type="button" className="close-modal" onClick={onClose} aria-label={t("cancel")}>
            <X size={18} strokeWidth={2.6} />
          </button>
        </header>

        <div className="cart-items-list">
          {isEmpty ? (
            <div className="cart-empty">
              <PackageOpen size={38} strokeWidth={1.6} className="cart-empty-icon" />
              <p className="cart-empty-text">{t("cartEmpty")}</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price-qty">
                    {item.price} {t("somoniShort")} &times; {item.quantity}
                  </p>
                </div>
                <div className="cart-item-actions">
                  <b className="cart-item-total-price">{Number(item.price) * item.quantity} {t("somoniShort")}</b>
                  <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="cart-item-remove-btn"
                    aria-label={t("delete")}
                  >
                    <Trash2 size={15} strokeWidth={2.2} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <footer className="cart-footer">
          <div className="cart-summary">
            <span className="cart-summary-label">{t("price")}</span>
            <strong className="total-highlight">{totalPrice} {t("somoniShort")}</strong>
          </div>
          <button type="button" className="checkout-btn" disabled={isEmpty} onClick={onCheckout}>
            {t("checkout")} <ArrowRight size={16} aria-hidden="true" />
          </button>
        </footer>
      </div>
    </Modal>
  );
}
