import { useNavigate } from "react-router-dom";
import Modal from "../../components/shared/Modal";
import { useTranslation } from "../../context/language";

import { ClipboardList, TriangleAlert } from "lucide-react";
export default function RegRedirectModal({ open, onClose }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  function handleGoToReg() {
    onClose();
    navigate("/auth");
  }

  return (
    <Modal open={open} onClose={onClose} className="CustomModal">
      <div className="redirect-modal-content">
        <span className="warning-emoji-icon"><TriangleAlert size={34} strokeWidth={2} /></span>
        <h3 className="redirect-modal-title">
          {t("regRedirectTitle")}
        </h3>
        <p className="redirect-modal-desc">
          {t("regRedirectDesc")}
        </p>
        <button className="btn-action redirect-modal-btn" onClick={handleGoToReg}>
          <ClipboardList size={16} /> {t("goToReg")}
        </button>
      </div>
    </Modal>
  );
}
