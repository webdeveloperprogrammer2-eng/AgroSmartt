import { useEffect, useRef } from "react";

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
