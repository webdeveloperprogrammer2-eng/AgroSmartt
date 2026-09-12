"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// Модали стандартии shadcn/ui — асоси ҳамаи попапҳои сайт (бо аниматсияи fade + scale)
//
// ЗИНАҲОИ z-index дар сайт:
//   90–100  — навбарҳо, пардаи (overlay) ва худи drawer-и профил
//   2000/1  — ин модал (бояд аз drawer БОЛОТАР бошад, вагарна дар зери
//             пардаи мат мемонад ва хонда намешавад)
//   3000    — рӯйхати <Select> (дар дохили модал кушода мешавад)
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogOverlay({ className, ...props }) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-[2000] bg-black/50 backdrop-blur-sm data-[state=open]:animate-fade-in",
        className
      )}
      {...props}
    />
  );
}

export function DialogContent({ className, children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-[2001] grid max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-lg duration-200 data-[state=open]:animate-scale-in",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <X className="h-4 w-4" />
          <span className="sr-only">Пӯшидан</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ className, ...props }) {
  return <div className={cn("flex flex-col gap-1.5 text-center sm:text-left", className)} {...props} />;
}

export function DialogFooter({ className, ...props }) {
  return (
    <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
  );
}

export function DialogTitle({ className, ...props }) {
  return (
    <DialogPrimitive.Title
      className={cn("text-lg font-bold leading-none tracking-tight text-foreground", className)}
      {...props}
    />
  );
}

export function DialogDescription({ className, ...props }) {
  return <DialogPrimitive.Description className={cn("text-sm text-muted-foreground", className)} {...props} />;
}
