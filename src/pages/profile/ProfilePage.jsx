import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DriverCabinetPage from "../driver/DriverCabinetPage";
import ProfileNavbar from "./ProfileNavbar";
import ProfileDrawer from "./ProfileDrawer";
import AddMenuFab from "./AddMenuFab";
import ProfileStats from "./ProfileStats";
import ProductsSection from "./ProductsSection";
import LandsSection from "./LandsSection";
import MedicinesSection from "./MedicinesSection";
import ProductFormModal from "./ProductFormModal";
import LandFormModal from "./LandFormModal";
import MedicineFormModal from "./MedicineFormModal";
import NotificationsModal from "./NotificationsModal";
import { chatApi } from "../../api/chatApi";
import { useUser } from "../../context/user";
import { useTranslation } from "../../context/language";
import { useDialog } from "../../context/dialog";
import { useProfileData } from "./useProfileData";
import { useMedicineData } from "./useMedicineData";
import { useNotifications } from "./useNotifications";
import { useProfileStats } from "./useProfileStats";
import { useChatUnread } from "../chat/useChatUnread";
import "./profile.css";

export default function ProfilePage() {
  const { user, loading, logout } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dialog = useDialog();
  const data = useProfileData(user, t, dialog);
  const meds = useMedicineData(user, t, dialog);
  const notifications = useNotifications(user?.id);
  const stats = useProfileStats(user?.id);
  const chatUnread = useChatUnread(user?.id);

  const [notifOpen, setNotifOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [addLandOpen, setAddLandOpen] = useState(false);
  const [editLand, setEditLand] = useState(null);
  const [addMedOpen, setAddMedOpen] = useState(false);
  const [editMed, setEditMed] = useState(null);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [loading, user, navigate]);

  if (loading) return <div className="page-loading">{t("loading")}</div>;
  if (!user) return null;

  if (user.accountType === "driver") return <DriverCabinetPage />;

  const finalName = user.userName || user.name || t("defaultFarmerName");
  const finalPhone = user.userPhone || user.phone || t("defaultPhonePlaceholder");
  const avatarLetter = finalName.charAt(0).toUpperCase();

  async function askDelete(titleKey, onYes) {
    const ok = await dialog.confirm({
      title: t(titleKey),
      description: t("actionIrreversible"),
      confirmText: t("deleteModalYes"),
      danger: true,
    });
    if (ok) await onYes();
  }

  async function handleChatWithBuyer(notification) {
    const chat = await chatApi.open({ buyerId: notification.buyerId, sellerId: user.id });
    navigate(`/chats/${chat.id}`);
  }

  async function handleLogout() {
    setDrawerOpen(false);
    const ok = await dialog.confirm({
      title: t("logoutConfirm"),
      confirmText: t("logoutMenu"),
    });
    if (ok) {
      logout();
      navigate("/");
    }
  }

  return (
    <>
      <ProfileNavbar
        avatarLetter={avatarLetter}
        avatarSrc={user.avatar}
        onOpenMenu={() => setDrawerOpen(true)}
        unreadCount={notifications.unreadCount + chatUnread}
        onOpenNotifications={() => setNotifOpen(true)}
      />
      <ProfileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
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
          onEdit={setEditProduct}
          onDelete={(item) => askDelete("deleteProductConfirm", () => data.submitDeleteProduct(item.id))}
        />
        <LandsSection
          lands={data.lands}
          onEdit={setEditLand}
          onDelete={(item) => askDelete("deleteLandConfirm", () => data.submitDeleteLand(item.id))}
        />
        <MedicinesSection
          medicines={meds.medicines}
          onEdit={setEditMed}
          onDelete={(item) => askDelete("deleteMedicineConfirm", () => meds.submitDeleteMedicine(item.id))}
        />
      </main>

      <AddMenuFab
        onAddProduct={() => setAddProductOpen(true)}
        onAddLand={() => setAddLandOpen(true)}
        onAddMedicine={() => setAddMedOpen(true)}
      />

      <ProductFormModal
        open={addProductOpen}
        onClose={() => setAddProductOpen(false)}
        title={t("addProduct")}
        submitLabel={t("save")}
        headerClass="header-green"
        initialData={null}
        onSubmit={(form) =>
          data.submitAddProduct(form, finalName, finalPhone, () => setAddProductOpen(false))
        }
      />
      <ProductFormModal
        open={Boolean(editProduct)}
        onClose={() => setEditProduct(null)}
        title={t("editProduct")}
        submitLabel={t("save")}
        headerClass="header-green"
        initialData={editProduct}
        onSubmit={(form) =>
          data.submitEditProduct(editProduct.id, form, finalName, finalPhone, () => setEditProduct(null))
        }
      />

      <LandFormModal
        open={addLandOpen}
        onClose={() => setAddLandOpen(false)}
        title={t("addLand")}
        submitLabel={t("save")}
        headerClass="header-blue"
        initialData={null}
        onSubmit={(form) => data.submitAddLand(form, finalName, finalPhone, () => setAddLandOpen(false))}
      />
      <LandFormModal
        open={Boolean(editLand)}
        onClose={() => setEditLand(null)}
        title={t("editLand")}
        submitLabel={t("save")}
        headerClass="header-blue"
        initialData={editLand}
        onSubmit={(form) =>
          data.submitEditLand(editLand.id, form, finalName, finalPhone, () => setEditLand(null))
        }
      />

      <MedicineFormModal
        open={addMedOpen}
        onClose={() => setAddMedOpen(false)}
        title={t("addMedicine")}
        initialData={null}
        onSubmit={(form) => meds.submitAddMedicine(form, () => setAddMedOpen(false))}
      />
      <MedicineFormModal
        open={Boolean(editMed)}
        onClose={() => setEditMed(null)}
        title={t("editMedicine")}
        initialData={editMed}
        onSubmit={(form) => meds.submitEditMedicine(editMed.id, form, () => setEditMed(null))}
      />

      <NotificationsModal
        open={notifOpen}
        onClose={() => {
          setNotifOpen(false);
          notifications.markAllRead();
        }}
        items={notifications.items}
        chatUnread={chatUnread}
        onChatWithBuyer={handleChatWithBuyer}
        onRemove={notifications.remove}
        onClearAll={notifications.clearAll}
      />
    </>
  );
}
