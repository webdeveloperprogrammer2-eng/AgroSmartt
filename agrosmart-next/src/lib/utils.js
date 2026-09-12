import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Функсияи ёрирасон барои муттаҳид кардани className-ҳо (истифодаи стандартии shadcn/ui)
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
