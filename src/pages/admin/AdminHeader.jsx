import { ShieldCheck, UserRound, LogOut } from "lucide-react";
import BrandLogo from "../../components/shared/BrandLogo";
import { Button } from "@/components/ui/button";
import SettingsWidget from "../../components/shared/SettingsWidget";
import { useTranslation } from "../../context/language";

export default function AdminHeader({ isSuperAdmin, onLogout, onOpenUsers }) {
  const { t } = useTranslation();

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-6 py-4">
      <div className="flex items-center gap-2 font-black text-primary">
        <BrandLogo className="h-7 w-7" /> AgroSmart — Admin
      </div>
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          <ShieldCheck className="h-3.5 w-3.5" /> {isSuperAdmin ? "SuperAdmin" : "Admin"}
        </span>
        <button
          type="button"
          className="admin-users-trigger"
          onClick={onOpenUsers}
          aria-label={t("adminUsersTitle")}
          title={t("adminUsersTitle")}
        >
          <UserRound className="h-4 w-4" />
        </button>
        <SettingsWidget />
        <Button variant="outline" size="sm" onClick={onLogout}>
          <LogOut className="h-4 w-4" /> {t("logoutMenu")}
        </Button>
      </div>
    </header>
  );
}
