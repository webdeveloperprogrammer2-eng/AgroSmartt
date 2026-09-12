import { Link } from "react-router-dom";
import { ShoppingCart, Home } from "lucide-react";
import { useTranslation } from "../../context/language";
import SettingsWidget from "../../components/shared/SettingsWidget";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ALL, CITIES } from "../../lib/catalog";

export default function ZaminNavbar({ search, onSearchChange, city, onCityChange, cartCount, onCartClick }) {
  const { t } = useTranslation();

  return (
    <header className="bozor-nav">
      <div className="nav-container">
        <h1 className="logo">
          Agro<span>Smart</span>{" "}
          <small className="nav-subtitle">{t("landRent")}</small>
        </h1>

        <div className="nav-filter-group">
          <div className="search-box">
            <input
              type="search"
              aria-label={t("searchLand")}
              placeholder={t("searchLand")}
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="select-box">
            <Select value={city} onValueChange={onCityChange}>
              <SelectTrigger className="w-44" aria-label={t("cityOnlyLabel")}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>{t("allCities")}</SelectItem>
                {CITIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {t(c.key)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="nav-actions">
          <button type="button" className="cart-icon-btn" onClick={onCartClick} aria-label={t("cart")}>
            <ShoppingCart size={20} strokeWidth={2.2} />
            {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
          </button>
          <Link to="/" className="back-btn" aria-label={t("home")}>
            <Home size={17} strokeWidth={2.3} />
            <span className="back-btn-label">{t("home")}</span>
          </Link>
          <SettingsWidget />
        </div>
      </div>
    </header>
  );
}
