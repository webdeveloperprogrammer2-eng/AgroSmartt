import { Info, MapPin, Ruler, X } from "lucide-react";
import Modal from "../../components/shared/Modal";
import { useTranslation } from "../../context/language";
import { cityLabel } from "../../lib/catalog";
import { imgOrPlaceholder } from "../../lib/images";

export default function ZaminDetailModal({ open, onClose, land }) {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose} className="market-modal detail-modal">
      <div className="modal-content">
        <button type="button" className="close-modal close-floating" onClick={onClose} aria-label={t("cancel")}>
          <X size={18} strokeWidth={2.6} />
        </button>
        {land && (
          <div className="product-detail-view">
            <img
              src={imgOrPlaceholder(land.img)}
              className="product-detail-img"
              alt={land.name}
            />
            <h2 className="product-detail-title zamin-accent">{land.name}</h2>

            <dl className="detail-rows">
              <div className="detail-row">
                <dt>{t("landPrice")}</dt>
                <dd className="detail-value-accent zamin-accent">
                  {land.price} {t("somoniShort")} {t("landPriceAnnual")}
                </dd>
              </div>
              <div className="detail-row">
                <dt><MapPin size={15} /> {t("landLocation")}</dt>
                <dd>{cityLabel(t, land.city)}</dd>
              </div>
              <div className="detail-row">
                <dt><Ruler size={15} /> {t("landSize")}</dt>
                <dd>{land.leftovers || 0} {t("sotikh")}</dd>
              </div>
              <div className="detail-row detail-row-block">
                <dt><Info size={15} /> {t("desc")}</dt>
                <dd>{land.desc || t("landNoExtraInfo")}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </Modal>
  );
}
