"use client";

import { useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import { useTranslation } from "../../context/language";
import { fileToDataUrl, imgOrPlaceholder } from "../../lib/images";

// Майдони ягонаи интихоби сурат барои ҳамаи формаҳо
// (маҳсулот, замин, дору). Пештар дар ин ҷо суроғаи (URL) сурат пурсида
// мешуд — ҳоло файл мустақим аз компютери корбар гирифта мешавад.
export default function ImagePicker({ id, label, value, onChange }) {
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  async function handleFile(e) {
    const file = e.target.files?.[0];
    // Ҳамон файлро дубора интихоб кардан мумкин бошад
    e.target.value = "";
    if (!file) return;

    setError("");
    try {
      onChange(await fileToDataUrl(file));
    } catch (err) {
      setError(t(err.message));
    }
  }

  return (
    <div className="image-picker">
      <span className="image-picker-label">{label}</span>

      <div className="image-picker-row">
        <div className="image-picker-preview">
          <img src={imgOrPlaceholder(value)} alt="" />
        </div>

        <div className="image-picker-controls">
          <button type="button" className="image-picker-btn" onClick={() => inputRef.current?.click()}>
            <ImagePlus size={16} strokeWidth={2.2} />
            {value ? t("changeImage") : t("chooseImage")}
          </button>

          {value && (
            <button
              type="button"
              className="image-picker-btn image-picker-btn-danger"
              onClick={() => {
                setError("");
                onChange("");
              }}
            >
              <Trash2 size={15} strokeWidth={2.2} />
              {t("removeImage")}
            </button>
          )}

          <span className="image-picker-hint">{t("imageHint")}</span>
        </div>
      </div>

      {error && <p className="image-picker-error">{error}</p>}

      <input
        id={id}
        ref={inputRef}
        type="file"
        accept="image/*"
        className="image-picker-input"
        onChange={handleFile}
      />
    </div>
  );
}
