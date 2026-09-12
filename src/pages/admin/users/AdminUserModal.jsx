import { useState } from "react";
import {
  Box,
  Coins,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  ShieldBan,
  ShieldCheck,
  Star,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import Avatar from "../../../components/shared/Avatar";
import { useTranslation } from "../../../context/language";
import { useUserDossier } from "./useUserDossier";
import { isUserBanned } from "./useAdminUsers";
import AdminUserChats from "./AdminUserChats";

const BAN_OPTIONS = [
  { days: 1, labelKey: "adminBan1Day" },
  { days: 7, labelKey: "adminBan7Days" },
  { days: 30, labelKey: "adminBan30Days" },
  { days: 0, labelKey: "adminBanForever" },
];

export default function AdminUserModal({ user, onClose, onBan, onUnban, onDelete }) {
  const { t } = useTranslation();
  const { loading, chats, stats, ratingBars } = useUserDossier(user);
  const [tab, setTab] = useState("stats");
  const [banOpen, setBanOpen] = useState(false);
  const banned = isUserBanned(user);

  const maxBar = Math.max(...ratingBars.map((bar) => bar.count), 1);
  const maxCount = Math.max(stats.products, stats.lands, stats.jobs, stats.chats, 1);

  const activity = [
    { key: "adminStatProducts", value: stats.products, Icon: Package },
    { key: "adminStatLands", value: stats.lands, Icon: MapPin },
    { key: "adminStatJobs", value: stats.jobs, Icon: Truck },
    { key: "adminStatChats", value: stats.chats, Icon: MessageSquare },
  ];

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="admin-modal-head">
          <Avatar
            src={user.avatar}
            name={user.userName || "?"}
            className="admin-modal-avatar"
          />
          <div className="admin-modal-ident">
            <h3>{user.userName || t("unknownValue")}</h3>
            <p>
              <Phone size={13} /> {user.userPhone || "—"}
              <span className="admin-dot" />
              <MapPin size={13} /> {user.city || t("unknownValue")}
            </p>
          </div>
          <div className="admin-modal-flags">
            {banned ? (
              <span className="admin-ban-flag">
                <ShieldBan size={13} /> {t("adminBanned")}
              </span>
            ) : (
              <span className="admin-ok-flag">
                <ShieldCheck size={13} /> {t("adminActive")}
              </span>
            )}
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label={t("cancel")}>
            <X size={18} />
          </button>
        </header>

        <nav className="admin-modal-tabs">
          <button
            type="button"
            className={tab === "stats" ? "is-active" : ""}
            onClick={() => setTab("stats")}
          >
            {t("adminTabStats")}
          </button>
          <button
            type="button"
            className={tab === "chats" ? "is-active" : ""}
            onClick={() => setTab("chats")}
          >
            {t("adminTabChats")} ({stats.chats})
          </button>
        </nav>

        <div className="admin-modal-body">
          {tab === "stats" && (
            <>
              <div className="admin-kpi-row">
                <Kpi Icon={Coins} label={t("adminStatValue")} value={fmt(stats.totalValue)} accent />
                <Kpi Icon={Star} label={t("adminStatRating")} value={stats.rating || "—"} />
                <Kpi Icon={Box} label={t("adminStatReviews")} value={stats.reviews} />
              </div>

              <section className="admin-chart-card">
                <h4>{t("adminChartActivity")}</h4>
                {activity.map(({ key, value, Icon }) => (
                  <div className="admin-bar-row" key={key}>
                    <span className="admin-bar-label">
                      <Icon size={14} /> {t(key)}
                    </span>
                    <span className="admin-bar-track">
                      <span
                        className="admin-bar-fill"
                        style={{ width: `${(value / maxCount) * 100}%` }}
                      />
                    </span>
                    <b className="admin-bar-value">{value}</b>
                  </div>
                ))}
              </section>

              <section className="admin-chart-card">
                <h4>{t("adminChartRatings")}</h4>
                {ratingBars.map(({ star, count }) => (
                  <div className="admin-bar-row" key={star}>
                    <span className="admin-bar-label admin-bar-star">
                      {star} <Star size={12} fill="currentColor" />
                    </span>
                    <span className="admin-bar-track">
                      <span
                        className="admin-bar-fill is-gold"
                        style={{ width: `${(count / maxBar) * 100}%` }}
                      />
                    </span>
                    <b className="admin-bar-value">{count}</b>
                  </div>
                ))}
              </section>

              <section className="admin-chart-card">
                <h4>{t("adminChartMoney")}</h4>
                <div className="admin-split-bar">
                  <span
                    className="admin-split-part is-products"
                    style={{ width: `${share(stats.productValue, stats.totalValue)}%` }}
                  />
                  <span
                    className="admin-split-part is-lands"
                    style={{ width: `${share(stats.landValue, stats.totalValue)}%` }}
                  />
                </div>
                <div className="admin-legend">
                  <span>
                    <i className="dot is-products" /> {t("adminStatProducts")}: {fmt(stats.productValue)}
                  </span>
                  <span>
                    <i className="dot is-lands" /> {t("adminStatLands")}: {fmt(stats.landValue)}
                  </span>
                </div>
              </section>
            </>
          )}

          {tab === "chats" && <AdminUserChats user={user} chats={chats} loading={loading} />}
        </div>

        <footer className="admin-modal-foot">
          {banned ? (
            <button type="button" className="admin-act is-ok" onClick={() => onUnban(user)}>
              <ShieldCheck size={15} /> {t("adminUnban")}
            </button>
          ) : (
            <button
              type="button"
              className="admin-act is-warn"
              onClick={() => setBanOpen(true)}
            >
              <ShieldBan size={14} /> {t("adminBanUser")}
            </button>
          )}
          <button type="button" className="admin-act is-danger" onClick={() => onDelete(user)}>
            <Trash2 size={15} /> {t("adminDeleteUser")}
          </button>
        </footer>

        {banOpen && (
          <div className="admin-ban-overlay" onClick={() => setBanOpen(false)}>
            <div
              className="admin-ban-modal"
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
            >
              <header className="admin-ban-modal-head">
                <h4>
                  <ShieldBan size={17} /> {t("adminBanUser")}
                </h4>
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => setBanOpen(false)}
                  aria-label={t("cancel")}
                >
                  <X size={17} />
                </button>
              </header>

              <p className="admin-ban-modal-text">{t("adminBanPickTerm")}</p>

              <div className="admin-ban-modal-list">
                {BAN_OPTIONS.map(({ days, labelKey }) => (
                  <button
                    key={labelKey}
                    type="button"
                    className="admin-ban-term"
                    onClick={() => {
                      setBanOpen(false);
                      onBan(user, days, t(labelKey));
                    }}
                  >
                    {t(labelKey)}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="admin-act"
                onClick={() => setBanOpen(false)}
              >
                {t("cancel")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Kpi({ Icon, label, value, accent }) {
  return (
    <div className={`admin-kpi ${accent ? "is-accent" : ""}`}>
      <Icon size={16} />
      <b>{value}</b>
      <small>{label}</small>
    </div>
  );
}

const fmt = (value) => new Intl.NumberFormat("ru-RU").format(Math.round(value || 0));
const share = (part, total) => (total > 0 ? (part / total) * 100 : 0);
