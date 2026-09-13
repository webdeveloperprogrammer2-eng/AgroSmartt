"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import ImagePicker from "../../components/shared/ImagePicker";
import { useTranslation } from "../../context/language";
import { CITIES, PRODUCT_CATEGORIES, productCategoryLabel } from "../../lib/catalog";

// Майдонҳои формаи маҳсулот. Ҷудо гирифта шуданд, то худи модал кӯтоҳ бошад.
export default function ProductFormFields({ form, update }) {
  const { t } = useTranslation();

  return (
    <>
      <ImagePicker
        id="product-img"
        label={t("productImgLabel")}
        value={form.img}
        onChange={(v) => update("img", v)}
      />

      <div className="input-group">
        <label htmlFor="product-name">{t("productNameLabel")}</label>
        <input
          id="product-name"
          type="text"
          placeholder={t("productNamePlaceholder")}
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="product-category">{t("categoryLabel")}</label>
        <Select value={form.category} onValueChange={(v) => update("category", v)}>
          <SelectTrigger id="product-category">
            <SelectValue>{productCategoryLabel(t, form.category)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {PRODUCT_CATEGORIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {t(c.key)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="input-group">
        <label htmlFor="product-city">{t("cityOnlyLabel")}</label>
        <Select value={form.city} onValueChange={(v) => update("city", v)}>
          <SelectTrigger id="product-city">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CITIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {t(c.key)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="input-group">
        <label htmlFor="product-desc">{t("descriptionFieldLabel")}</label>
        <textarea
          id="product-desc"
          placeholder={t("productDescPlaceholder")}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        ></textarea>
      </div>

      <div className="input-group">
        <label htmlFor="product-price">{t("priceTjsLabel")}</label>
        <input
          id="product-price"
          type="number"
          min="0"
          step="0.01"
          placeholder="0"
          value={form.price}
          onChange={(e) => update("price", e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="product-leftovers">{t("totalQuantityLabel")}</label>
        <input
          id="product-leftovers"
          type="number"
          min="0"
          placeholder="0"
          value={form.leftovers}
          onChange={(e) => update("leftovers", e.target.value)}
          required
        />
      </div>
    </>
  );
}
