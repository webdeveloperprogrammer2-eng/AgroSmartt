import ZaminCard from "./ZaminCard";
import { useTranslation } from "../../context/language";

export default function ZaminGrid({ lands, onSelect, onDetail }) {
  const { t } = useTranslation();

  const list = Array.isArray(lands) ? lands : [];

  if (list.length === 0) {
    return <h3 className="grid-empty-message">{t("noLandsFound")}</h3>;
  }

  return (
    <div className="box">
      {list.map((land) => (
        <ZaminCard key={land.id} land={land} onSelect={onSelect} onDetail={onDetail} />
      ))}
    </div>
  );
}
