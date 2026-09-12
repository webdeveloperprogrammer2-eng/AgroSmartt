import { ShoppingBasket, Store, Truck } from "lucide-react";

export const ACCOUNT_TYPES = [
  {
    value: "buyer",
    Icon: ShoppingBasket,
    labelKey: "accountTypeBuyer",
    descKey: "accountTypeBuyerDesc",
    activeKey: "activeBuyerBadge",
  },
  {
    value: "seller",
    Icon: Store,
    labelKey: "accountTypeSeller",
    descKey: "accountTypeSellerDesc",
    activeKey: "activeFarmerBadge",
  },
  {
    value: "driver",
    Icon: Truck,
    labelKey: "accountTypeDriver",
    descKey: "accountTypeDriverDesc",
    activeKey: "activeDriverBadge",
  },
];

export function findAccountType(value) {
  return ACCOUNT_TYPES.find((item) => item.value === value) || null;
}
