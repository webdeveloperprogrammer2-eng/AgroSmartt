import RequestCard from "./RequestCard";
import { useTranslation } from "../../context/language";

export default function RequestGrid({ requests, onAccept, onEdit, onDelete }) {
  const { t } = useTranslation();

  const list = Array.isArray(requests) ? requests : [];

  if (list.length === 0) {
    return <div className="empty-text grid-empty-message">{t("noRequestsYet")}</div>;
  }

  return (
    <div className="cards-grid">
      {list.map((req) => (
        <RequestCard key={req.id} request={req} onAccept={onAccept} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
