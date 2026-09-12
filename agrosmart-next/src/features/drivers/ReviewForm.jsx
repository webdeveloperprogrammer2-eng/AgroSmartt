"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import StarRating from "../../components/shared/StarRating";
import { useTranslation } from "../../context/language";

// Формаи навиштани отзив — баҳо (ситора) + матн
export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const { t } = useTranslation();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (rating < 1) {
      setError(t("reviewNeedRating"));
      return;
    }
    setSending(true);
    try {
      await onSubmit({ rating, text: text.trim() });
      setRating(0);
      setText("");
    } catch (err) {
      setError(err.message || t("error"));
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="review-form-stars">
        <span>{t("reviewYourRating")}</span>
        <StarRating value={rating} onChange={setRating} size={22} />
      </div>
      <textarea
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t("reviewPlaceholder")}
      />
      {error && <p className="review-error">{error}</p>}
      <button type="submit" className="review-send" disabled={sending}>
        <Send size={15} strokeWidth={2.2} />
        {t("reviewSend")}
      </button>
    </form>
  );
}
