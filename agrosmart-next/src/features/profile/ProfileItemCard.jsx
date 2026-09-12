"use client";

import { MapPin, Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "../../context/language";

// Корти ягонаи кабинет — ҳар се бахш ҳамин кортро истифода мебаранд.
// Ихчам: тасвир пасттар, тег болои тасвир, тугмаи несткунӣ танҳо икона.
export default function ProfileItemCard({
  img,
  alt,
  tag,
  tone = "green",
  title,
  location,
  desc,
  price,
  meta,
  fallbackIcon: FallbackIcon,
  onEdit,
  onDelete,
}) {
  const { t } = useTranslation();

  return (
    <article className={`pcard tone-${tone}`}>
      <div className="pcard-media">
        {img ? (
          <img src={img} alt={alt} loading="lazy" />
        ) : (
          FallbackIcon && <FallbackIcon size={30} strokeWidth={1.6} />
        )}
        {tag && <span className="pcard-tag">{tag}</span>}
      </div>

      <div className="pcard-body">
        <h4 title={title}>{title}</h4>

        {location && (
          <p className="pcard-loc">
            <MapPin size={12} strokeWidth={2.4} /> {location}
          </p>
        )}

        <p className="pcard-desc">{desc}</p>

        <div className="pcard-foot">
          <span className="pcard-price">{price}</span>
          <span className="pcard-meta">{meta}</span>
        </div>

        <div className="pcard-actions">
          <button type="button" className="pcard-btn is-edit" onClick={onEdit}>
            <Pencil size={14} strokeWidth={2.3} /> {t("edit")}
          </button>
          <button
            type="button"
            className="pcard-btn is-delete"
            onClick={onDelete}
            title={t("delete")}
            aria-label={t("delete")}
          >
            <Trash2 size={15} strokeWidth={2.3} />
          </button>
        </div>
      </div>
    </article>
  );
}
