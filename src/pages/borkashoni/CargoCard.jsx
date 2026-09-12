import { ArrowRight, Check, MessageCircle, Package, Phone, Trash2, Truck, Weight } from "lucide-react";
import { cityLabel } from "../../lib/catalog";
import { useTranslation } from "../../context/language";

export default function CargoCard({ request, isOwner, isDriver, onAccept, onChat, onDelete }) {
  const { t } = useTranslation();
  const accepted = request.status === "accepted";

  return (
    <article className={`cargo-card ${accepted ? "is-accepted" : ""}`}>
      <header className="cargo-head">
        <span className="cargo-name">
          <Package size={15} strokeWidth={2.3} />
          {request.cargoName}
        </span>
        <span className={`cargo-status ${accepted ? "is-accepted" : ""}`}>
          {t(accepted ? "cargoAccepted" : "cargoOpen")}
        </span>
      </header>

      <div className="cargo-route">
        <span>{cityLabel(t, request.fromCity)}</span>
        <ArrowRight size={16} strokeWidth={2.4} />
        <span>{cityLabel(t, request.toCity)}</span>
      </div>

      <div className="cargo-facts">
        <span className="cargo-fact">
          <Weight size={13} strokeWidth={2.2} />
          {request.weight}
        </span>
        <span className="cargo-fact is-price">
          {request.price} {t("somoniShort")}
        </span>
      </div>

      {request.description && <p className="cargo-desc">{request.description}</p>}

      <div className="cargo-owner">
        <b>{request.creatorName}</b>
        <a href={`tel:${request.creatorPhone}`}>
          <Phone size={12} strokeWidth={2.3} />
          {request.creatorPhone}
        </a>
      </div>

      {accepted && !isOwner && (
        <div className="cargo-driver">
          <Truck size={13} strokeWidth={2.3} />
          {t("cargoYouTook")}
        </div>
      )}

      {accepted && isOwner && (
        <div className="cargo-driver">
          <Truck size={13} strokeWidth={2.3} />
          {t("cargoDriver")}: <b>{request.driverName || t("unknownValue")}</b>
          <a href={`tel:${request.driverPhone}`}>{request.driverPhone}</a>
        </div>
      )}

      <footer className="cargo-foot">
        {isDriver && !isOwner && !accepted && (
          <button type="button" className="cargo-accept" onClick={() => onAccept(request)}>
            <Check size={15} strokeWidth={2.6} />
            {t("cargoAcceptBtn")}
          </button>
        )}
        {isDriver && !isOwner && (
          <button type="button" className="cargo-chat" onClick={() => onChat(request)}>
            <MessageCircle size={14} strokeWidth={2.3} />
            {t("chatBtn")}
          </button>
        )}
        {isOwner && (
          <button type="button" className="cargo-delete" onClick={() => onDelete(request)}>
            <Trash2 size={14} strokeWidth={2.3} />
            {t("delete")}
          </button>
        )}
      </footer>
    </article>
  );
}
