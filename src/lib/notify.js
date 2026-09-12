import { notificationsApi } from "../api/notificationsApi";

export function buyerInfoFrom(user) {
  return {
    buyerId: user?.id ?? null,
    buyerName: user?.userName || user?.name || "",
    buyerPhone: user?.userPhone || user?.phone || "",
  };
}

function groupByOwner(items) {
  const groups = new Map();
  for (const item of items) {
    const ownerId = item.userId;
    if (ownerId == null || ownerId === "") continue;
    const key = String(ownerId);
    if (!groups.has(key)) groups.set(key, { ownerId, items: [] });
    groups.get(key).items.push(item);
  }
  return [...groups.values()];
}

function lineOf(item) {
  const quantity = Number(item.quantity) || 1;
  const price = Number(item.price) || 0;
  return {
    name: item.name || "",
    price,
    quantity,
    total: price * quantity,
  };
}

export async function sendOrderNotifications({ type, user, items, address = "" }) {
  const buyer = buyerInfoFrom(user);
  const groups = groupByOwner(items);
  if (groups.length === 0) return 0;

  const createdAt = new Date().toISOString();

  const results = await Promise.allSettled(
    groups.map((group) => {
      const lines = group.items.map(lineOf);
      return notificationsApi.create({
        userId: group.ownerId,
        type,
        ...buyer,
        address,
        items: lines,
        total: lines.reduce((sum, line) => sum + line.total, 0),
        createdAt,
        read: false,
      });
    })
  );

  const sent = results.filter((r) => r.status === "fulfilled").length;
  if (sent === 0) throw new Error("Хабарнома фиристода нашуд");
  return sent;
}
