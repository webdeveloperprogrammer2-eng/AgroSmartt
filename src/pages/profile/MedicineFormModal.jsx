import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Pill, Loader2 } from "lucide-react";
import ImagePicker from "../../components/shared/ImagePicker";
import { useTranslation } from "../../context/language";
import {
  CITIES,
  MEDICINE_CATEGORIES,
  normalizeCity,
  normalizeMedicineCategory,
} from "../../lib/catalog";

const EMPTY = {
  img: "",
  name: "",
  category: MEDICINE_CATEGORIES[MEDICINE_CATEGORIES.length - 1].value,
  city: CITIES[0].value,
  description: "",
  price: "",
  leftovers: "",
};

export default function MedicineFormModal({ open, onClose, title, initialData, onSubmit }) {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;
    setSaving(false);
    setForm(
      initialData
        ? {
            img: initialData.img || "",
            name: initialData.name || "",
            category: normalizeMedicineCategory(initialData.category),
            city: normalizeCity(initialData.city),
            description: initialData.description || "",
            price: initialData.price ?? "",
            leftovers: initialData.leftovers ?? "",
          }
        : EMPTY
    );
  }, [open, initialData]);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit({
        ...form,
        name: form.name.trim(),
        img: form.img,
        description: form.description.trim(),
        price: Number(form.price) || 0,
        leftovers: Number(form.leftovers) || 0,
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-primary" /> {title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {t("save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
