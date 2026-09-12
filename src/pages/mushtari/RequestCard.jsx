import { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/user";
import { useTranslation } from "../../context/language";

import { Building2, Pencil, Phone, Trash2 } from "lucide-react";
export default function RequestCard({ request, onAccept, onEdit, onDelete }) {
  const { user } = useUser();
  const [showManage, setShowManage] = useState(false);
  const hoverTimer = useRef(null);
  const { t } = useTranslation();

  const isOwner = Boolean(
    user &&
      (request.userId
        ? String(request.userId) === String(user.id)
        : (user.userPhone || "") !== "" && user.userPhone === request.creatorPhone)
  );

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  function handleMouseEnter() {
    if (!isOwner || showManage) return;
    hoverTimer.current = setTimeout(() => setShowManage(true), 1500);
  }

  function handleMouseLeave() {
    clearTimeout(hoverTimer.current);
  }

  const tagText = t("productWantedTag");
  const volumeLabel = t("requiredVolumeLabel");
  const editText = t("edit");
  const deleteText = t("deleteRequestBtn");

  return (
    <div
      className="display-card card-border-blue request-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => isOwner && setShowManage(true)}
    >
      <div className="user-icon-avatar"><Building2 size={20} strokeWidth={2.1} /></div>
      <div className="display-card-body">
        <span className="card-tag tag-blue">{tagText}</span>
        <h4>{request.companyName}</h4>
        <p className="card-desc">
          <strong>{t("productPlaceholder")}:</strong> {request.productName}
          <br />
          {request.description}
        </p>
        <div className="card-footer-info">
          <div>
            <span className="card-price price-blue">{request.volume}</span>
            <div className="card-count">{volumeLabel}</div>
          </div>
          <button className="btn-accept-order" onClick={() => onAccept(request)}>
            <Phone size={16} /> {t("contactBtn")}
          </button>
        </div>

        {showManage && (
          <div className="manage-box">
            <div className="card-manage-actions">
              <button className="btn-card-edit" onClick={() => onEdit(request)}>
                <Pencil size={15} /> {editText}
              </button>
              <button className="btn-card-delete" onClick={() => onDelete(request)}>
                <Trash2 size={15} /> {deleteText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
