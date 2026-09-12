"use client";

import { useEffect, useState } from "react";

// Сабадро аз хотираи браузер мехонад. Танҳо дар браузер даъват мешавад,
// зеро дар сервери Next.js `localStorage` вуҷуд надорад.
function readCart(storageKey) {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Hook-и умумии Сабад (Cart), storageKey фарқ мекунад: "agroCart" ё "zaminCart"
export function useCart(storageKey) {
  const [cart, setCart] = useState([]);
  // То хонда нашудани хотира сабадро сабт намекунем — вагарна
  // рӯйхати холии аввала маҳсулоти кӯҳнаро нест мекард
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCart(readCart(storageKey));
    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (loaded) localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, loaded, storageKey]);

  // Иловаи маҳсулот: агар аллакай бошад миқдорашро зиёд мекунем
  function addItem(product) {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  // Иловаи як маротиба (барои замин — такрор шуданаш мумкин нест).
  // Санҷиш дар дохили setCart иҷро мешавад, то ду клики паси ҳам
  // ҳолати кӯҳнаро нахонад ва замин ду бор илова нашавад.
  function addItemOnce(product) {
    const alreadyInCart = cart.some((item) => item.id === product.id);
    setCart((prev) =>
      prev.some((item) => item.id === product.id) ? prev : [...prev, { ...product, quantity: 1 }]
    );
    return !alreadyInCart;
  }

  function removeItem(index) {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }

  function clearCart() {
    setCart([]);
  }

  const totalCount = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  return { cart, addItem, addItemOnce, removeItem, clearCart, totalCount, totalPrice };
}
