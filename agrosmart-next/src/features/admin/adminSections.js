// Тавсифи ягонаи ҳар бахши панели admin.
//
// Ҳар чор бахш (замин, маҳсулот, дорувори, дархостҳо) сохтори якхела доранд:
// рӯйхат + илова + таҳрир + несткунӣ. Ба ҷои чор компоненти такрорӣ ҳамаашро
// аз ҳамин ҷадвал мегирем — саҳифа ва форма умумӣ мемонанд ва ҳангоми иловаи
// бахши нав фақат як файли нав дар "sections/" сохта мешавад.
//
// Рангҳо статикӣ навишта мешаванд — Tailwind номи синфҳои динамикӣ
// (масалан `text-${color}-600`)-ро намебинад ва онҳоро намесозад.
import { zaminSection } from "./sections/zamin";
import { mahsulotSection } from "./sections/mahsulot";
import { aptekaSection } from "./sections/apteka";
import { jobsSection } from "./sections/jobs";

export const SECTIONS = [zaminSection, mahsulotSection, aptekaSection, jobsSection];

export const SECTION_BY_KEY = Object.fromEntries(SECTIONS.map((s) => [s.key, s]));
