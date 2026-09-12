"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Modal from "../../components/shared/Modal";
import { CITIES, cityLabel } from "../../lib/catalog";
import { useTranslation } from "../../context/language";

const EMPTY = { cargoName: "", weight: "", fromCity: "Dushanbe", toCity: "Khujand", price: "", description: "" };

// Формаи гузоштани дархости боркашонӣ
export default function CargoFormModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const { t } = useTranslation();

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.cargoName.trim() || !form.weight.trim() || !form.price) {
      setError(t("regFillAlert"));
      return;
    }
    if (form.fromCity === form.toCity) {
      setError(t("cargoSameCity"));
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        ...form,
        cargoName: form.cargoName.trim(),
        weight: form.weight.trim(),
        price: Number(form.price) || 0,
      });
      setForm(EMPTY);
    } catch (err) {
      setError(err.message || t("error"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} className="market-modal">
      <div className="modal-content">
        <header className="modal-head">
          <h3 className="modal-title">{t("cargoNewTitle")}</h3>
          <button type="button" className="close-modal" onClick={onClose} aria-label={t("cancel")}>
            <X size={18} strokeWidth={2.6} />
          </button>
        </header>

        <form className="cargo-form" onSubmit={handleSubmit}>
          <label>
            {t("cargoNameLabel")}
            <input value={form.cargoName} onChange={update("cargoName")} placeholder={t("cargoNamePlaceholder")} />
          </label>

          <div className="cargo-form-pair">
            <label>
              {t("cargoWeightLabel")}
              <input value={form.weight} onChange={update("weight")} placeholder="10 тонна" />
            </label>
            <label>
              {t("cargoPriceLabel")}
              <input type="number" min="0" value={form.price} onChange={update("price")} placeholder="1500" />
            </label>
          </div>

          <div className="cargo-form-pair">
            <label>
              {t("cargoFromLabel")}
              <select value={form.fromCity} onChange={update("fromCity")}>
                {CITIES.map((city) => (
                  <option key={city.value} value={city.value}>
                    {cityLabel(t, city.value)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {t("cargoToLabel")}
              <select value={form.toCity} onChange={update("toCity")}>
                {CITIES.map((city) => (
                  <option key={city.value} value={city.value}>
                    {cityLabel(t, city.value)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label>
            {t("desc")}
            <textarea rows={3} value={form.description} onChange={update("description")} />
          </label>

          {error && <p className="cargo-error">{error}</p>}

          <button type="submit" className="cargo-submit" disabled={saving}>
            {t("cargoPostBtn")}
          </button>
        </form>
      </div>
    </Modal>
  );
}
