import { useCallback, useEffect, useState } from "react";
import { favoritesApi } from "../api/favoritesApi";

function keyOf(itemType, itemId) {
  return `${itemType}:${itemId}`;
}

export function useFavorites(userId) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(() => {
    if (userId == null) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    favoritesApi
      .list(userId)
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(reload, [reload]);

  const isFavorite = useCallback(
    (itemType, itemId) => items.some((row) => keyOf(row.itemType, row.itemId) === keyOf(itemType, itemId)),
    [items]
  );

  const toggle = useCallback(
    async (itemType, itemId, item) => {
      if (userId == null) return;
      const key = keyOf(itemType, itemId);
      const exists = items.some((row) => keyOf(row.itemType, row.itemId) === key);

      setItems((prev) =>
        exists
          ? prev.filter((row) => keyOf(row.itemType, row.itemId) !== key)
          : [...prev, { id: key, itemType, itemId: String(itemId), item }]
      );

      try {
        if (exists) await favoritesApi.remove(userId, itemType, itemId);
        else await favoritesApi.add(userId, itemType, itemId);
      } catch {
        reload();
      }
    },
    [items, userId, reload]
  );

  return { items, loading, isFavorite, toggle, reload };
}
