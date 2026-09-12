"use client";

import Link from "next/link";
import { MapPin, MessageCircle, Truck } from "lucide-react";
import Avatar from "../../components/shared/Avatar";
import StarRating from "../../components/shared/StarRating";
import { useTranslation } from "../../context/language";

// Кортчаи як ронанда дар рӯйхат
export default function DriverCard({ driver, rating, reviewsCount }) {
  const { t } = useTranslation();
  const letter = (driver.userName || "?").charAt(0).toUpperCase();

  return (
    <Link href={`/ronandagon/${driver.id}`} className="driver-card">
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
        <span className="driver-chat-hint">
          <MessageCircle size={13} strokeWidth={2.2} />
          {t("chatBtn")}
        </span>
      </span>
    </Link>
  );
}
