"use client";

import { useEffect, useRef, useState } from "react";
import MushtariNavbar from "./MushtariNavbar";
import RequestGrid from "./RequestGrid";
import CreateRequestModal from "./CreateRequestModal";
import EditRequestModal from "./EditRequestModal";
import AcceptOrderModal from "./AcceptOrderModal";
import RegRedirectModal from "./RegRedirectModal";
import LoadingOverlay from "./LoadingOverlay";
import { useUser } from "../../context/user";
import { useTranslation } from "../../context/language";
import { useDialog } from "../../context/dialog";
import { useRequests } from "./useRequests";

export default function MushtariPage() {
  const { user } = useUser();
  const { t } = useTranslation();
  const dialog = useDialog();
  const { requests, submitCreate, submitEdit, submitDelete } = useRequests(user, t, dialog);

  const [createOpen, setCreateOpen] = useState(false);
  const [editRequest, setEditRequest] = useState(null);
  const [acceptRequest, setAcceptRequest] = useState(null);
  const [regModalOpen, setRegModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const acceptTimerRef = useRef(null);

  // Агар корбар саҳифаро пеш аз ба охир расидани лоадер тарк кунад,
  // таймер бояд тоза шавад — вагарна ба компоненти нестшуда setState мешавад
  useEffect(() => () => clearTimeout(acceptTimerRef.current), []);

  function handleCreateClick() {
    if (!user) {
      setRegModalOpen(true);
      return;
    }
    setCreateOpen(true);
  }

  // Ҳангоми зер кардани "Тамос": 1.2 сония лоадер нишон медиҳем,
  // сипас модали дахлдорро мекушоем
  function handleAcceptClick(request) {
    clearTimeout(acceptTimerRef.current);
    setLoading(true);
    acceptTimerRef.current = setTimeout(() => {
      setLoading(false);
      if (!user) {
        setRegModalOpen(true);
      } else {
        setAcceptRequest(request);
      }
    }, 1200);
  }

  async function handleAcceptSubmit() {
    setAcceptRequest(null);
    await dialog.success(t("contractSuccess"));
  }

  return (
    <>
      <LoadingOverlay active={loading} />
      <MushtariNavbar />

      <main className="profile-content">
        <div className="welcome-header">
          <h1>🛒 {t("buyerRequestsTitle")}</h1>
          <p>{t("buyerRequestsDesc")}</p>
        </div>

        <div className="action-cards">
          <div className="action-card card-blue">
            <div className="card-bg-glow"></div>
            <span className="card-icon">📝</span>
            <h3>{t("newRequestTitle")}</h3>
            <p>{t("newRequestDesc")}</p>
            <button className="btn-action" onClick={handleCreateClick}>
              {t("createRequestBtn")}
            </button>
          </div>
        </div>

        <section className="section-container">
          <h2>📦 {t("currentRequestsTitle")}</h2>
          <RequestGrid
            requests={requests}
            onAccept={handleAcceptClick}
            onEdit={setEditRequest}
            onDelete={submitDelete}
          />
        </section>
      </main>

      <RegRedirectModal open={regModalOpen} onClose={() => setRegModalOpen(false)} />

      <CreateRequestModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={(form) => submitCreate(form, () => setCreateOpen(false))}
      />

      <EditRequestModal
        open={Boolean(editRequest)}
        onClose={() => setEditRequest(null)}
        request={editRequest}
        onSubmit={(form) => submitEdit(editRequest, form, () => setEditRequest(null))}
      />

      <AcceptOrderModal
        open={Boolean(acceptRequest)}
        onClose={() => setAcceptRequest(null)}
        request={acceptRequest}
        onSubmit={handleAcceptSubmit}
      />
    </>
  );
}
