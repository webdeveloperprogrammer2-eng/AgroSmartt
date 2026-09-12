import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag } from "lucide-react";
import { useTranslation } from "../../context/language";

export default function DoruvoriCartDialog({ open, onOpenChange, cart, removeItem, totalPrice, onCheckout }) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" /> {t("cartTitle")}
          </DialogTitle>
        </DialogHeader>

        {cart.length === 0 ? (
          <p className="py-6 text-center text-muted-foreground">{t("cartEmpty")}</p>
        ) : (
          <div className="flex max-h-72 flex-col gap-2 overflow-y-auto">
            {cart.map((item, i) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-border p-3 animate-fade-in"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity} x {item.price} {t("somoniShort")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="rounded-full p-2 text-destructive hover:bg-destructive/10"
                  aria-label={t("delete")}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <DialogFooter className="items-center gap-3 sm:justify-between">
          <span className="text-lg font-black text-primary">
            {totalPrice} {t("somoniShort")}
          </span>
          <Button disabled={cart.length === 0} onClick={onCheckout}>
            {t("confirmOrder")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
