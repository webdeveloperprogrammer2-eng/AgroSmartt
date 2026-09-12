"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import AppDialog from "./AppDialog";
import { DialogContext } from "../../context/dialog";
import { useTranslation } from "../../context/language";

// Провайдери ягонаи модалҳо. Дар ҷои alert() ва confirm()-и браузер
// истифода мешавад — ҳамаи хабарҳои сайт як намуди ягона доранд.
export function DialogProvider({ children }) {
  const [state, setState] = useState(null);
  const resolveRef = useRef(null);
  const { t } = useTranslation();

  // Модалро мепӯшем ва ба ваъдаи (promise) кушода натиҷа медиҳем
  const settle = useCallback((result) => {
    setState(null);
    const resolve = resolveRef.current;
    resolveRef.current = null;
    resolve?.(result);
  }, []);

  const open = useCallback((options) => {
    return new Promise((resolve) => {
      // Агар модали қаблӣ ҳанӯз кушода бошад, ӯро бе натиҷа мебандем
      resolveRef.current?.(false);
      resolveRef.current = resolve;
      setState(options);
    });
  }, []);

  const api = useMemo(() => {
    // Хабари оддӣ — як тугмаи "OK"
    const message = (variant) => (text, options = {}) =>
      open({
        variant,
        title: text,
        description: options.description,
        confirmText: options.confirmText || t("okBtn"),
        withCancel: false,
      });

    return {
      success: message("success"),
      error: message("error"),
      info: message("info"),

      // Пурсиш — true/false бармегардонад
      confirm: ({ title, description, confirmText, cancelText, danger = false } = {}) =>
        open({
          variant: danger ? "danger" : "confirm",
          title,
          description,
          confirmText: confirmText || t("deleteModalYes"),
          cancelText: cancelText || t("deleteModalNo"),
          withCancel: true,
        }),
    };
  }, [open, t]);

  return (
    <DialogContext.Provider value={api}>
      {children}
      <AppDialog
        open={Boolean(state)}
        onOpenChange={(next) => {
          if (!next) settle(false);
        }}
        variant={state?.variant}
        title={state?.title}
        description={state?.description}
        confirmText={state?.confirmText}
        cancelText={state?.cancelText}
        withCancel={state?.withCancel}
        onConfirm={() => settle(true)}
        onCancel={() => settle(false)}
      />
    </DialogContext.Provider>
  );
}
