import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck, User, Crown } from "lucide-react";
import { useTranslation } from "../../context/language";

const ROLES = [
  { value: "admin", label: "Admin", icon: User },
  { value: "superadmin", label: "SuperAdmin", icon: Crown },
];

export default function AdminLoginPanel({ onSubmit }) {
  const [role, setRole] = useState("admin");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!phone.trim() || !password) {
      setError(t("enterPhoneAndPassword"));
      return;
    }
    setLoading(true);
    try {
      await onSubmit(phone.trim(), password, role);
    } catch (err) {
      setError(err.message ? t(err.message) : t("error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="flex items-center gap-2 text-sm font-bold text-foreground">
        <ShieldCheck className="h-4 w-4 text-primary" /> {t("adminLoginTitle")}
      </div>

      <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1">
        {ROLES.map(({ value, label, icon: Icon }) => {
          const active = role === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setRole(value)}
              aria-pressed={active}
              className={`flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold transition-all ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="admin-phone">{t("phoneNumberLabel")}</Label>
        <Input
          id="admin-phone"
          type="tel"
          autoComplete="tel"
          placeholder="+992 900 00 00 00"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="admin-password">{t("passwordLabel")}</Label>
        <Input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" disabled={loading}>
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {t("loginAs")} {role === "superadmin" ? "SuperAdmin" : "Admin"}
      </Button>
    </form>
  );
}
