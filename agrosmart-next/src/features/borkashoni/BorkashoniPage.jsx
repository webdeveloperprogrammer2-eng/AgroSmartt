"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Truck } from "lucide-react";
import CargoCard from "./CargoCard";
import CargoFormModal from "./CargoFormModal";
import MenuNavbar from "../menu/MenuNavbar";
import { chatApi } from "../../api/chatApi";
import { useUser } from "../../context/user";
import { useTranslation } from "../../context/language";
import { useDialog } from "../../context/dialog";
import {
  acceptCargoRequest,
  createCargoRequest,
  deleteCargoRequest,
  fetchCargoRequests,
  visibleCargoFor,
} from "./api";
import "./borkashoni.css";

// Тахтаи боркашонӣ: харидорон ва фурӯшандагон дархост мемонанд,
// ронандагон қабул мекунанд. Ҳарду амал танҳо барои корбарони
// сабтшудаи AgroSmart кушода аст.
export default function BorkashoniPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const { user } = useUser();
  const { t } = useTranslation();
  const dialog = useDialog();
  const router = useRouter();

  function load() {
    setLoading(true);
    fetchCargoRequests()
      .then(setRequests)
      .catch(() => setRequests([]))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleCreate(data) {
    await createCargoRequest({
      ...data,
      userId: user.id,
      creatorName: user.userName || "",
      creatorPhone: user.userPhone || "",
    });
    setFormOpen(false);
    load();
  }

  async function handleAccept(request) {
    const ok = await dialog.confirm({ title: t("cargoAcceptConfirm"), confirmText: t("cargoAcceptBtn") });
    if (!ok) return;
    await acceptCargoRequest(request.id, user);
    load();
  }

  async function handleDelete(request) {
    const ok = await dialog.confirm({ title: t("cargoDeleteConfirm"), danger: true, confirmText: t("delete") });
    if (!ok) return;
    await deleteCargoRequest(request.id);
    load();
  }

  async function handleChat(request) {
    const chat = await chatApi.open({ buyerId: user.id, sellerId: request.userId });
    router.push(`/chats/${chat.id}`);
  }

  // Дархостҳои гирифташуда аз чашми бегона пинҳон мешаванд
  const visible = visibleCargoFor(requests, user);

  return (
    <>
      <MenuNavbar onProfileClick={(logged) => router.push(logged ? "/profile" : "/auth")} />

      <main className="cargo-page">
        <header className="cargo-hero">
          <div>
            <h1>
              <Truck size={24} strokeWidth={2.2} /> {t("cargoTitle")}
            </h1>
            <p>{t("cargoDesc")}</p>
          </div>

          {user ? (
            <button type="button" className="cargo-new" onClick={() => setFormOpen(true)}>
              <Plus size={17} strokeWidth={2.6} />
              {t("cargoNewTitle")}
            </button>
          ) : (
            <Link href="/auth" className="cargo-new">
              {t("cargoLoginToPost")}
            </Link>
          )}
        </header>

        {/* Меҳмон танҳо тамошо мекунад — гузоштан ва қабул кардан баста аст */}
        {!user && <p className="cargo-guest">{t("cargoGuestHint")}</p>}

        {loading && <div className="page-loading">{t("loading")}</div>}

        {!loading && visible.length === 0 && (
          <div className="cargo-empty">
            <Truck size={40} strokeWidth={1.4} />
            <p>{t("cargoEmpty")}</p>
          </div>
        )}

        <div className="cargo-grid">
          {visible.map((request) => (
            <CargoCard
              key={request.id}
              request={request}
              isOwner={Boolean(user) && String(user.id) === String(request.userId)}
              isDriver={user?.accountType === "driver"}
              onAccept={handleAccept}
              onChat={handleChat}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>

      <CargoFormModal open={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleCreate} />
    </>
  );
}
