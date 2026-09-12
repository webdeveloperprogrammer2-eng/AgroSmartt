import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../../context/language";
import SettingsWidget from "../../components/shared/SettingsWidget";

import { Home, Menu, ShoppingCart, User, X } from "lucide-react";
export default function MushtariNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useTranslation();

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <nav className="main-navbar">
        <div className="nav-logo">AgroSmart Dashboard</div>
        <div className="nav-actions-group">
          <Link to="/" className="nav-btn-link desktop-nav-links">
            <Home size={17} /> {t("home")}
          </Link>
          <SettingsWidget />
          <Link to="/profile" className="nav-btn-link desktop-nav-links">
            <User size={17} /> {t("cabinet")}
          </Link>
          <button
            type="button"
            className="mobile-menu-hamburger"
            onClick={() => setDrawerOpen(true)}
            aria-label={t("openMenu")}
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      <div
        className={`sidebar-overlay ${drawerOpen ? "active" : ""}`}
        onClick={closeDrawer}
        aria-hidden="true"
      ></div>
      <div className={`right-drawer ${drawerOpen ? "active" : ""}`}>
        <button
          type="button"
          className="close-drawer-btn"
          onClick={closeDrawer}
          aria-label={t("cancel")}
        >
          <X size={20} />
        </button>
        <div className="divider"></div>
        <nav className="drawer-menu">
          <Link to="/" className="menu-item" onClick={closeDrawer}>
            <Home size={17} /> {t("home")}
          </Link>
          <Link to="/profile" className="menu-item" onClick={closeDrawer}>
            <User size={17} /> {t("cabinet")}
          </Link>
          <Link to="/bozor" className="menu-item" onClick={closeDrawer}>
            <ShoppingCart size={17} /> {t("market")}
          </Link>
        </nav>
      </div>
    </>
  );
}
