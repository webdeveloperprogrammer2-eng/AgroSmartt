import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { favoritesApi } from "../../api/favoritesApi";
import { useUser } from "../../context/user";
import { useTranslation } from "../../context/language";

const keys = new Set();
const listeners = new Set();
let loadedFor = null;

function keyOf(itemType, itemId) {
  return `${itemType}:${itemId}`;
}

function notify() {
  listeners.forEach((fn) => fn());
}

async function ensureLoaded(userId) {
  if (userId == null || loadedFor === userId) return;
  loadedFor = userId;
  keys.clear();
  const list = await favoritesApi.list(userId).catch(() => []);
  list.forEach((row) => keys.add(keyOf(row.itemType, row.itemId)));
  notify();
}

export default function FavoriteButton({ itemType, itemId }) {
  const { user } = useUser();
  const { t } = useTranslation();
  const [, force] = useState(0);

  useEffect(() => {
    const rerender = () => force((v) => v + 1);
    listeners.add(rerender);
    ensureLoaded(user?.id);
    return () => listeners.delete(rerender);
  }, [user?.id]);

  if (!user) return null;

  const key = keyOf(itemType, String(itemId));
  const active = keys.has(key);

  async function toggle(e) {
    e.stopPropagation();
    if (active) keys.delete(key);
    else keys.add(key);
    notify();

    try {
      if (active) await favoritesApi.remove(user.id, itemType, itemId);
      else await favoritesApi.add(user.id, itemType, itemId);
    } catch {
      if (active) keys.add(key);
      else keys.delete(key);
      notify();
    }
  }

  return (
    <button
      type="button"
      className={`fav-btn ${active ? "is-active" : ""}`}
      onClick={toggle}
      aria-pressed={active}
      aria-label={t(active ? "removeFromFavorites" : "addToFavorites")}
      title={t(active ? "removeFromFavorites" : "addToFavorites")}
    >
      <Heart size={16} strokeWidth={2.4} />
    </button>
  );
}
