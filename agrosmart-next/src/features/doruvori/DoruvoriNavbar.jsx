"use client";

import Link from "next/link";
import { ShoppingCart, Home } from "lucide-react";
import { useTranslation } from "../../context/language";
import SettingsWidget from "../../components/shared/SettingsWidget";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ALL, MEDICINE_CATEGORIES } from "../../lib/catalog";

// Навбари бозори дорувори — ҳамон сохтори бозор ва бозори замин
// (bozor-nav / nav-container), то ҳар се бозор як хел бошанд ва
// тугмаи "Асосӣ" дар ҳамаашон дар як ҷо истад.
export default function DoruvoriNavbar({ search, onSearchChange, category, onCategoryChange, cartCount, onCartOpen }) {
  const { t } = useTranslation();

  return (
    <header className="bozor-nav">
      <div className="nav-container">
        <h1 className="logo">
          Agro<span>Smart</span>{" "}
          <small className="nav-subtitle">{t("pharmacyTitle")}</small>
        </h1>

        <div className="nav-filter-group">
          <div className="search-box">
            <input
              type="search"
              aria-label={t("searchMedicine")}
              placeholder={t("searchMedicine")}
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="select-box">
            <Select value={category} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-44" aria-label={t("categoryLabel")}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>{t("allCategories")}</SelectItem>
                {MEDICINE_CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {t(c.key)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="nav-actions">
          <button type="button" className="cart-icon-btn" onClick={onCartOpen} aria-label={t("cart")}>
            <ShoppingCart size={20} strokeWidth={2.2} />
            {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
          </button>
          {/* Дар телефон танҳо икона мемонад — матн пинҳон мешавад,
              вале худи тугма дигар нест намешавад */}
          <Link href="/" className="back-btn" aria-label={t("home")}>
            <Home size={17} strokeWidth={2.3} />
            <span className="back-btn-label">{t("home")}</span>
          </Link>
          <SettingsWidget />
        </div>
      </div>
    </header>
  );
}
