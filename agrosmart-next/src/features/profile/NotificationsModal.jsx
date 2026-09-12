"use client";

import Link from "next/link";
import { Bell, X, Trash2, Phone, User, MapPin, ShoppingBag, Sprout, Pill, Truck, MessageCircle } from "lucide-react";
import Modal from "../../components/shared/Modal";
import { useTranslation } from "../../context/language";

const TYPE_META = {
  order: { Icon: ShoppingBag, titleKey: "notifNewOrder" },
  land: { Icon: Sprout, titleKey: "notifNewLandRequest" },
  medicine: { Icon: Pill, titleKey: "notifNewMedicineOrder" },
};

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleString();
}

// Модали хабарномаҳо — дар МАРКАЗИ экран кушода мешавад (на зери иконка)
export default function NotificationsModal({ open, onClose, items, chatUnread = 0, onRemove, onClearAll, onChatWithBuyer }) {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose} className="market-modal notif-modal">
      <div className="modal-content">
        <header className="modal-head">
          <h3 className="modal-title">
            <Bell size={19} strokeWidth={2.4} />
            {t("notifications")}
            {items.length + chatUnread > 0 && <span className="modal-count">{items.length + chatUnread}</span>}
          </h3>
          <button type="button" className="close-modal" onClick={onClose} aria-label={t("cancel")}>
            <X size={18} strokeWidth={2.6} />
          </button>
        </header>

        <div className="notif-list">
          {/* Паёмҳои нави чат ҳам ҳамин ҷо мебароянд — вагарна корбар
              танҳо ҳангоми кушодани саҳифаи чат аз онҳо хабардор мешуд */}
          {chatUnread > 0 && (
            <Link href="/chats" className="notif-chat-row" onClick={onClose}>
              <span className="notif-chat-icon">
                <MessageCircle size={17} strokeWidth={2.3} />
              </span>
              <span className="notif-chat-text">
                <b>{t("notifNewMessages")}</b>
                <small>{t("notifOpenChats")}</small>
              </span>
              <span className="notif-chat-count">{chatUnread}</span>
            </Link>
          )}

          {items.length === 0 && chatUnread === 0 ? (
            <div className="cart-empty">
              <Bell size={38} strokeWidth={1.6} className="cart-empty-icon" />
              <p className="cart-empty-text">{t("notificationsEmpty")}</p>
            </div>
          ) : (
            items.map((n) => {
              const { Icon, titleKey } = TYPE_META[n.type] || TYPE_META.order;
              return (
                <article key={n.id} className={`notif-card ${n.read ? "" : "is-unread"}`}>
                  <div className="notif-card-head">
                    <span className="notif-type">
                      <Icon size={15} strokeWidth={2.3} />
                      {t(titleKey)}
                    </span>
                    <div className="notif-card-actions">
                      {!n.read && <span className="notif-new-dot">{t("notifNew")}</span>}
                      <button
                        type="button"
                        className="cart-item-remove-btn"
                        onClick={() => onRemove(n.id)}
                        aria-label={t("delete")}
                      >
                        <Trash2 size={14} strokeWidth={2.2} />
                      </button>
                    </div>
                  </div>

                  {/* Ном ва рақами харидор — асли ҳамин хабарнома */}
                  <div className="notif-buyer">
                    <span className="notif-buyer-row">
                      <User size={14} strokeWidth={2.2} />
                      {n.buyerName || t("unknownValue")}
                    </span>
                    <a className="notif-buyer-row notif-phone" href={`tel:${n.buyerPhone}`}>
                      <Phone size={14} strokeWidth={2.2} />
                      {n.buyerPhone || t("unknownValue")}
                    </a>
                    {n.address && (
                      <span className="notif-buyer-row">
                        <MapPin size={14} strokeWidth={2.2} />
                        {n.address}
                      </span>
                    )}
                  </div>

                  <ul className="notif-items">
                    {(n.items || []).map((line, i) => (
                      <li key={i}>
                        <span>{line.name}</span>
                        <span className="notif-item-qty">
                          {line.quantity} × {line.price} {t("somoniShort")}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <footer className="notif-card-foot">
                    <time>{formatDate(n.createdAt)}</time>
                    <strong>
                      {t("notifTotal")}: {n.total} {t("somoniShort")}
                    </strong>
                  </footer>

                  {/* Аз ҳамин хабарнома: ё ба рӯйхати ронандагон, ё рост ба чат бо харидор */}
                  <div className="notif-links">
                    <Link href="/ronandagon" className="notif-link-btn" onClick={onClose}>
                      <Truck size={12} strokeWidth={2.4} />
                      {t("driversTitle")}
                    </Link>
                    {n.buyerId != null && (
                      <button
                        type="button"
                        className="notif-link-btn"
                        onClick={() => onChatWithBuyer(n)}
                      >
                        <MessageCircle size={12} strokeWidth={2.4} />
                        {t("chatWithBuyer")}
                      </button>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <footer className="cart-footer">
            <button type="button" className="notif-clear-btn" onClick={onClearAll}>
              <Trash2 size={15} strokeWidth={2.2} />
              {t("notificationsClear")}
            </button>
          </footer>
        )}
      </div>
    </Modal>
  );
}
