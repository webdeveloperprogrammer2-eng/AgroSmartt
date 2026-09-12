import { Pill } from "lucide-react";
import ProfileSection from "./ProfileSection";
import ProfileItemCard from "./ProfileItemCard";
import { useTranslation } from "../../context/language";
import { medicineCategoryLabel } from "../../lib/catalog";

export default function MedicinesSection({ medicines, onEdit, onDelete }) {
  const { t } = useTranslation();
  const list = Array.isArray(medicines) ? medicines : [];

  return (
    <ProfileSection
      Icon={Pill}
      tone="violet"
      title={t("myMedicinesTitle")}
      count={list.length}
      emptyText={t("noMedicinesAddedYet")}
      isEmpty={list.length === 0}
    >
      {list.map((m) => (
        <ProfileItemCard
          key={m.id}
          img={m.img}
          alt={m.name}
          fallbackIcon={Pill}
          tag={medicineCategoryLabel(t, m.category)}
          tone="violet"
          title={m.name}
          desc={m.description || m.desc || ""}
          price={`${m.price} ${t("somoniShort")}`}
          meta={`${m.leftovers ?? 0} ${t("pieceShort")}`}
          onEdit={() => onEdit(m)}
          onDelete={() => onDelete(m)}
        />
      ))}
    </ProfileSection>
  );
}
