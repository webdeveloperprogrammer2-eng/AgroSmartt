import { useCallback, useEffect, useState } from "react";
import {
  fetchMyProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  fetchMyLands,
  addLand,
  updateLand,
  deleteLand,
} from "./api";

// Ин hook боркунӣ ва амалиёти CRUD-и маҳсулот ва заминро идора мекунад.
// Ҳар амал хатогиро худаш мегирад ва { ok: true/false } бармегардонад,
// то саҳифа ҳеҷ гоҳ "unhandled promise rejection" надиҳад.
// dialog — модали умумии сайт (ба ҷои alert()).
export function useProfileData(user, t, dialog) {
  const [products, setProducts] = useState([]);
  const [lands, setLands] = useState([]);

  const userId = user?.id;

  const loadProducts = useCallback(async () => {
    if (!userId) return;
    const data = await fetchMyProducts(userId).catch(() => []);
    setProducts(data);
  }, [userId]);

  const loadLands = useCallback(async () => {
    if (!userId) return;
    const data = await fetchMyLands(userId).catch(() => []);
    setLands(data);
  }, [userId]);

  useEffect(() => {
    loadProducts();
    loadLands();
  }, [loadProducts, loadLands]);

  function withFarmerInfo(data, finalName, finalPhone) {
    return { ...data, farmerName: finalName, farmerPhone: finalPhone, userId };
  }

  // Мантиқи умумӣ: амалро иҷро мекунем, рӯйхатро нав мекунем ва хабар медиҳем.
  // onDone — модали формаро мебандад. Ӯ ҲАТМАН пеш аз `dialog.success` даъват
  // мешавад: вагарна корбар мебинад, ки хабар омад, вале форма ҳанӯз кушода аст.
  // Ҳангоми хато форма кушода мемонад — то маълумоти дохилкарда гум нашавад.
  async function run(action, reload, successKey, onDone) {
    try {
      await action();
      await reload();
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
    products,
    lands,

    submitAddProduct: (formData, finalName, finalPhone, onDone) =>
      run(
        () => addProduct(withFarmerInfo(formData, finalName, finalPhone)),
        loadProducts,
        "productAddedToServer",
        onDone
      ),

    submitEditProduct: (id, formData, finalName, finalPhone, onDone) =>
      run(
        () => updateProduct(id, withFarmerInfo(formData, finalName, finalPhone)),
        loadProducts,
        "productUpdated",
        onDone
      ),

    submitDeleteProduct: (id) => run(() => deleteProduct(id), loadProducts, "productDeleted"),

    submitAddLand: (formData, finalName, finalPhone, onDone) =>
      run(
        () => addLand(withFarmerInfo(formData, finalName, finalPhone)),
        loadLands,
        "landAddedToMarket",
        onDone
      ),

    submitEditLand: (id, formData, finalName, finalPhone, onDone) =>
      run(
        () => updateLand(id, withFarmerInfo(formData, finalName, finalPhone)),
        loadLands,
        "landUpdated",
        onDone
      ),

    submitDeleteLand: (id) => run(() => deleteLand(id), loadLands, "landDeleted"),
  };
}
