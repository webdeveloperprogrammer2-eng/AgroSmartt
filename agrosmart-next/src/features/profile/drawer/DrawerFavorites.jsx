"use client";

import { Heart, Pill, Sprout, X } from "lucide-react";
import { useTranslation } from "../../../context/language";

// Барои ҳар навъи мол икона ва суроғаи бозори худаш
const TYPES = {
  mahsulot: { Icon: Heart, to: "/bozor" },
  zamin: { Icon: Sprout, to: "/zamin" },
  ZaminApteka: { Icon: Pill, to: "/doruvori" },
};

// Молҳои нигоҳдоштаи корбар (/favorites).
// Агар мол аз бозор нест шуда бошад, сервер `item: null` медиҳад —
// чунин сатрро ҳамчун "мол нест шуд" нишон медиҳем, на сатри холӣ.
export default function DrawerFavorites({ items, loading, onRemove }) {
  const { t } = useTranslation();

  if (loading) return <p className="dw-empty">{t("loading")}</p>;

  if (items.length === 0) {
    return (
      <div className="dw-empty-box">
        <Heart size={30} strokeWidth={1.5} />
        <p>{t("favoritesEmpty")}</p>
      </div>
    );
  }

  return (
    <div className="dw-group">
      <h4 className="dw-group-title">
        {t("favoritesTitle")} <span className="dw-count">{items.length}</span>
      </h4>

      <ul className="dw-fav-list">
        {items.map((row) => {
          const { Icon } = TYPES[row.itemType] || TYPES.mahsulot;
          const item = row.item;
          return (
            <li key={row.id} className="dw-fav">
              <span className="dw-fav-icon">
                <Icon size={15} strokeWidth={2.2} />
              </span>
              <span className="dw-fav-body">
                <b>{item ? item.name : t("favoriteItemGone")}</b>
                {item && (
                  <small>
                    {item.price} {t("somoniShort")} · {item.city}
                  </small>
                )}
              </span>
              <button
                type="button"
                className="dw-fav-remove"
                onClick={() => onRemove(row)}
                aria-label={t("delete")}
              >
                <X size={14} strokeWidth={2.6} />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
