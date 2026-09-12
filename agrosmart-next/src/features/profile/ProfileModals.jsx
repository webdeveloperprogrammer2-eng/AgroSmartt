"use client";

import ProductFormModal from "./ProductFormModal";
import LandFormModal from "./LandFormModal";
import MedicineFormModal from "./MedicineFormModal";
import NotificationsModal from "./NotificationsModal";
import { useTranslation } from "../../context/language";

// Ҳамаи модалҳои кабинет: илова/таҳрири маҳсулот, замин, дору ва хабарномаҳо
export default function ProfileModals({ modals, data, meds, notifications, chatUnread, name, phone, onChatWithBuyer }) {
  const { t } = useTranslation();

  return (
    <>
      <ProductFormModal
        open={modals.addProductOpen}
        onClose={() => modals.setAddProductOpen(false)}
        title={t("addProduct")}
        submitLabel={t("save")}
        headerClass="header-green"
        initialData={null}
        onSubmit={(form) =>
          data.submitAddProduct(form, name, phone, () => modals.setAddProductOpen(false))
        }
      />
      <ProductFormModal
        open={Boolean(modals.editProduct)}
        onClose={() => modals.setEditProduct(null)}
        title={t("editProduct")}
        submitLabel={t("save")}
        headerClass="header-green"
        initialData={modals.editProduct}
        onSubmit={(form) =>
          data.submitEditProduct(modals.editProduct.id, form, name, phone, () =>
            modals.setEditProduct(null)
          )
        }
      />

      <LandFormModal
        open={modals.addLandOpen}
        onClose={() => modals.setAddLandOpen(false)}
        title={t("addLand")}
        submitLabel={t("save")}
        headerClass="header-blue"
        initialData={null}
        onSubmit={(form) => data.submitAddLand(form, name, phone, () => modals.setAddLandOpen(false))}
      />
      <LandFormModal
        open={Boolean(modals.editLand)}
        onClose={() => modals.setEditLand(null)}
        title={t("editLand")}
        submitLabel={t("save")}
        headerClass="header-blue"
        initialData={modals.editLand}
        onSubmit={(form) =>
          data.submitEditLand(modals.editLand.id, form, name, phone, () => modals.setEditLand(null))
        }
      />

      <MedicineFormModal
        open={modals.addMedOpen}
        onClose={() => modals.setAddMedOpen(false)}
        title={t("addMedicine")}
        initialData={null}
        onSubmit={(form) => meds.submitAddMedicine(form, () => modals.setAddMedOpen(false))}
      />
      <MedicineFormModal
        open={Boolean(modals.editMed)}
        onClose={() => modals.setEditMed(null)}
        title={t("editMedicine")}
        initialData={modals.editMed}
        onSubmit={(form) => meds.submitEditMedicine(modals.editMed.id, form, () => modals.setEditMed(null))}
      />

      <NotificationsModal
        open={modals.notifOpen}
        onClose={() => {
          modals.setNotifOpen(false);
          // Ҳангоми ПӮШИДАН хондашуда қайд мешаванд — то корбар дар дохили
          // модал бинад, ки кадомаш нав буд
          notifications.markAllRead();
        }}
        items={notifications.items}
        chatUnread={chatUnread}
        onChatWithBuyer={onChatWithBuyer}
        onRemove={notifications.remove}
        onClearAll={notifications.clearAll}
      />
    </>
  );
}
