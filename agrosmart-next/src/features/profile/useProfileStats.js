import { useCallback, useEffect, useState } from "react";
import { notificationsApi } from "../../api/notificationsApi";

// Ҳар фармоиш дар /notifications як сабт мемонад: `userId` — фурӯшанда,
// `buyerId` — харидор. Аз ҳамин як рӯйхат ҳам савдои корбар, ҳам харидҳои
// ӯ ва ҳам ҷои ӯ дар байни фурӯшандагон ҳисоб карда мешавад.
const EMPTY = {
  salesTotal: 0,
  ordersCount: 0,
  purchasesTotal: 0,
  purchasesCount: 0,
  rank: 0,
  sellersCount: 0,
};

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function calcProfileStats(list, userId) {
  const me = String(userId);
  const stats = { ...EMPTY };
  const sellerTotals = new Map();

  for (const n of list) {
    const total = toNumber(n.total);
    const seller = String(n.userId);

    sellerTotals.set(seller, (sellerTotals.get(seller) || 0) + total);

    if (seller === me) {
      stats.salesTotal += total;
      stats.ordersCount += 1;
    }
    if (String(n.buyerId) === me) {
      stats.purchasesTotal += total;
      stats.purchasesCount += 1;
    }
  }

  // Дар ҷадвал танҳо онҳое меистанд, ки ақаллан як фурӯш доранд —
  // вагарна ҳамаи ҳисобҳои холӣ ҷои якумро тақсим мекарданд.
  const ranked = [...sellerTotals.entries()]
    .filter(([, sum]) => sum > 0)
    .sort((a, b) => b[1] - a[1]);

  stats.sellersCount = ranked.length;
  stats.rank = ranked.findIndex(([id]) => id === me) + 1;

  return stats;
}

export function useProfileStats(userId) {
  const [stats, setStats] = useState(EMPTY);

  const load = useCallback(async () => {
    if (userId == null) {
      setStats(EMPTY);
      return;
    }
    try {
      const list = await notificationsApi.getAll();
      setStats(calcProfileStats(Array.isArray(list) ? list : [], userId));
    } catch {
      setStats(EMPTY);
    }
  }, [userId]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...stats, reload: load };
}
