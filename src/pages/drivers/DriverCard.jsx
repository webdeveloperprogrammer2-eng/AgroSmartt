import { Link, useNavigate } from "react-router-dom";
import { MapPin, MessageCircle, Truck } from "lucide-react";
import Avatar from "../../components/shared/Avatar";
import StarRating from "../../components/shared/StarRating";
import { useTranslation } from "../../context/language";
import { useUser } from "../../context/user";
import { chatApi } from "../../api/chatApi";

export default function DriverCard({ driver, rating, reviewsCount }) {
  const { t } = useTranslation();
  const { user } = useUser();
  const navigate = useNavigate();
  const letter = (driver.userName || "?").charAt(0).toUpperCase();

  async function handleChat(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!user) {
      navigate("/auth");
      return;
    }
    const chat = await chatApi.open({ buyerId: user.id, sellerId: driver.id });
    navigate(`/chats/${chat.id}`);
  }

  return (
    <Link to={`/ronandagon/${driver.id}`} className="driver-card">
      <Avatar src={driver.avatar} name={driver.userName || letter} className="driver-avatar" />

      <span className="driver-body">
        <b className="driver-name">{driver.userName || t("unknownValue")}</b>
        <span className="driver-city">
          <MapPin size={13} strokeWidth={2.2} />
          {driver.city || t("unknownValue")}
        </span>
        <span className="driver-rate">
          <StarRating value={rating} size={14} />
          <b>{rating > 0 ? rating : "—"}</b>
          <small>
            ({reviewsCount} {t("reviewsShort")})
          </small>
        </span>
      </span>

      <span className="driver-actions">
        <span className="driver-badge">
          <Truck size={13} strokeWidth={2.2} />
          {t("accountTypeDriver")}
        </span>
        <button type="button" className="driver-chat-hint" onClick={handleChat}>
          <MessageCircle size={13} strokeWidth={2.2} />
          {t("chatBtn")}
        </button>
      </span>
    </Link>
  );
}
