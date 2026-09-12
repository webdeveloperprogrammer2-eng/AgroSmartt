import { PackageSearch } from "lucide-react";
import DoruvoriCard from "./DoruvoriCard";
import { useTranslation } from "../../context/language";

export default function DoruvoriGrid({ items, onBuy, onDetail, canBuy }) {
  const { t } = useTranslation();
  const list = Array.isArray(items) ? items : [];

  if (list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-muted-foreground animate-fade-in">
        <PackageSearch className="h-12 w-12" />
        <p>{t("noMedicinesFound")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {list.map((item) => (
        <DoruvoriCard key={item.id} item={item} onBuy={onBuy} onDetail={onDetail} canBuy={canBuy} />
      ))}
    </div>
  );
}
