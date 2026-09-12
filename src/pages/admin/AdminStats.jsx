import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "../../context/language";
import { SECTIONS } from "./adminSections";

export default function AdminStats({ counts, active, onSelect }) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {SECTIONS.map(({ key, statKey, icon: Icon, color }) => {
        const isActive = active === key;
        return (
          <Card
            key={key}
            className={`animate-fade-in-up transition-all ${
              isActive ? "bg-primary/5 ring-2 ring-primary" : "hover:bg-accent/50"
            }`}
          >
            <button
              type="button"
              onClick={() => onSelect(key)}
              aria-pressed={isActive}
              className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
            >
              <CardContent className="flex items-center gap-3 p-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-secondary ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xl font-black">{counts[key] ?? 0}</p>
                  <p className="truncate text-xs text-muted-foreground">{t(statKey)}</p>
                </div>
              </CardContent>
            </button>
          </Card>
        );
      })}
    </div>
  );
}
