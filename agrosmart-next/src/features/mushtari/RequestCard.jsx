"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/user";
import { useTranslation } from "../../context/language";

// Як корти дархости харидор. Агар корбари ҷорӣ соҳиби дархост бошад,
// баъд аз 1.5 сонияи ҳовер тугмаҳои Таҳрир/Нест кардан пайдо мешаванд.
export default function RequestCard({ request, onAccept, onEdit, onDelete }) {
  const { user } = useUser();
  const [showManage, setShowManage] = useState(false);
  const hoverTimer = useRef(null);
  const { t } = useTranslation();

  // Соҳиби дархост бо ID муайян мешавад, на бо ном — ном такрор шуданаш мумкин аст
  const isOwner = Boolean(
    user &&
      (request.userId
        ? String(request.userId) === String(user.id)
        : (user.userPhone || "") !== "" && user.userPhone === request.creatorPhone)
  );

  // Таймери ҳовер ҳангоми нест шудани корт тоза карда мешавад
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
      // Барои корбарони клавиатура тугмаҳои идора фавран пайдо мешаванд
      onFocus={() => isOwner && setShowManage(true)}
    >
      <div className="user-icon-avatar">🏢</div>
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
            📞 {t("contactBtn")}
          </button>
        </div>

        {showManage && (
          <div className="manage-box">
            <div className="card-manage-actions">
              <button className="btn-card-edit" onClick={() => onEdit(request)}>
                ✏️ {editText}
              </button>
              <button className="btn-card-delete" onClick={() => onDelete(request)}>
                ❌ {deleteText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
