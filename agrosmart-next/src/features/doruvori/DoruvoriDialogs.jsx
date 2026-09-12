"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Pill } from "lucide-react";
import { useTranslation } from "../../context/language";
import { cityLabel, medicineCategoryLabel } from "../../lib/catalog";

// Дидани маълумоти пурраи дору
export function DoruvoriDetailDialog({ item, onOpenChange }) {
  const { t } = useTranslation();

  return (
    <Dialog open={Boolean(item)} onOpenChange={onOpenChange}>
      <DialogContent>
        {item && (
          <>
            <div className="flex h-44 items-center justify-center overflow-hidden rounded-lg bg-secondary">
              {item.img ? (
                <img src={item.img} alt={item.name} className="h-full w-full object-cover" />
              ) : (
                <Pill className="h-16 w-16 text-primary/40" />
              )}
            </div>
            <DialogHeader>
              <DialogTitle>{item.name}</DialogTitle>
              <DialogDescription>{item.description || t("noDescription")}</DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-between text-sm">
              <span className="text-lg font-black text-primary">
                {item.price} {t("somoniShort")}
              </span>
              <span className="text-muted-foreground">{medicineCategoryLabel(t, item.category)}</span>
              <span className="text-muted-foreground">{cityLabel(t, item.city)}</span>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
