"use client";

import { useEffect, useMemo, useState } from "react";
import ZaminNavbar from "./ZaminNavbar";
import ZaminGrid from "./ZaminGrid";
import ZaminCartModal from "./ZaminCartModal";
import ZaminDetailModal from "./ZaminDetailModal";
import ZaminCheckoutModal from "./ZaminCheckoutModal";
import { fetchLands } from "./api";
import { useCart } from "../../hooks/useCart";
import { useUser } from "../../context/user";
import { useTranslation } from "../../context/language";
import { useDialog } from "../../context/dialog";
import { useRouter } from "next/navigation";
import { sendOrderNotifications } from "../../lib/notify";
import { ALL, normalizeCity } from "../../lib/catalog";

// Саҳифаи Бозори Замин — иҷораи замин
export default function ZaminPage() {
  const [allLands, setAllLands] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState(ALL);

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [detailLand, setDetailLand] = useState(null);

  const { cart, addItemOnce, removeItem, clearCart, totalPrice } = useCart("zaminCart");
  const { user, isAdmin } = useUser();
  const router = useRouter();
  const { t } = useTranslation();
  const dialog = useDialog();

  useEffect(() => {
    let cancelled = false;
    fetchLands()
      .then((data) => {
        if (!cancelled) setAllLands(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setAllLands([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Филтратсия дар тарафи client (тезтар аз fetch-и такрорӣ)
  const visibleLands = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allLands.filter((z) => {
      if (city !== ALL && normalizeCity(z.city) !== city) return false;
      if (query && !String(z.name || "").toLowerCase().includes(query)) return false;
      return true;
    });
  }, [allLands, city, search]);

  // Дархост танҳо баъди сабти ном — соҳиби замин бояд бидонад бо кӣ тамос гирад
  function requireAuth() {
    // Admin/SuperAdmin наметавонанд чизе харанд — ба саҳифаи аввал бармегарданд
    if (isAdmin) {
      router.push("/");
      return false;
    }
    if (!user) {
      dialog.info(t("orderNeedsAuth")).then(() => router.push("/auth"));
      return false;
    }
    return true;
  }

  function handleSelect(land) {
    if (!requireAuth()) return;
    const added = addItemOnce(land);
    if (added) dialog.success(t("landAdded"));
    else dialog.info(t("landAlreadyInCart"));
  }

  function handleOpenCheckout() {
    if (!requireAuth()) return;
    setCartOpen(false);
    setCheckoutOpen(true);
  }

  // Ба ҷои боти Telegram: ба соҳиби ҳар замин хабарномаи алоҳида меравад
  async function handleCheckoutSubmit() {
    try {
      await sendOrderNotifications({ type: "land", user, items: cart });
      clearCart();
      setCheckoutOpen(false);
      await dialog.success(t("orderSentToOwner"));
    } catch (error) {
      console.error("Хатогӣ ҳангоми фиристодан:", error);
      await dialog.error(t("error"));
    }
  }

  return (
    <>
      <ZaminNavbar
        search={search}
        onSearchChange={setSearch}
        city={city}
        onCityChange={setCity}
        cartCount={cart.length}
        onCartClick={() => setCartOpen(true)}
      />

      <main className="main-wrapper">
        <section className="products-area">
          <ZaminGrid lands={visibleLands} onSelect={handleSelect} onDetail={setDetailLand} />
        </section>
      </main>

      <ZaminCartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        totalPrice={totalPrice}
        onRemove={removeItem}
        onCheckout={handleOpenCheckout}
      />

      <ZaminCheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        user={user}
        onSubmit={handleCheckoutSubmit}
      />

      <ZaminDetailModal open={Boolean(detailLand)} onClose={() => setDetailLand(null)} land={detailLand} />
    </>
  );
}
