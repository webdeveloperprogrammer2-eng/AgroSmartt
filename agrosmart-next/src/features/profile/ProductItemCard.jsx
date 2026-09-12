"use client";

import { Package } from "lucide-react";
import ProfileItemCard from "./ProfileItemCard";
import { useTranslation } from "../../context/language";
import { cityLabel, productCategoryLabel } from "../../lib/catalog";

// Корти як маҳсулоти худи корбар
export default function ProductItemCard({ product, onEdit, onDelete }) {
  const { t } = useTranslation();

  return (
    <ProfileItemCard
      img={product.img}
      alt={t("productImgAlt")}
      fallbackIcon={Package}
      tag={productCategoryLabel(t, product.category)}
      tone="green"
      title={product.name}
      location={cityLabel(t, product.city)}
      desc={product.description || t("noDescription")}
      price={`${product.price} ${t("somoniShort")}`}
      meta={`${product.leftovers || 0} ${t("kg")}`}
      onEdit={() => onEdit(product)}
      onDelete={() => onDelete(product)}
    />
  );
}
