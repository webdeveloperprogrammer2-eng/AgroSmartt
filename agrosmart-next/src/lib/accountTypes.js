import { ShoppingBasket, Store, Truck } from "lucide-react";

// Се навъи ҳисоб — ҳангоми сабти ном корбар яктоашро интихоб мекунад.
// Ин ҷо ягона ҷои рӯйхат аст, то форма ва кабинет ҳамеша якхела бошанд.
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

// Навъи ҳисоби корбар — агар холӣ бошад, null бармегардад
export function findAccountType(value) {
  return ACCOUNT_TYPES.find((item) => item.value === value) || null;
}
