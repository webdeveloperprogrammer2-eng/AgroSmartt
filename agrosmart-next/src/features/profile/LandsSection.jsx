"use client";

import { Tractor } from "lucide-react";
import ProfileSection from "./ProfileSection";
import LandItemCard from "./LandItemCard";
import { useTranslation } from "../../context/language";

export default function LandsSection({ lands, onEdit, onDelete }) {
  const { t } = useTranslation();
  const list = Array.isArray(lands) ? lands : [];

  return (
    <ProfileSection
      Icon={Tractor}
      tone="blue"
      title={t("yourLandsTitle")}
      count={list.length}
      emptyText={t("noLandsAddedYet")}
      isEmpty={list.length === 0}
    >
      {list.map((l) => (
        <LandItemCard key={l.id} land={l} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ProfileSection>
  );
}
