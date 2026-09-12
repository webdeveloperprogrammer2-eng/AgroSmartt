export default function Avatar({ src, name = "", className = "" }) {
  const letter = String(name).trim().charAt(0).toUpperCase() || "?";

  return (
    <span className={`avatar ${className}`}>
      {src ? <img src={src} alt={name} className="avatar-img" /> : letter}
    </span>
  );
}
