import { Package } from "lucide-react";
import ProfileSection from "./ProfileSection";
import ProductItemCard from "./ProductItemCard";
import { useTranslation } from "../../context/language";

export default function ProductsSection({ products, onEdit, onDelete }) {
  const { t } = useTranslation();
  const list = Array.isArray(products) ? products : [];

  return (
    <ProfileSection
      Icon={Package}
      tone="green"
      title={t("productsSectionTitle")}
      count={list.length}
      emptyText={t("noProductsAddedYet")}
      isEmpty={list.length === 0}
    >
      {list.map((p) => (
        <ProductItemCard key={p.id} product={p} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ProfileSection>
  );
}
