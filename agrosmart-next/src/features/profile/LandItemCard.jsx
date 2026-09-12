"use client";

import { Tractor } from "lucide-react";
import ProfileItemCard from "./ProfileItemCard";
import { useTranslation } from "../../context/language";
import { cityLabel } from "../../lib/catalog";

// Корти як замини худи корбар
export default function LandItemCard({ land, onEdit, onDelete }) {
  const { t } = useTranslation();

  return (
    <ProfileItemCard
      img={land.img}
      alt={t("landImgAlt")}
      fallbackIcon={Tractor}
      tag={t("rentTag")}
      tone="blue"
      title={land.name || t("landDefaultName")}
      location={cityLabel(t, land.city)}
      desc={land.desc || t("landNoExtraInfo")}
      price={`${land.price} ${t("perMonthShort")}`}
      meta={`${land.leftovers || land.landArea || 0} ${t("sotikh")}`}
      onEdit={() => onEdit(land)}
      onDelete={() => onDelete(land)}
    />
  );
}
