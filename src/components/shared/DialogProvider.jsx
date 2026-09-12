import { useCallback, useMemo, useRef, useState } from "react";
import AppDialog from "./AppDialog";
import { DialogContext } from "../../context/dialog";
import { useTranslation } from "../../context/language";

export function DialogProvider({ children }) {
  const [state, setState] = useState(null);
  const resolveRef = useRef(null);
  const { t } = useTranslation();

  const settle = useCallback((result) => {
    setState(null);
    const resolve = resolveRef.current;
    resolveRef.current = null;
    resolve?.(result);
  }, []);

  const open = useCallback((options) => {
    return new Promise((resolve) => {
      resolveRef.current?.(false);
      resolveRef.current = resolve;
      setState(options);
    });
  }, []);

  const api = useMemo(() => {
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
