import FavoriteButton from "../../components/shared/FavoriteButton";
import { useTranslation } from "../../context/language";
import { imgOrPlaceholder } from "../../lib/images";

import { FileText, ShoppingCart } from "lucide-react";
export default function ProductCard({ product, onBuy, onDetail }) {
  const { img, name, price, leftovers } = product;
  const { t } = useTranslation();

  return (
    <div className="card">
      <div className="card-media">
        <img src={imgOrPlaceholder(img)} alt={name} loading="lazy" />
        <FavoriteButton itemType="mahsulot" itemId={product.id} />
        <span className="card-stock-badge">
          {leftovers} {t("kg")}
        </span>
      </div>

      <div className="card-body">
        <h2 className="product-name" title={name}>{name}</h2>
        <h2 className="product-price">
          {price}
          <span className="price-unit">{t("somoniShort")}</span>
        </h2>

        <div className="card-actions">
          <button className="btn-buy" onClick={() => onBuy(product)}>
            {t("buy")} <ShoppingCart size={16} />
          </button>
          <button
            className="btn-detail"
            onClick={() => onDetail(product)}
            title={t("details")}
            aria-label={t("details")}
          >
            <FileText size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
