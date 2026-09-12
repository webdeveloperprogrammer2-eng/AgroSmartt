import { useEffect, useState } from "react";

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

export function useCart(storageKey) {
  const [cart, setCart] = useState(() => readCart(storageKey));

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, storageKey]);

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
