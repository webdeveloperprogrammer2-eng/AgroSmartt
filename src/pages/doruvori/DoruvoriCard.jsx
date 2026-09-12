import { Pill, ShoppingCart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FavoriteButton from "../../components/shared/FavoriteButton";
import { useTranslation } from "../../context/language";
import { cityLabel } from "../../lib/catalog";

export default function DoruvoriCard({ item, onBuy, onDetail, canBuy }) {
  const { t } = useTranslation();

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in-up">
      <FavoriteButton itemType="ZaminApteka" itemId={item.id} />
      <button
        type="button"
        className="block w-full text-left"
        onClick={() => onDetail(item)}
        aria-label={`${item.name} — ${t("details")}`}
      >
        <div className="flex h-40 items-center justify-center overflow-hidden bg-secondary">
          {item.img ? (
            <img
              src={item.img}
              alt={item.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <Pill className="h-14 w-14 text-primary/40" />
          )}
        </div>
      </button>
      <CardContent className="p-4">
        <h3 className="mb-1 truncate font-bold text-foreground">{item.name}</h3>
        <p className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" /> {cityLabel(t, item.city)}
        </p>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-lg font-black text-primary">
            {item.price} {t("somoniShort")}
          </span>
          <span className="text-xs text-muted-foreground">
            {item.leftovers ?? 0} {t("pieceShort")}
          </span>
        </div>
        <Button className="w-full" size="sm" disabled={!canBuy} onClick={() => onBuy(item)}>
          <ShoppingCart className="h-4 w-4" /> {canBuy ? t("buy") : t("unavailable")}
        </Button>
      </CardContent>
    </Card>
  );
}
