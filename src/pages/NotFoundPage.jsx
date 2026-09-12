import { Link } from "react-router-dom";
import { Sprout, ArrowLeft } from "lucide-react";
import { useTranslation } from "../context/language";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <Sprout className="h-14 w-14 text-primary" />
      <h1 className="text-5xl font-black text-primary">404</h1>
      <p className="max-w-sm text-muted-foreground">{t("notFoundDesc")}</p>
      <Link
        to="/"
        className="mt-2 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        <ArrowLeft className="h-4 w-4" /> {t("backToHome")}
      </Link>
    </div>
  );
}
