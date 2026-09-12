import { useTranslation } from "../../context/language";

import { Star } from "lucide-react";
const STARS = [5, 4, 3, 2, 1];

function countByStar(reviews) {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const item of reviews) {
    const star = Math.round(Number(item.rating) || 0);
    if (counts[star] !== undefined) counts[star] += 1;
  }
  return counts;
}

export default function DriverStats({ reviews, rating }) {
  const { t } = useTranslation();
  const total = reviews.length;

  if (total === 0) return null;

  const counts = countByStar(reviews);
  const max = Math.max(...Object.values(counts), 1);
  const positive = counts[5] + counts[4];
  const satisfaction = Math.round((positive / total) * 100);
  const ratingPercent = Math.round((rating / 5) * 100);

  const meters = [
    { key: "satisfaction", label: t("driverSatisfaction"), value: satisfaction, tone: "is-green" },
    { key: "rating", label: t("driverRatingLevel"), value: ratingPercent, tone: "is-amber" },
  ];

  return (
    <section className="dstats">
      <h2 className="dstats-title">{t("driverProgressTitle")}</h2>

      <div className="dstats-grid">
        <div className="dstats-card">
          <span className="dstats-card-label">{t("driverRatingSpread")}</span>

          <div className="dbars">
            {STARS.map((star) => {
              const count = counts[star];
              const percent = Math.round((count / max) * 100);
              return (
                <div key={star} className="dbar-row" title={`${star} — ${count}`}>
                  <span className="dbar-star">{star}<Star size={12} fill="currentColor" /></span>
                  <span className="dbar-track">
                    <span className="dbar-fill" style={{ width: `${percent}%` }} />
                  </span>
                  <span className="dbar-count">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="dstats-card">
          <span className="dstats-card-label">{t("driverProgressMeters")}</span>

          {meters.map(({ key, label, value, tone }) => (
            <div key={key} className="dmeter">
              <div className="dmeter-head">
                <span>{label}</span>
                <b>{value}%</b>
              </div>
              <span className="dmeter-track">
                <span className={`dmeter-fill ${tone}`} style={{ width: `${value}%` }} />
              </span>
            </div>
          ))}

          <p className="dstats-note">
            {t("driverReviewsCount")}: <b>{total}</b>
          </p>
        </div>
      </div>
    </section>
  );
}
