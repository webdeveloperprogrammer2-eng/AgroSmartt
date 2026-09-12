"use client";

import ProductCard from "./ProductCard";
import { useTranslation } from "../../context/language";

// Шабакаи маҳсулот дар саҳифаи Бозор
export default function ProductGrid({ products, onBuy, onDetail }) {
  const { t } = useTranslation();

  // Агар сервер ба ҷои рӯйхат чизи дигаре баргардонад, саҳифа набояд афтад
  const list = Array.isArray(products) ? products : [];

  if (list.length === 0) {
    return <h3 className="grid-empty-message">{t("noProductsFound")}</h3>;
  }

  return (
    <div className="box">
      {list.map((product) => (
        <ProductCard key={product.id} product={product} onBuy={onBuy} onDetail={onDetail} />
      ))}
    </div>
  );
}
