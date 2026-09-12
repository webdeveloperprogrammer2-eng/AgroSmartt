"use client";

import { useEffect, useMemo, useState } from "react";
import BozorNavbar from "./BozorNavbar";
import ProductGrid from "./ProductGrid";
import CartModal from "./CartModal";
import DetailModal from "./DetailModal";
import CheckoutModal from "./CheckoutModal";
import { fetchProducts } from "./api";
import { useCart } from "../../hooks/useCart";
import { useUser } from "../../context/user";
import { useRouter } from "next/navigation";
import { sendOrderNotifications } from "../../lib/notify";
import { useTranslation } from "../../context/language";
import { useDialog } from "../../context/dialog";
import { ALL, normalizeCity, normalizeProductCategory } from "../../lib/catalog";

// Саҳифаи Бозор — хариду фурӯши маҳсулот
export default function BozorPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(ALL);
  const [city, setCity] = useState(ALL);

  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);

  const { cart, addItem, removeItem, clearCart, totalPrice, totalCount } = useCart("agroCart");
  const { user, isAdmin } = useUser();
  const router = useRouter();
  const { t } = useTranslation();
  const dialog = useDialog();

  // Маҳсулот як маротиба бор карда мешавад; ҷустуҷӯ ва филтрҳо дар тарафи
  // client кор мекунанд — ин ҳам тезтар аст ва ҳам мушкили "ҷавоби кӯҳна
  // болои ҷавоби нав меафтад"-ро бартараф мекунад.
  useEffect(() => {
    let cancelled = false;
    fetchProducts()
      .then((data) => {
        if (!cancelled) setAllProducts(data);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setAllProducts([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const products = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allProducts.filter((item) => {
      if (category !== ALL && normalizeProductCategory(item.category) !== category) return false;
      if (city !== ALL && normalizeCity(item.city) !== city) return false;
      if (query && !String(item.name || "").toLowerCase().includes(query)) return false;
      return true;
    });
  }, [allProducts, search, category, city]);

  // Фармоиш танҳо баъди сабти ном — вагарна маълум намешавад, ки хабарнома
  // ба соҳиби мол аз номи КӢ равад ва бо кӣ тамос гиранд.
  function requireAuth() {
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

  function handleBuy(product) {
    if (!requireAuth()) return;
    addItem(product);
    dialog.success(`"${product.name}" ${t("productAdded")}`);
  }

  function handleOpenCheckout() {
    if (!requireAuth()) return;
    setCartOpen(false);
    setCheckoutOpen(true);
  }

  // Ба ҷои боти Telegram: ба ҳар соҳиби маҳсулот хабарномаи алоҳида меравад,
  // бо номи ва рақами телефони харидор (аз сабти номи ӯ гирифта мешавад).
  async function handleCheckoutSubmit(address) {
    try {
      await sendOrderNotifications({ type: "order", user, items: cart, address });
      clearCart();
      setCheckoutOpen(false);
      await dialog.success(t("orderSentToOwner"));
    } catch (err) {
      console.error(err);
      await dialog.error(t("error"));
    }
  }

  return (
    <>
      <BozorNavbar
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        city={city}
        onCityChange={setCity}
        cartCount={totalCount}
        onCartClick={() => setCartOpen(true)}
      />

      <main className="main-wrapper">
        <section className="products-area">
          <ProductGrid products={products} onBuy={handleBuy} onDetail={setDetailProduct} />
        </section>
      </main>

      <CartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        totalPrice={totalPrice}
        onRemove={removeItem}
        onCheckout={handleOpenCheckout}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        user={user}
        onSubmit={handleCheckoutSubmit}
      />

      <DetailModal
        open={Boolean(detailProduct)}
        onClose={() => setDetailProduct(null)}
        product={detailProduct}
      />
    </>
  );
}
