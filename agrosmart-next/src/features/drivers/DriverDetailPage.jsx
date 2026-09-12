"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, MapPin, MessageCircle, Phone, Star } from "lucide-react";
import Avatar from "../../components/shared/Avatar";
import StarRating from "../../components/shared/StarRating";
import ReviewForm from "./ReviewForm";
import DriverStats from "./DriverStats";
import SettingsWidget from "../../components/shared/SettingsWidget";
import { usersApi } from "../../api/usersApi";
import { chatApi } from "../../api/chatApi";
import { averageRating, reviewsApi } from "../../api/reviewsApi";
import { useUser } from "../../context/user";
import { useTranslation } from "../../context/language";
import "./drivers.css";

// Саҳифаи як ронанда: маълумот, отзивҳо ва тугмаи чат
export default function DriverDetailPage() {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { user } = useUser();
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    usersApi
      .getById(id)
      .then((found) => {
        setDriver(found);
        setReviews(Array.isArray(found?.reviews) ? found.reviews : []);
      })
      .catch(() => setDriver(null));
  }, [id]);

  async function handleAddReview({ rating, text }) {
    const next = await reviewsApi.add(id, {
      authorId: user.id,
      authorName: user.userName || t("unknownValue"),
      rating,
      text,
    });
    setReviews(next);
  }

  // Чат бо ҳамин ронанда. Агар сӯҳбат аллакай бошад, сервер ҳамонро медиҳад.
  async function handleChat() {
    const chat = await chatApi.open({ buyerId: user.id, sellerId: driver.id });
    router.push(`/chats/${chat.id}`);
  }

  if (!driver) return <div className="page-loading">{t("loading")}</div>;

  const rating = averageRating(reviews);
  const isSelf = String(user?.id) === String(driver.id);

  return (
    <>
      <header className="main-navbar">
        <Link href="/ronandagon" className="nav-back">
          <ArrowLeft size={18} strokeWidth={2.4} />
          {t("backBtn")}
        </Link>
        <div className="nav-logo">{driver.userName}</div>
        <SettingsWidget />
      </header>

      <main className="driver-page">
        <section className="driver-hero">
          <Avatar src={driver.avatar} name={driver.userName} className="driver-avatar is-big" />
          <h1>{driver.userName}</h1>
          <div className="driver-hero-rate">
            <StarRating value={rating} size={18} />
            <b>{rating > 0 ? rating : "—"}</b>
            <small>({reviews.length})</small>
          </div>
          <div className="driver-hero-meta">
            <a href={`tel:${driver.userPhone}`}>
              <Phone size={14} strokeWidth={2.2} /> {driver.userPhone}
            </a>
            <span>
              <MapPin size={14} strokeWidth={2.2} /> {driver.city || t("unknownValue")}
            </span>
          </div>

          {user && !isSelf && (
            <button type="button" className="driver-chat-btn" onClick={handleChat}>
              <MessageCircle size={16} strokeWidth={2.3} />
              {t("chatWithDriver")}
            </button>
          )}
        </section>

        <DriverStats reviews={reviews} rating={rating} />

        <section className="reviews-block">
          <h2>
            <Star size={17} strokeWidth={2.3} /> {t("reviewsTitle")}
          </h2>

          {user && !isSelf && <ReviewForm onSubmit={handleAddReview} />}
          {!user && <p className="review-hint">{t("reviewNeedLogin")}</p>}

          {reviews.length === 0 ? (
            <p className="review-hint">{t("reviewsEmpty")}</p>
          ) : (
            <ul className="review-list">
              {reviews.map((item) => (
                <li key={item.id} className="review-item">
                  <div className="review-item-head">
                    <b>{item.authorName}</b>
                    <StarRating value={item.rating} size={13} />
                  </div>
                  {item.text && <p>{item.text}</p>}
                  <time>{new Date(item.createdAt).toLocaleDateString()}</time>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
