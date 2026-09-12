import { notificationsApi } from "../api/notificationsApi";

// ==========================================================================
// Системаи хабарномаҳои дохилии сайт — ҷойгузини пурраи боти Telegram.
//
// Мантиқ: ҳар маҳсулот / замин / дору майдони `userId` дорад — ID-и ҳамон
// касе, ки онро илова кардааст. Ҳангоми фармоиш сабад аз рӯи ҳамин `userId`
// ба гурӯҳҳо ҷудо мешавад ва ба ҲАР соҳиб хабарномаи алоҳида бо ном ва
// рақами телефони харидор фиристода мешавад.
// ==========================================================================

// Ном ва рақами харидор ҳамеша аз маълумоти сабти номи ӯ гирифта мешавад —
// дигар ҳеҷ куҷо рақами телефон пурсида намешавад.
export function buyerInfoFrom(user) {
  return {
    buyerId: user?.id ?? null,
    buyerName: user?.userName || user?.name || "",
    buyerPhone: user?.userPhone || user?.phone || "",
  };
}

// Сабадро ба гурӯҳҳо аз рӯи соҳиби мол ҷудо мекунад
function groupByOwner(items) {
  const groups = new Map();
  for (const item of items) {
    const ownerId = item.userId;
    // Молҳои бе соҳиб (сабтҳои кӯҳна) — ба касе хабар намеравад
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

/**
 * Ба ҳар соҳиби мол як хабарнома месозад.
 *
 * @param {object} p
 * @param {"order"|"land"|"medicine"} p.type  навъи фармоиш
 * @param {object} p.user      харидори воридшуда
 * @param {Array}  p.items     молҳои сабад (ҳар кадом бо `userId`)
 * @param {string} [p.address] суроғаи расонидан (танҳо дар бозор)
 * @returns {Promise<number>} шумораи хабарномаҳои фиристодашуда
 */
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
  // Агар ҳатто якто ҳам нарасад — маънои онро дорад, ки сервер дастрас нест
  if (sent === 0) throw new Error("Хабарнома фиристода нашуд");
  return sent;
}
