import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import ImagePicker from "../../components/shared/ImagePicker";
import { useTranslation } from "../../context/language";

export default function AdminItemFormModal({ open, section, initialData, onClose, onSubmit }) {
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!open || !section) return;
    setSaving(false);
    setForm(section.toForm(initialData));
  }, [open, section, initialData]);

  if (!section) return null;

  const { icon: Icon } = section;
  const isEdit = Boolean(initialData);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit(section.toPayload(form, t));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${section.color}`} /> {t(isEdit ? section.editKey : section.addKey)}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
          {section.fields.map((field) => {
            const id = `${section.key}-${field.name}`;
            const value = form[field.name] ?? "";

            if (field.type === "image") {
              return (
                <div key={field.name} className="col-span-2">
                  <ImagePicker
                    id={id}
                    label={t(field.labelKey)}
                    value={value}
                    onChange={(v) => update(field.name, v)}
                  />
                </div>
              );
            }

            return (
              <div key={field.name} className={`grid gap-1.5 ${field.half ? "" : "col-span-2"}`}>
                <Label htmlFor={id}>{t(field.labelKey)}</Label>
                {field.type === "select" ? (
                  <Select value={value} onValueChange={(v) => update(field.name, v)}>
                    <SelectTrigger id={id}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                          {t(o.key)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={id}
                    type={field.type}
                    min={field.type === "number" ? "0" : undefined}
                    step={field.type === "number" ? "0.01" : undefined}
                    placeholder={field.type === "url" ? "https://..." : undefined}
                    required={field.required}
                    value={value}
                    onChange={(e) => update(field.name, e.target.value)}
                  />
                )}
              </div>
            );
          })}

          <DialogFooter className="col-span-2">
            <Button type="button" variant="outline" onClick={onClose}>
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {t("save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
