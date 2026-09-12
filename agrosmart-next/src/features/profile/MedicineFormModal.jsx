"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pill, Loader2 } from "lucide-react";
import MedicineFormFields from "./MedicineFormFields";
import { useTranslation } from "../../context/language";
import { CITIES, MEDICINE_CATEGORIES, normalizeCity, normalizeMedicineCategory } from "../../lib/catalog";

const EMPTY = {
  img: "",
  name: "",
  category: MEDICINE_CATEGORIES[MEDICINE_CATEGORIES.length - 1].value,
  city: CITIES[0].value,
  description: "",
  price: "",
  leftovers: "",
};

// Форма барои иловаи/таҳрири дору (ҳам дар профил, ҳам дар панели admin)
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
          <MedicineFormFields form={form} update={update} />

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
