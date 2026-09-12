"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RegisterForm from "./RegisterForm";
import SignInForm from "./SignInForm";
import AdminLoginPanel from "./AdminLoginPanel";
import AuthNaturePanel from "./AuthNaturePanel";
import SettingsWidget from "../../components/shared/SettingsWidget";
import BrandLogo from "../../components/shared/BrandLogo";
import { useUser } from "../../context/user";
import { useTranslation } from "../../context/language";
import { ArrowLeft, ShieldCheck } from "lucide-react";

// Саҳифаи пурраи Register/Sign in (ба ҷои модал) + дастрасии пинҳонии admin
export default function AuthPage() {
  const [showAdmin, setShowAdmin] = useState(false);
  const { user, isAdmin, registerUser, loginUser, loginAdmin } = useUser();
  const { t } = useTranslation();
  const router = useRouter();

  // Агар корбар аллакай ворид шуда бошад, ин саҳифа лозим нест
  useEffect(() => {
    if (user) router.replace(isAdmin ? "/admin" : "/profile");
  }, [user, isAdmin, router]);

  async function handleRegister(formData) {
    await registerUser(formData);
    router.replace("/profile");
  }

  async function handleSignIn(phone, password) {
    await loginUser(phone, password);
    router.replace("/profile");
  }

  async function handleAdminLogin(code, password, role) {
    await loginAdmin(code, password, role);
    router.replace("/admin");
  }

  return (
    <div className="auth-page flex min-h-screen w-full bg-background">
      <AuthNaturePanel />

      <div className="relative flex w-full flex-col items-center justify-center gap-6 bg-gradient-to-b from-background via-background to-primary/5 p-6 md:w-1/2 md:p-12">
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <SettingsWidget />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <BrandLogo className="h-8 w-8" />
          <span className="text-xl font-black text-primary">AgroSmart.tj</span>
        </div>

        <div className="w-full max-w-md animate-fade-in-up rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
          {!showAdmin ? (
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">{t("signInTab")}</TabsTrigger>
                <TabsTrigger value="register">{t("registerTab")}</TabsTrigger>
              </TabsList>
              <TabsContent value="signin" className="mt-6">
                <SignInForm onSubmit={handleSignIn} />
              </TabsContent>
              <TabsContent value="register" className="mt-6">
                <RegisterForm onSubmit={handleRegister} />
              </TabsContent>
            </Tabs>
          ) : (
            <AdminLoginPanel onSubmit={handleAdminLogin} />
          )}

          {/* Гузариш байни воридшавии оддӣ ва маъмурӣ.
              Пештар ин тугма қариб нонамоён буд (шаффофии 60%) — ҳоло возеҳ аст. */}
          <button
            type="button"
            onClick={() => setShowAdmin((v) => !v)}
            className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {showAdmin ? (
              <>
                <ArrowLeft className="h-4 w-4" /> {t("backToNormalLogin")}
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" /> {t("adminLoginTitle")}
              </>
            )}
          </button>

          <Link
            href="/"
            className="mt-3 flex items-center justify-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> {t("backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
