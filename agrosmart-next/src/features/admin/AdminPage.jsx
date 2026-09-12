"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "./AdminHeader";
import AdminStats from "./AdminStats";
import AdminListPanel from "./AdminListPanel";
import AdminItemFormModal from "./AdminItemFormModal";
import { SECTIONS, SECTION_BY_KEY } from "./adminSections";
import { useUser } from "../../context/user";
import { useTranslation } from "../../context/language";
import { useDialog } from "../../context/dialog";

const asArray = (data) => (Array.isArray(data) ? data : []);

// Ҳолати аввалия: барои ҳар бахш рӯйхати холӣ
const emptyData = () => Object.fromEntries(SECTIONS.map((s) => [s.key, []]));

// Панели Admin/SuperAdmin.
// Кортҳои болоӣ ҳам ҳисобкунак ва ҳам тугмаи гузариш байни бахшҳоянд —
// саҳифа дар ҷои худ мемонад, танҳо рӯйхати поён иваз мешавад.
export default function AdminPage() {
  const { user, loading, isAdmin, isSuperAdmin, logout } = useUser();
  const router = useRouter();
  const { t } = useTranslation();
  const dialog = useDialog();

  const [data, setData] = useState(emptyData);
  const [tab, setTab] = useState(SECTIONS[0].key);
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const section = SECTION_BY_KEY[tab];

  // Танҳо admin/superadmin ба ин саҳифа дастрасӣ доранд.
  // Тафтиш баъд аз ба охир расидани барқарорсозии сессия иҷро мешавад.
  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/auth");
    else if (!isAdmin) router.replace("/");
  }, [loading, user, isAdmin, router]);

  // Ҳамаи чор бахш якбора бор мешаванд — рақамҳои болоӣ бояд ҳамеша
  // дуруст бошанд, новобаста аз он ки кадом таб кушода аст
  const loadAll = useCallback(async () => {
    const lists = await Promise.all(SECTIONS.map((s) => s.api.getAll().catch(() => [])));
    setData(Object.fromEntries(SECTIONS.map((s, i) => [s.key, asArray(lists[i])])));
  }, []);

  useEffect(() => {
    if (isAdmin) loadAll();
  }, [isAdmin, loadAll]);

  if (loading) return <div className="page-loading">{t("loading")}</div>;
  if (!user || !isAdmin) return null;

  const counts = Object.fromEntries(SECTIONS.map((s) => [s.key, data[s.key].length]));

  // Ҳар амал хатогиро худаш мегирад, то саҳифа "unhandled rejection" надиҳад
  // onDone формаро пеш аз хабари муваффақият мебандад — вагарна корбар
  // хабарро болои формаи ҳанӯз кушода мебинад
  async function run(action, successKey, onDone) {
    try {
      await action();
      await loadAll();
      onDone?.();
      await dialog.success(t(successKey));
      return true;
    } catch (err) {
      console.error(err);
      await dialog.error(t("error"));
      return false;
    }
  }

  async function handleAdd(payload) {
    const extra = section.createExtra ? section.createExtra(t, user) : {};
    await run(
      () => section.api.create({ ...payload, ...extra, userId: user.id }),
      section.addedKey,
      () => setAddOpen(false)
    );
  }

  async function handleEdit(payload) {
    // Сабти пурра нигоҳ дошта мешавад (PUT), то майдонҳои дар форма
    // набуда — масалан createdAt, userId ё farmerPhone — гум нашаванд
    await run(
      () => section.api.update(editItem.id, { ...editItem, ...payload }),
      section.updatedKey,
      () => setEditItem(null)
    );
  }

  async function handleDelete(item) {
    const ok = await dialog.confirm({
      title: t(section.deleteConfirmKey),
      description: t("actionIrreversible"),
      confirmText: t("deleteModalYes"),
      danger: true,
    });
    if (ok) await run(() => section.api.remove(item.id), section.deletedKey);
  }

  // Ҳангоми гузариш ба бахши дигар модали кушода бояд пӯшида шавад,
  // вагарна формаи замин бо маълумоти дору мемонад
  function handleTab(key) {
    setAddOpen(false);
    setEditItem(null);
    setTab(key);
  }

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <div className="admin-page min-h-screen bg-muted/30">
      <AdminHeader isSuperAdmin={isSuperAdmin} onLogout={handleLogout} />

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8">
        <AdminStats counts={counts} active={tab} onSelect={handleTab} />
        <AdminListPanel
          key={tab}
          section={section}
          items={data[tab]}
          onAdd={() => setAddOpen(true)}
          onEdit={setEditItem}
          onDelete={handleDelete}
        />
      </main>

      <AdminItemFormModal
        open={addOpen}
        section={section}
        initialData={null}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAdd}
      />
      <AdminItemFormModal
        open={Boolean(editItem)}
        section={section}
        initialData={editItem}
        onClose={() => setEditItem(null)}
        onSubmit={handleEdit}
      />
    </div>
  );
}
