import { Leaf, Sun } from "lucide-react";
import BrandLogo from "../../components/shared/BrandLogo";
import { useTranslation } from "../../context/language";

export default function AuthNaturePanel() {
  const { t } = useTranslation();

  return (
    <div className="relative hidden md:flex md:w-1/2 flex-col justify-between overflow-hidden auth-nature-panel p-10 text-white">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 animate-fade-in" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-black/10" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-40 w-40 rounded-full bg-emerald-300/20 blur-2xl" />

      <div className="relative z-10 flex items-center gap-2 animate-fade-in-up">
        <BrandLogo className="h-10 w-10" />
        <span className="text-2xl font-black tracking-tight">AgroSmart.tj</span>
      </div>

      <div className="relative z-10 max-w-sm animate-fade-in-up">
        <h2 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight">{t("authPanelHeading")}</h2>
        <p className="text-white/85">{t("authPanelDesc")}</p>
      </div>

      <div className="relative z-10 flex gap-6 animate-fade-in-up">
        <div className="flex items-center gap-2 text-sm text-white/80">
          <Leaf className="h-4 w-4" /> {t("authPanelFeature1")}
        </div>
        <div className="flex items-center gap-2 text-sm text-white/80">
          <Sun className="h-4 w-4" /> {t("authPanelFeature2")}
        </div>
      </div>
    </div>
  );
}
