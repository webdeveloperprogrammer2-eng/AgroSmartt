"use client";

import { useEffect, useRef } from "react";

// Компоненти умумии Modal (истифодаи тег <dialog> - барои ҳамаи саҳифаҳо якхела)
// open: true/false - оё модал кушода бошад
// onClose: функсия барои пӯшидани модал
export default function Modal({ open, onClose, className = "", children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Агар корбар аз берун (бо Escape ё клик) пӯшад, ҳолати падарро низ навсозӣ мекунем
  function handleCancel(e) {
    e.preventDefault();
    onClose?.();
  }

  return (
    <dialog
      ref={dialogRef}
      className={`custom-modal ${className} ${open ? "modal-visible" : ""}`}
      onCancel={handleCancel}
      onClose={() => onClose?.()}
    >
      {children}
    </dialog>
  );
}
