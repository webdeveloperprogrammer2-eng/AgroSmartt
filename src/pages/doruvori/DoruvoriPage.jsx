import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoruvoriNavbar from "./DoruvoriNavbar";
import DoruvoriGrid from "./DoruvoriGrid";
import DoruvoriCartDialog from "./DoruvoriCartDialog";
import { DoruvoriDetailDialog } from "./DoruvoriDialogs";
import { aptekaApi } from "../../api/aptekaApi";
import { useCart } from "../../hooks/useCart";
import { useUser } from "../../context/user";
import { useTranslation } from "../../context/language";
import { useDialog } from "../../context/dialog";
import { sendOrderNotifications } from "../../lib/notify";
import { ALL, normalizeMedicineCategory } from "../../lib/catalog";

export default function DoruvoriPage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(ALL);
  const [cartOpen, setCartOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);

  const { cart, addItem, removeItem, clearCart, totalPrice, totalCount } = useCart("doruvoriCart");
  const { user, isAdmin } = useUser();
  const { t } = useTranslation();
  const dialog = useDialog();
  const navigate = useNavigate();
  const canBuy = Boolean(user) && !isAdmin;

  useEffect(() => {
    let cancelled = false;
    aptekaApi
      .getAll()
      .then((data) => {
        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return items.filter((it) => {
      if (category !== ALL && normalizeMedicineCategory(it.category) !== category) return false;
      if (query && !String(it.name || "").toLowerCase().includes(query)) return false;
      return true;
    });
  }, [items, search, category]);

  function handleBuy(item) {
    if (isAdmin) {
      navigate("/");
      return;
    }
    if (!user) {
      dialog.info(t("orderNeedsAuth")).then(() => navigate("/auth"));
      return;
    }
    addItem(item);
  }

  async function handleCheckout() {
    try {
      await sendOrderNotifications({ type: "medicine", user, items: cart });
      clearCart();
      setCartOpen(false);
      await dialog.success(t("orderSentToOwner"));
    } catch (err) {
      console.error(err);
      await dialog.error(t("error"));
    }
  }

  return (
    <div className="doruvori-page min-h-screen bg-background">
      <DoruvoriNavbar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        cartCount={totalCount}
        onCartOpen={() => setCartOpen(true)}
      />

      <main className="mx-auto max-w-7xl px-4 py-6">
        <DoruvoriGrid items={filtered} onBuy={handleBuy} onDetail={setDetailItem} canBuy={canBuy} />
      </main>

      <DoruvoriCartDialog
        open={cartOpen}
        onOpenChange={setCartOpen}
        cart={cart}
        removeItem={removeItem}
        totalPrice={totalPrice}
        onCheckout={handleCheckout}
      />
      <DoruvoriDetailDialog item={detailItem} onOpenChange={(v) => !v && setDetailItem(null)} />
    </div>
  );
}
