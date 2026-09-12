"use client";

import { TrendingUp, ShoppingBag, Wallet, Package, Trophy } from "lucide-react";
import { useTranslation } from "../../context/language";

// Сатри хулосаи кабинет — дар зери "Хуш омадед" меистад.
// Ҳамаи рақамҳо аз фармоишҳои воқеӣ ҳисоб мешаванд, на аз ҷои дигар.
export default function ProfileStats({ stats, listingsCount }) {
  const { t } = useTranslation();
  const somoni = t("somoniShort");

  const tiles = [
    {
      key: "sales",
      Icon: TrendingUp,
      tone: "is-green",
      label: t("statsSales"),
      value: `${stats.salesTotal} ${somoni}`,
    },
    {
      key: "orders",
      Icon: ShoppingBag,
      tone: "is-blue",
      label: t("statsOrders"),
      value: stats.ordersCount,
    },
    {
      key: "purchases",
      Icon: Wallet,
      tone: "is-violet",
      label: t("statsPurchases"),
      value: `${stats.purchasesTotal} ${somoni}`,
    },
    {
      key: "listings",
      Icon: Package,
      tone: "is-amber",
      label: t("statsListings"),
      value: listingsCount,
    },
    {
      key: "rank",
      Icon: Trophy,
      tone: "is-amber",
      label: t("statsRank"),
      // Бе ягон фурӯш ҷой вуҷуд надорад — рақами сохта нишон намедиҳем
      value: stats.rank > 0 ? `${stats.rank} / ${stats.sellersCount}` : "—",
    },
  ];

  return (
    <div className="profile-stats">
      {tiles.map(({ key, Icon, tone, label, value }) => (
        <div key={key} className="profile-stat">
          <span className={`profile-stat-icon ${tone}`}>
            <Icon size={16} strokeWidth={2.3} />
          </span>
          <span className="profile-stat-text">
            <b>{value}</b>
            <small>{label}</small>
          </span>
        </div>
      ))}
    </div>
  );
}
