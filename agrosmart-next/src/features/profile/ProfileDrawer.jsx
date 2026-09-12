"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Home, LogOut, Pill, Settings, ShoppingCart, Sprout, Menu as MenuIcon, X } from "lucide-react";
import Avatar from "../../components/shared/Avatar";
import DrawerPreferences from "./drawer/DrawerPreferences";
import DrawerAccountForms from "./drawer/DrawerAccountForms";
import DrawerFavorites from "./drawer/DrawerFavorites";
import { settingsApi } from "../../api/settingsApi";
import { favoritesApi } from "../../api/favoritesApi";
import { useUser } from "../../context/user";
import { useTranslation } from "../../context/language";
import { findAccountType } from "../../lib/accountTypes";
import "./drawer.css";

const LINKS = [
  { to: "/bozor", Icon: ShoppingCart, key: "goToMarketMenu", tone: "green" },
  { to: "/zamin", Icon: Sprout, key: "goToLandMarketMenu", tone: "blue" },
  { to: "/doruvori", Icon: Pill, key: "goToPharmacyMenu", tone: "violet" },
  { to: "/", Icon: Home, key: "goHomeMenu", tone: "amber" },
];

// Пардаи рости профил: меню, танзимот ва нигоҳдоштаҳо дар як ҷо
export default function ProfileDrawer({ open, onClose, name, phone, avatarLetter, accountType, onLogout }) {
  const { user, setUser } = useUser();
  const { t } = useTranslation();
  const router = useRouter();
  const [tab, setTab] = useState("menu");
  const [prefs, setPrefs] = useState({ notifications: true });
  const [favorites, setFavorites] = useState([]);
  const [favLoading, setFavLoading] = useState(true);

  // Танзимот ва нигоҳдоштаҳо танҳо ҳангоми кушодани парда бор мешаванд
  useEffect(() => {
    if (!open || !user?.id) return;
    settingsApi
      .get(user.id)
      .then((data) => data?.preferences && setPrefs(data.preferences))
      .catch(() => {});
    setFavLoading(true);
    favoritesApi
      .list(user.id)
      .then(setFavorites)
      .catch(() => setFavorites([]))
      .finally(() => setFavLoading(false));
  }, [open, user?.id]);

  function savePrefs(patch) {
    const next = { ...prefs, ...patch };
    setPrefs(next);
    settingsApi.updatePreferences(user.id, next).catch(() => {});
  }

  async function removeFavorite(row) {
    setFavorites((prev) => prev.filter((item) => item.id !== row.id));
    await favoritesApi.remove(user.id, row.itemType, row.itemId).catch(() => {});
  }

  const type = findAccountType(accountType);
  const tabs = [
    { id: "menu", Icon: MenuIcon, label: t("menuTab") },
    { id: "settings", Icon: Settings, label: t("settings") },
    { id: "favorites", Icon: Heart, label: t("favoritesTitle") },
  ];

  return (
    <>
      <div className={`dw-overlay ${open ? "is-open" : ""}`} onClick={onClose} aria-hidden="true" />

      <aside className={`dw ${open ? "is-open" : ""}`}>
        <button type="button" className="dw-close" onClick={onClose} aria-label={t("cancel")}>
          <X size={18} strokeWidth={2.6} />
        </button>

        <header className="dw-head">
          <Avatar src={user?.avatar} name={name || avatarLetter} className="dw-avatar" />
          <h2>{name}</h2>
          <a className="dw-phone" href={`tel:${phone}`}>
            {phone}
          </a>
          <span className="dw-badge">{t(type ? type.activeKey : "activeFarmerBadge")}</span>
        </header>

        <nav className="dw-tabs">
          {tabs.map(({ id, Icon, label }) => (
            <button
              key={id}
              type="button"
              className={`dw-tab ${tab === id ? "is-active" : ""}`}
              onClick={() => setTab(id)}
            >
              <Icon size={15} strokeWidth={2.2} />
              {label}
            </button>
          ))}
        </nav>

        <div className="dw-body">
          {tab === "menu" && (
            <div className="dw-menu">
              {LINKS.map(({ to, Icon, key, tone }) => (
                <Link key={to} to={to} className="dw-link" onClick={onClose}>
                  <span className={`dw-link-icon tone-${tone}`}>
                    <Icon size={16} strokeWidth={2.2} />
                  </span>
                  {t(key)}
                </Link>
              ))}
            </div>
          )}

          {tab === "settings" && (
            <>
              <DrawerPreferences notifications={prefs.notifications} onSave={savePrefs} />
              <DrawerAccountForms
                user={user}
                onUpdated={(next) => setUser((prev) => ({ ...prev, ...next }))}
                onDeleted={() => {
                  onLogout();
                  router.push("/");
                }}
              />
            </>
          )}

          {tab === "favorites" && (
            <DrawerFavorites items={favorites} loading={favLoading} onRemove={removeFavorite} />
          )}
        </div>

        <footer className="dw-foot">
          <button type="button" className="dw-logout" onClick={onLogout}>
            <LogOut size={16} strokeWidth={2.3} />
            {t("logoutMenu")}
          </button>
        </footer>
      </aside>
    </>
  );
}
