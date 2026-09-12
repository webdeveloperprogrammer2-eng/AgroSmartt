"use client";

import { useRouter } from "next/navigation";
import Modal from "../../components/shared/Modal";
import { useTranslation } from "../../context/language";

// Модали огоҳкунӣ: агар корбар ҳанӯз регистратсия нашуда бошад
export default function RegRedirectModal({ open, onClose }) {
  const router = useRouter();
  const { t } = useTranslation();

  // Мустақиман ба саҳифаи сабти ном мебарем.
  // (Пештар ба "/" мебурд ва як калиди localStorage мемонд, ки ҳеҷ ҷо хонда намешуд —
  // барои ҳамин корбар дар саҳифаи асосӣ мемонд ва чизе намешуд.)
  function handleGoToReg() {
    onClose();
    router.push("/auth");
  }

  return (
    <Modal open={open} onClose={onClose} className="CustomModal">
      <div className="redirect-modal-content">
        <span className="warning-emoji-icon">⚠️</span>
        <h3 className="redirect-modal-title">
          {t("regRedirectTitle")}
        </h3>
        <p className="redirect-modal-desc">
          {t("regRedirectDesc")}
        </p>
        <button className="btn-action redirect-modal-btn" onClick={handleGoToReg}>
          📝 {t("goToReg")}
        </button>
      </div>
    </Modal>
  );
}
