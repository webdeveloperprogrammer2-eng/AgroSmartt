import FavoriteButton from "../../components/shared/FavoriteButton";
import { useTranslation } from "../../context/language";
import { cityLabel } from "../../lib/catalog";
import { imgOrPlaceholder } from "../../lib/images";

import { FileText, MapPin, Ruler, ShoppingCart } from "lucide-react";
export default function ZaminCard({ land, onSelect, onDetail }) {
  const { name, price, city, leftovers } = land;
  const { t } = useTranslation();

  return (
    <div className="card">
      <FavoriteButton itemType="zamin" itemId={land.id} />
      <img src={imgOrPlaceholder(land.img)} alt={name} loading="lazy" />
      <div>
        <div className="card-info">
          <h2 className="product-name">{name}</h2>
          <h2 className="product-price">{price} {t("somoniShort")}</h2>
          <h2 className="product-stock"><MapPin size={15} /> {t("landLocation")}: {cityLabel(t, city)}</h2>
          <h2 className="product-stock"><Ruler size={15} /> {t("landSize")}: {leftovers || 0} {t("sotikh")}</h2>
        </div>
        <div className="card-actions">
          <button className="btn-buy" onClick={() => onSelect(land)}>
            {t("buy")} <ShoppingCart size={16} />
          </button>
          <button className="btn-detail" onClick={() => onDetail(land)}>
            {t("details")} <FileText size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
