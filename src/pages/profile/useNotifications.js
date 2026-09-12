import { useCallback, useEffect, useState } from "react";
import { notificationsApi } from "../../api/notificationsApi";

export function useNotifications(userId) {
  const [items, setItems] = useState([]);

  const load = useCallback(async () => {
    if (!userId) {
      setItems([]);
      return;
    }
    try {
      setItems(await notificationsApi.getForUser(userId));
    } catch {
      setItems([]);
    }
  }, [userId]);

  useEffect(() => {
    load();
    const timer = setInterval(load, 30000);
    return () => clearInterval(timer);
  }, [load]);

  const unreadCount = items.filter((n) => !n.read).length;

  async function markAllRead() {
    const unread = items.filter((n) => !n.read);
    if (unread.length === 0) return;
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    await Promise.allSettled(unread.map((n) => notificationsApi.markRead(n.id)));
  }

  async function remove(id) {
    setItems((prev) => prev.filter((n) => n.id !== id));
    try {
      await notificationsApi.remove(id);
    } catch {
      await load();
    }
  }

  async function clearAll() {
    const all = items;
    if (all.length === 0) return;
    setItems([]);
    await Promise.allSettled(all.map((n) => notificationsApi.remove(n.id)));
  }

  return { items, unreadCount, reload: load, markAllRead, remove, clearAll };
}
