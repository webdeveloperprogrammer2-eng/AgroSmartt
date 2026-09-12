import { Star } from "lucide-react";

const STARS = [1, 2, 3, 4, 5];

export default function StarRating({ value = 0, onChange, size = 16 }) {
  const readOnly = typeof onChange !== "function";

  return (
    <span className={`star-rating ${readOnly ? "" : "is-input"}`}>
      {STARS.map((star) => {
        const filled = star <= Math.round(value);
        const icon = <Star size={size} strokeWidth={2.2} className={filled ? "star-on" : "star-off"} />;

        if (readOnly) return <span key={star}>{icon}</span>;
        return (
          <button key={star} type="button" onClick={() => onChange(star)} aria-label={`${star}`}>
            {icon}
          </button>
        );
      })}
    </span>
  );
}
