"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import AccountTypePicker from "./AccountTypePicker";
import { useTranslation } from "../../context/language";

const EMPTY = { userName: "", userPhone: "", city: "", age: "", password: "", accountType: "" };
const MIN_AGE = 18;

// Формаи регистратсияи пурра: навъи ҳисоб, Ном Насаб, Рақам, Шаҳр, Синну сол (>=18), парол
export default function RegisterForm({ onSubmit }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function setAccountType(accountType) {
    setForm((prev) => ({ ...prev, accountType }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Навъи ҳисоб аввалин чиз аст — бе он маълум нест, ки корбар барои чӣ омад
    if (!form.accountType) {
      setError(t("accountTypeRequired"));
      return;
    }
    if (!form.userName.trim() || !form.userPhone.trim() || !form.city.trim() || !form.password) {
      setError(t("regFillAlert"));
      return;
    }
    if (form.password.length < 4) {
      setError(t("passwordTooShort"));
      return;
    }
    const age = Number(form.age);
    if (!Number.isFinite(age) || age < MIN_AGE) {
      setError(t("ageTooSmall"));
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ ...form, userName: form.userName.trim(), city: form.city.trim(), age });
    } catch (err) {
      setError(err.message ? t(err.message) : t("error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <AccountTypePicker value={form.accountType} onChange={setAccountType} />

      <div className="grid gap-1.5">
        <Label htmlFor="userName">{t("fullNameLabel")}</Label>
        <Input
          id="userName"
          autoComplete="name"
          placeholder={t("fullNamePlaceholder")}
          value={form.userName}
          onChange={update("userName")}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="userPhone">{t("phoneNumberLabel")}</Label>
        <Input
          id="userPhone"
          type="tel"
          autoComplete="tel"
          placeholder="+992 900 00 00 00"
          value={form.userPhone}
          onChange={update("userPhone")}
        />
      </div>
      {/* Шаҳр ва синну сол кӯтоҳанд — дар як сатр ҷой мешаванд ва форма дароз намешавад */}
      <div className="grid grid-cols-[1fr_auto] gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="city">{t("cityAddressLabel")}</Label>
          <Input id="city" placeholder={t("cityAddressPlaceholder")} value={form.city} onChange={update("city")} />
        </div>
        <div className="grid w-24 gap-1.5">
          <Label htmlFor="age">{t("ageLabel")}</Label>
          <Input id="age" type="number" min={MIN_AGE} max="120" placeholder="18" value={form.age} onChange={update("age")} />
        </div>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="password">{t("passwordLabel")}</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={form.password}
          onChange={update("password")}
        />
      </div>

      {error && (
        <p className="text-sm font-medium text-destructive" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" disabled={loading} className="mt-2">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {t("registerTab")}
      </Button>
    </form>
  );
}
