import { useCallback, useEffect, useRef, useState } from "react";
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
import { fetchRequests, createRequest, updateRequest, deleteRequest } from "./api";
import "./mushtari.css";

import { ClipboardList, Package, ShoppingCart } from "lucide-react";
export default function MushtariPage() {
  const { user } = useUser();
  const [requests, setRequests] = useState([]);
  const { t } = useTranslation();
  const dialog = useDialog();

  const [createOpen, setCreateOpen] = useState(false);
  const [editRequest, setEditRequest] = useState(null);
  const [acceptRequest, setAcceptRequest] = useState(null);
  const [regModalOpen, setRegModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const acceptTimerRef = useRef(null);

  const loadRequests = useCallback(async () => {
    try {
      const data = await fetchRequests();
      setRequests(Array.isArray(data) ? data : []);
    } catch {
      setRequests([]);
    }
  }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  useEffect(() => () => clearTimeout(acceptTimerRef.current), []);

  function handleCreateClick() {
    if (!user) {
      setRegModalOpen(true);
      return;
    }
    setCreateOpen(true);
  }

  async function handleCreateSubmit(form) {
    const newRequest = {
      companyName: form.company,
      productName: form.product,
      volume: form.volume,
      description: form.desc,
      userId: user.id,
      creatorName: user.userName || user.name || t("defaultFarmerName"),
      creatorPhone: user.userPhone || user.phone || "",
      createdAt: new Date().toISOString(),
    };

    try {
      await createRequest(newRequest);
      setCreateOpen(false);
      await loadRequests();
      await dialog.success(t("contractSuccess"));
    } catch {
      await dialog.error(t("error"));
    }
  }

  async function handleEditSubmit(form) {
    try {
      await updateRequest(editRequest.id, { ...editRequest, ...form });
      setEditRequest(null);
      await loadRequests();
      await dialog.success(t("requestUpdated"));
    } catch {
      await dialog.error(t("error"));
    }
  }

  async function handleDelete(request) {
    const ok = await dialog.confirm({
      title: t("deleteRequestConfirm"),
      description: t("actionIrreversible"),
      confirmText: t("deleteModalYes"),
      danger: true,
    });
    if (!ok) return;
    try {
      await deleteRequest(request.id);
      await loadRequests();
      await dialog.success(t("requestDeleted"));
    } catch {
      await dialog.error(t("error"));
    }
  }

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
          <h1><ShoppingCart className="head-icon" strokeWidth={2.2} /> {t("buyerRequestsTitle")}</h1>
          <p>{t("buyerRequestsDesc")}</p>
        </div>

        <div className="action-cards">
          <div className="action-card card-blue">
            <div className="card-bg-glow"></div>
            <span className="card-icon"><ClipboardList strokeWidth={1.9} /></span>
            <h3>{t("newRequestTitle")}</h3>
            <p>{t("newRequestDesc")}</p>
            <button className="btn-action" onClick={handleCreateClick}>
              {t("createRequestBtn")}
            </button>
          </div>
        </div>

        <section className="section-container">
          <h2><Package className="sec-icon" strokeWidth={2.2} /> {t("currentRequestsTitle")}</h2>
          <RequestGrid
            requests={requests}
            onAccept={handleAcceptClick}
            onEdit={setEditRequest}
            onDelete={handleDelete}
          />
        </section>
      </main>

      <RegRedirectModal open={regModalOpen} onClose={() => setRegModalOpen(false)} />

      <CreateRequestModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreateSubmit}
      />

      <EditRequestModal
        open={Boolean(editRequest)}
        onClose={() => setEditRequest(null)}
        request={editRequest}
        onSubmit={handleEditSubmit}
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
