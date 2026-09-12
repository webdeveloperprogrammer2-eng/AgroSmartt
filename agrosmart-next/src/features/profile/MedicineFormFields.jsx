"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import ImagePicker from "../../components/shared/ImagePicker";
import { useTranslation } from "../../context/language";
import { CITIES, MEDICINE_CATEGORIES } from "../../lib/catalog";

// Майдонҳои формаи дору. Ҷудо гирифта шуданд, то худи модал кӯтоҳ бошад.
export default function MedicineFormFields({ form, update }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="grid gap-1.5">
        <Label htmlFor="med-name">{t("medicineNameLabel")}</Label>
        <Input id="med-name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
      </div>

      <ImagePicker
        id="med-img"
        label={t("medicineImgLabel")}
        value={form.img}
        onChange={(v) => update("img", v)}
      />

      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="med-category">{t("categoryLabel")}</Label>
          <Select value={form.category} onValueChange={(v) => update("category", v)}>
            <SelectTrigger id="med-category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MEDICINE_CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {t(c.key)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="med-city">{t("cityOnlyLabel")}</Label>
          <Select value={form.city} onValueChange={(v) => update("city", v)}>
            <SelectTrigger id="med-city">
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
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="med-price">{t("priceSomoniLabel")}</Label>
          <Input
            id="med-price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            required
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="med-leftovers">{t("quantity")}</Label>
          <Input
            id="med-leftovers"
            type="number"
            min="0"
            value={form.leftovers}
            onChange={(e) => update("leftovers", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="med-desc">{t("desc")}</Label>
        <Input id="med-desc" value={form.description} onChange={(e) => update("description", e.target.value)} />
      </div>
    </>
  );
}
