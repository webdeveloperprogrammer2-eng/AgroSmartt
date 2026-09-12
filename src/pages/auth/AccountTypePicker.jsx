import { Check } from "lucide-react";
import { ACCOUNT_TYPES } from "../../lib/accountTypes";
import { useTranslation } from "../../context/language";

export default function AccountTypePicker({ value, onChange }) {
  const { t } = useTranslation();

  return (
    <fieldset className="grid gap-2">
      <legend className="mb-1.5 text-sm font-medium text-foreground">{t("accountTypeLabel")}</legend>

      <div className="grid grid-cols-3 gap-2">
        {ACCOUNT_TYPES.map(({ value: type, Icon, labelKey, descKey }) => {
          const active = value === type;
          return (
            <button
              key={type}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(type)}
              className={[
                "relative flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center",
                "transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "border-primary bg-primary/10 text-primary shadow-sm"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:bg-accent",
              ].join(" ")}
            >
              {active && (
                <span className="absolute right-1.5 top-1.5 rounded-full bg-primary p-0.5 text-primary-foreground">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              )}
              <Icon className="h-6 w-6" strokeWidth={1.8} />
              <span className="text-xs font-semibold leading-tight">{t(labelKey)}</span>
              <span className="text-[10px] leading-tight opacity-75">{t(descKey)}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
