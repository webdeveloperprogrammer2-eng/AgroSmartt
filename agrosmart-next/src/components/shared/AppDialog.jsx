"use client";

import Modal from "./Modal";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, Info, HelpCircle } from "lucide-react";

// Ягона модали хабар/тасдиқ барои тамоми сайт.
// Ҳар навъ иконка ва ранги худро дорад, вале сохт якхела мемонад.
//
// МУҲИМ: ин модал ҳатман тег <dialog>-и худи браузерро истифода мебарад
// (тавассути Modal), на попапи Radix. Сабаб: формаҳои иловаи маҳсулот/замин/
// дорувори низ <dialog> ҳастанд ва бо showModal() ба "top layer" мебароянд —
// он ҷо ҳеҷ z-index кор намекунад. Хабари Radix зери пардаи форма пинҳон
// мемонд, корбар тугмаи "OK"-ро дида наметавонист, promise ҳал намешуд ва
// дар натиҷа форма пас аз сабт кушода мемонд.
const VARIANTS = {
  success: { Icon: CheckCircle2, ring: "bg-primary/10", tone: "text-primary", action: "default" },
  error: { Icon: AlertTriangle, ring: "bg-destructive/10", tone: "text-destructive", action: "destructive" },
  info: { Icon: Info, ring: "bg-secondary", tone: "text-primary", action: "default" },
  confirm: { Icon: HelpCircle, ring: "bg-secondary", tone: "text-primary", action: "default" },
  danger: { Icon: AlertTriangle, ring: "bg-destructive/10", tone: "text-destructive", action: "destructive" },
};

export default function AppDialog({
  open,
  onOpenChange,
  variant = "info",
  title,
  description,
  confirmText,
  cancelText,
  // Агар true бошад — ду тугма (тасдиқ/бекор), вагарна танҳо "OK"
  withCancel = false,
  onConfirm,
  onCancel,
}) {
  const { Icon, ring, tone, action } = VARIANTS[variant] || VARIANTS.info;

  // Пӯшидан бо Escape ё аз берун = "бекор кардан"
  function handleClose() {
    onCancel?.();
    onOpenChange?.(false);
  }

  return (
    <Modal open={open} onClose={handleClose} className="app-dialog">
      <div className="app-dialog-body">
        <div className={`app-dialog-icon ${ring}`}>
          <Icon className={`h-6 w-6 ${tone}`} />
        </div>

        <h2 className="app-dialog-title">{title}</h2>
        {description && <p className="app-dialog-desc">{description}</p>}

        <div className="app-dialog-actions">
          {withCancel && (
            <Button variant="outline" className="min-w-24" onClick={onCancel}>
              {cancelText}
            </Button>
          )}
          <Button variant={action} className="min-w-24" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
