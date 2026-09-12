import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminUsersDrawer from "./users/AdminUsersDrawer";
import AdminUserModal from "./users/AdminUserModal";
import { useAdminUsers } from "./users/useAdminUsers";
import { usersApi } from "../../api/usersApi";
import AdminStats from "./AdminStats";
import AdminOverview from "./AdminOverview";
import AdminListPanel from "./AdminListPanel";
import AdminItemFormModal from "./AdminItemFormModal";
import { SECTIONS, SECTION_BY_KEY } from "./adminSections";
import { useUser } from "../../context/user";
import { useTranslation } from "../../context/language";
import { useDialog } from "../../context/dialog";

const asArray = (data) => (Array.isArray(data) ? data : []);

const emptyData = () => Object.fromEntries(SECTIONS.map((s) => [s.key, []]));

export default function AdminPage() {
  const { user, loading, isAdmin, isSuperAdmin, logout } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dialog = useDialog();

  const [data, setData] = useState(emptyData);
  const [tab, setTab] = useState(SECTIONS[0].key);
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [usersOpen, setUsersOpen] = useState(false);
  const [pickedUser, setPickedUser] = useState(null);
  const adminUsers = useAdminUsers();

  const section = SECTION_BY_KEY[tab];

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/auth", { replace: true });
    else if (!isAdmin) navigate("/", { replace: true });
  }, [loading, user, isAdmin, navigate]);

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


  async function handleBanUser(target, days, termLabel) {
    const ok = await dialog.confirm(`${t("adminBanAsk")} (${termLabel})`);
    if (!ok) return;
    const bannedUntil = days > 0
      ? new Date(Date.now() + days * 86400000).toISOString()
      : null;
    await run(
      () => usersApi.update(target.id, { ...target, banned: true, bannedUntil }),
      "adminBanDone",
      async () => {
        await adminUsers.reload();
        setPickedUser(null);
      }
    );
  }

  async function handleUnbanUser(target) {
    await run(
      () => usersApi.update(target.id, { ...target, banned: false, bannedUntil: null }),
      "adminUnbanDone",
      async () => {
        await adminUsers.reload();
        setPickedUser(null);
      }
    );
  }

  async function handleDeleteUser(target) {
    const ok = await dialog.confirm(t("adminDeleteUserAsk"));
    if (!ok) return;
    await run(
      () => usersApi.remove(target.id),
      "adminDeleteUserDone",
      async () => {
        await adminUsers.reload();
        setPickedUser(null);
      }
    );
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

  function handleTab(key) {
    setAddOpen(false);
    setEditItem(null);
    setTab(key);
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="admin-page min-h-screen bg-muted/30">
      <AdminHeader
        isSuperAdmin={isSuperAdmin}
        onLogout={handleLogout}
        onOpenUsers={() => setUsersOpen(true)}
      />

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8">
        <AdminOverview data={data} users={adminUsers.users} />

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

      <AdminUsersDrawer
        open={usersOpen}
        onClose={() => setUsersOpen(false)}
        users={adminUsers.visible}
        loading={adminUsers.loading}
        filter={adminUsers.filter}
        onFilterChange={adminUsers.setFilter}
        query={adminUsers.query}
        onQueryChange={adminUsers.setQuery}
        onSelect={setPickedUser}
      />

      {pickedUser && (
        <AdminUserModal
          user={pickedUser}
          onClose={() => setPickedUser(null)}
          onBan={handleBanUser}
          onUnban={handleUnbanUser}
          onDelete={handleDeleteUser}
        />
      )}

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
