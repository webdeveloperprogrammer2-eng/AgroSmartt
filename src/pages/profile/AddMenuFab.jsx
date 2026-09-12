import { useEffect, useRef, useState } from "react";
import { Plus, Apple, Tractor, Pill } from "lucide-react";
import { useTranslation } from "../../context/language";

export default function AddMenuFab({ onAddProduct, onAddLand, onAddMedicine }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;

    function handleClick(e) {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    }
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const items = [
    {
      key: "product",
      Icon: Apple,
      tone: "is-green",
      title: t("actionNewProductTitle"),
      desc: t("actionNewProductDesc"),
      onClick: onAddProduct,
    },
    {
      key: "land",
      Icon: Tractor,
      tone: "is-blue",
      title: t("actionNewLandTitle"),
      desc: t("actionNewLandDesc"),
      onClick: onAddLand,
    },
    {
      key: "medicine",
      Icon: Pill,
      tone: "is-violet",
      title: t("actionNewMedicineTitle"),
      desc: t("actionNewMedicineDesc"),
      onClick: onAddMedicine,
    },
  ];

  function pick(action) {
    setOpen(false);
    action();
  }

  return (
    <div className="add-fab-wrap" ref={wrapRef}>
      {open && (
        <div className="add-fab-menu" role="menu">
          <p className="add-fab-menu-title">{t("addNewMenuTitle")}</p>
          {items.map(({ key, Icon, tone, title, desc, onClick }) => (
            <button
              key={key}
              type="button"
              role="menuitem"
              className="add-fab-item"
              onClick={() => pick(onClick)}
            >
              <span className={`add-fab-item-icon ${tone}`}>
                <Icon size={17} strokeWidth={2.2} />
              </span>
              <span className="add-fab-item-text">
                <b>{title}</b>
                <small>{desc}</small>
              </span>
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        className={`add-fab ${open ? "is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("addNewMenuTitle")}
      >
        <Plus size={23} strokeWidth={2.6} />
      </button>
    </div>
  );
}
