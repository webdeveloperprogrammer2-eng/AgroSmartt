import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "../../context/language";

export default function AdminListPanel({ section, items, onAdd, onEdit, onDelete }) {
  const { t } = useTranslation();
  const { icon: Icon } = section;
  const list = Array.isArray(items) ? items : [];

  return (
    <Card>
      <CardContent className="p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Icon className={`h-5 w-5 ${section.color}`} /> {t(section.panelKey)} ({list.length})
          </h2>
          <Button size="sm" onClick={onAdd}>
            <Plus className="h-4 w-4" /> {t(section.addKey)}
          </Button>
        </div>

        <div className="flex flex-col divide-y divide-border">
          {list.length === 0 && (
            <p className="py-6 text-center text-muted-foreground">{t(section.emptyKey)}</p>
          )}
          {list.map((item) => {
            const meta = section.meta(t, item).filter(Boolean).join(" · ");
            return (
              <div key={item.id} className="flex items-center justify-between gap-3 py-3 animate-fade-in">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    {item.img ? (
                      <img
                        src={item.img}
                        alt={section.title(item) || ""}
                        className="h-full w-full rounded-lg object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <Icon className={`h-5 w-5 ${section.color} opacity-60`} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{section.title(item)}</p>
                    <p className="truncate text-xs text-muted-foreground">{meta}</p>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button size="icon" variant="outline" onClick={() => onEdit(item)} aria-label={t("edit")}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => onDelete(item)} aria-label={t("delete")}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
