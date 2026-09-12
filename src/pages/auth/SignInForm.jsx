import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslation } from "../../context/language";

export default function SignInForm({ onSubmit }) {
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
      await onSubmit(phone.trim(), password);
    } catch (err) {
      setError(err.message ? t(err.message) : t("error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="signin-phone">{t("phoneNumberLabel")}</Label>
        <Input
          id="signin-phone"
          type="tel"
          autoComplete="tel"
          placeholder="+992 900 00 00 00"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="signin-password">{t("passwordLabel")}</Label>
        <Input
          id="signin-password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && (
        <p className="text-sm font-medium text-destructive" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" disabled={loading} className="mt-2">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {t("signInTab")}
      </Button>
    </form>
  );
}
