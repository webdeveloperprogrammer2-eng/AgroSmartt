import { Link } from "react-router-dom";
import { ShoppingCart, Home } from "lucide-react";
import { useTranslation } from "../../context/language";
import SettingsWidget from "../../components/shared/SettingsWidget";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ALL, CITIES, PRODUCT_CATEGORIES, productCategoryLabel } from "../../lib/catalog";

export default function BozorNavbar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  city,
  onCityChange,
  cartCount,
  onCartClick,
}) {
  const { t } = useTranslation();

  return (
    <header className="bozor-nav">
      <div className="nav-container">
        <h1 className="logo">
          Agro<span>Smart</span>
        </h1>

        <div className="search-box">
          <input
            style={{paddingLeft:'10px'}}
            type="search"
            aria-label={t("searchProduct")}
            placeholder={t("searchProduct")}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="nav-filters">
          <div className="select-wrapper">
            <Select value={category} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-40" aria-label={t("categoryLabel")}>
                <SelectValue>{category === ALL ? t("allProducts") : productCategoryLabel(t, category)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>{t("allProducts")}</SelectItem>
                {PRODUCT_CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {t(c.key)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="select-wrapper">
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
