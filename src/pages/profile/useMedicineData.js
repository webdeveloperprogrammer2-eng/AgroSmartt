import { useCallback, useEffect, useState } from "react";
import { fetchMyMedicines, addMedicine, updateMedicine, deleteMedicine } from "./api";

export function useMedicineData(user, t, dialog) {
  const [medicines, setMedicines] = useState([]);
  const userId = user?.id;

  function withOwnerInfo(form) {
    return {
      ...form,
      userId,
      farmerName: user?.userName || user?.name || t("defaultFarmerName"),
      farmerPhone: user?.userPhone || user?.phone || "",
    };
  }

  const loadMedicines = useCallback(async () => {
    if (!userId) return;
    const data = await fetchMyMedicines(userId).catch(() => []);
    setMedicines(data);
  }, [userId]);

  useEffect(() => {
    loadMedicines();
  }, [loadMedicines]);

  async function run(action, successKey, onDone) {
    try {
      await action();
      await loadMedicines();
      onDone?.();
      await dialog.success(t(successKey));
      return { ok: true };
    } catch (err) {
      console.error(err);
      await dialog.error(t("error"));
      return { ok: false };
    }
  }

  return {
    medicines,
    submitAddMedicine: (form, onDone) =>
      run(() => addMedicine(withOwnerInfo(form)), "medicineAdded", onDone),
    submitEditMedicine: (id, form, onDone) =>
      run(() => updateMedicine(id, withOwnerInfo(form)), "medicineUpdated", onDone),
    submitDeleteMedicine: (id) => run(() => deleteMedicine(id), "medicineDeleted"),
  };
}
