import { Search, ShieldBan, Users, X } from "lucide-react";
import Avatar from "../../../components/shared/Avatar";
import { useTranslation } from "../../../context/language";
import { USER_FILTERS, isUserBanned } from "./useAdminUsers";

export default function AdminUsersDrawer({
  open,
  onClose,
  users,
  loading,
  filter,
  onFilterChange,
  query,
  onQueryChange,
  onSelect,
}) {
  const { t } = useTranslation();

  return (
    <>
      <div
        className={`admin-users-overlay ${open ? "is-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`admin-users-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <header className="admin-users-head">
          <h3>
            <Users size={18} /> {t("adminUsersTitle")}
          </h3>
          <button type="button" className="icon-btn" onClick={onClose} aria-label={t("cancel")}>
            <X size={18} />
          </button>
        </header>

        <div className="admin-users-filters">
          {USER_FILTERS.map(({ value, labelKey }) => (
            <button
              key={value}
              type="button"
              className={`admin-filter-chip ${filter === value ? "is-active" : ""}`}
              onClick={() => onFilterChange(value)}
              aria-pressed={filter === value}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>

        <div className="admin-users-search">
          <Search size={15} />
          <input
            type="search"
            value={query}
            placeholder={t("adminUsersSearch")}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>

        <div className="admin-users-list">
          {loading && <p className="admin-users-empty">{t("loading")}</p>}
          {!loading && users.length === 0 && (
            <p className="admin-users-empty">{t("adminUsersEmpty")}</p>
          )}
          {!loading &&
            users.map((item) => (
              <button
                key={item.id}
                type="button"
                className="admin-user-row"
                onClick={() => onSelect(item)}
              >
                <Avatar
                  src={item.avatar}
                  name={item.userName || "?"}
                  className="admin-user-avatar"
                />
                <span className="admin-user-info">
                  <b>{item.userName || t("unknownValue")}</b>
                  <small>{item.userPhone || t("unknownValue")}</small>
                </span>
                <span className="admin-user-meta">
                  {isUserBanned(item) && (
                    <span className="admin-ban-flag">
                      <ShieldBan size={12} /> {t("adminBanned")}
                    </span>
                  )}
                  <span className="admin-user-type">
                    {item.accountType ? t(`accountType${cap(item.accountType)}`) : "—"}
                  </span>
                </span>
              </button>
            ))}
        </div>
      </aside>
    </>
  );
}

function cap(value) {
  return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}
