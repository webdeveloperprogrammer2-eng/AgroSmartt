"use client";

// Аватари корбар: агар сурат гузошта бошад — ҳамон сурат,
// вагарна ҳарфи аввали ном (мисли пештара).
export default function Avatar({ src, name = "", className = "" }) {
  const letter = String(name).trim().charAt(0).toUpperCase() || "?";

  return (
    <span className={`avatar ${className}`}>
      {src ? <img src={src} alt={name} className="avatar-img" /> : letter}
    </span>
  );
}
