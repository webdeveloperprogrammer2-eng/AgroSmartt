import { useTranslation } from "../../context/language";

export default function LoadingOverlay({ active }) {
  const { t } = useTranslation();

  return (
    <div className={`loading-overlay ${active ? "active" : ""}`}>
      <div className="loader-spinner"></div>
      <p style={{ fontWeight: "bold", fontSize: 16 }}>{t("checkingUserData")}</p>
    </div>
  );
}
