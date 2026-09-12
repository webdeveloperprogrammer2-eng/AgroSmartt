"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DriverCabinetPage from "../driver/DriverCabinetPage";
import ProfileNavbar from "./ProfileNavbar";
import ProfileDrawer from "./ProfileDrawer";
import AddMenuFab from "./AddMenuFab";
import ProfileStats from "./ProfileStats";
import ProductsSection from "./ProductsSection";
import LandsSection from "./LandsSection";
import MedicinesSection from "./MedicinesSection";
import ProfileModals from "./ProfileModals";
import { chatApi } from "../../api/chatApi";
import { useUser } from "../../context/user";
import { useTranslation } from "../../context/language";
import { useDialog } from "../../context/dialog";
import { useProfileData } from "./useProfileData";
import { useMedicineData } from "./useMedicineData";
import { useNotifications } from "./useNotifications";
import { useChatUnread } from "../chat/useChatUnread";
import { useProfileStats } from "./useProfileStats";
import { useProfileModals } from "./useProfileModals";

// Кабинети шахсии деҳқон — идоракунии маҳсулот, замин ва дорувории худ
export default function ProfilePage() {
  const { user, loading, logout } = useUser();
  const router = useRouter();
  const { t } = useTranslation();
  const dialog = useDialog();
  const data = useProfileData(user, t, dialog);
  const meds = useMedicineData(user, t, dialog);
  const notifications = useNotifications(user?.id);
  const chatUnread = useChatUnread(user?.id);
  const stats = useProfileStats(user?.id);
  const modals = useProfileModals();

  // Пеш аз ба охир расидани барқарорсозии сессия корбарро ба /auth намебарем —
  // вагарна ҳангоми навкунии саҳифа (F5) корбари воридшуда берун бароварда мешуд
  useEffect(() => {
    if (!loading && !user) router.replace("/auth");
  }, [loading, user, router]);

  if (loading) return <div className="page-loading">{t("loading")}</div>;
  if (!user) return null;

  // Ронанда маҳсулот ва замин намефурӯшад — кабинети ӯ тамоман дигар аст
  if (user.accountType === "driver") return <DriverCabinetPage />;

  const finalName = user.userName || user.name || t("defaultFarmerName");
  const finalPhone = user.userPhone || user.phone || t("defaultPhonePlaceholder");
  const avatarLetter = finalName.charAt(0).toUpperCase();

  // Ҳамаи пурсишҳо аз ҳамон модали умумӣ мебароянд
  async function askDelete(titleKey, onYes) {
    const ok = await dialog.confirm({
      title: t(titleKey),
      description: t("actionIrreversible"),
      confirmText: t("deleteModalYes"),
      danger: true,
    });
    if (ok) await onYes();
  }

  // Чат бо ҳамон харидоре, ки ин фармоишро дод.

  // Агар сӯҳбат аллакай кушода бошад, сервер ҳамонро бармегардонад.

  async function handleChatWithBuyer(notification) {

    const chat = await chatApi.open({ buyerId: notification.buyerId, sellerId: user.id });

    router.push(`/chats/${chat.id}`);

  }

  

  async function handleLogout() {
    modals.setDrawerOpen(false);
    const ok = await dialog.confirm({
      title: t("logoutConfirm"),
      confirmText: t("logoutMenu"),
    });
    if (ok) {
      logout();
      router.push("/");
    }
  }

  return (
    <>
      <ProfileNavbar
        avatarLetter={avatarLetter}
        avatarSrc={user.avatar}
        onOpenMenu={() => modals.setDrawerOpen(true)}
        unreadCount={notifications.unreadCount + chatUnread}
        onOpenNotifications={() => modals.setNotifOpen(true)}
      />
      <ProfileDrawer
        open={modals.drawerOpen}
        onClose={() => modals.setDrawerOpen(false)}
        name={finalName}
        phone={finalPhone}
        avatarLetter={avatarLetter}
        accountType={user.accountType}
        onLogout={handleLogout}
      />

      <main className="profile-content">
        <div className="welcome-header">
          <h1>{t("welcomeProfile")}</h1>
          <p>{t("profileDesc")}</p>
          <ProfileStats
            stats={stats}
            listingsCount={data.products.length + data.lands.length + meds.medicines.length}
          />
        </div>

        <ProductsSection
          products={data.products}
          onEdit={modals.setEditProduct}
          onDelete={(item) => askDelete("deleteProductConfirm", () => data.submitDeleteProduct(item.id))}
        />
        <LandsSection
          lands={data.lands}
          onEdit={modals.setEditLand}
          onDelete={(item) => askDelete("deleteLandConfirm", () => data.submitDeleteLand(item.id))}
        />
        <MedicinesSection
          medicines={meds.medicines}
          onEdit={modals.setEditMed}
          onDelete={(item) => askDelete("deleteMedicineConfirm", () => meds.submitDeleteMedicine(item.id))}
        />
      </main>

      <AddMenuFab
        onAddProduct={() => modals.setAddProductOpen(true)}
        onAddLand={() => modals.setAddLandOpen(true)}
        onAddMedicine={() => modals.setAddMedOpen(true)}
      />

      <ProfileModals
        chatUnread={chatUnread}
        onChatWithBuyer={handleChatWithBuyer}
        modals={modals}
        data={data}
        meds={meds}
        notifications={notifications}
        name={finalName}
        phone={finalPhone}
      />
    </>
  );
}
