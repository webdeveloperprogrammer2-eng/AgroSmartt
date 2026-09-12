// Ҳамаи тарҷумаҳои забон дар як объект ҷамъ мешаванд
import { common } from "./common";
import { market } from "./market";
import { profile } from "./profile";
import { info } from "./info";
import { extra } from "./extra";

export const ru = {
  ...common,
  ...market,
  ...profile,
  ...info,
  ...extra,
};
