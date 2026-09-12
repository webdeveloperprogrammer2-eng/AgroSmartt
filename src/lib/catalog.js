export const ALL = "All";

export const CITIES = [
  { value: "Dushanbe", key: "dushanbe" },
  { value: "Khujand", key: "khujand" },
  { value: "Bokhtar", key: "bokhtar" },
  { value: "Kulob", key: "kulob" },
  { value: "Hisor", key: "hisor" },
  { value: "Hamadoni", key: "hamadoni" },
  { value: "Norak", key: "norak" },
  { value: "Farkhor", key: "farkhor" },
  { value: "Fayzobod", key: "fayzobod" },
  { value: "Rudaki", key: "rudaki" },
  { value: "Vahdat", key: "vahdat" },
];

export const PRODUCT_CATEGORIES = [
  { value: "Sabzavot", key: "vegetables" },
  { value: "Meva", key: "fruits" },
  { value: "Khushmeva", key: "driedFruits" },
  { value: "Alaf", key: "grass" },
];

export const MEDICINE_CATEGORIES = [
  { value: "Darakhtho", key: "medCatTrees" },
  { value: "Sabzavot", key: "medCatVegetables" },
  { value: "Hayvonot", key: "medCatAnimals" },
  { value: "Zamin", key: "medCatLand" },
  { value: "Digar", key: "medCatOther" },
];

const CITY_ALIASES = {
  nohiyaihamadoni: "Hamadoni",
  hissor: "Hisor",
  hisor: "Hisor",
  dushanbe: "Dushanbe",
};

const CATEGORY_ALIASES = {
  fruit: "Meva",
  meva: "Meva",
  vegetable: "Sabzavot",
  sabzavot: "Sabzavot",
  grain: "Alaf",
  alaf: "Alaf",
  khushmeva: "Khushmeva",
};

const MEDICINE_CATEGORY_ALIASES = {
  "дарахтҳо": "Darakhtho",
  "сабзавот": "Sabzavot",
  "ҳайвонот": "Hayvonot",
  "замин": "Zamin",
  "дигар": "Digar",
};

function normalize(list, aliases, raw, fallback) {
  if (!raw) return fallback;
  const lower = String(raw).toLowerCase();
  const direct = list.find((item) => item.value.toLowerCase() === lower);
  if (direct) return direct.value;
  return aliases[lower] || fallback;
}

export function normalizeCity(raw) {
  return normalize(CITIES, CITY_ALIASES, raw, "Dushanbe");
}

export function normalizeProductCategory(raw) {
  return normalize(PRODUCT_CATEGORIES, CATEGORY_ALIASES, raw, "Sabzavot");
}

export function normalizeMedicineCategory(raw) {
  return normalize(MEDICINE_CATEGORIES, MEDICINE_CATEGORY_ALIASES, raw, "Digar");
}

export function cityLabel(t, raw) {
  const value = normalizeCity(raw);
  const found = CITIES.find((c) => c.value === value);
  return found ? t(found.key) : value;
}

export function productCategoryLabel(t, raw) {
  const value = normalizeProductCategory(raw);
  const found = PRODUCT_CATEGORIES.find((c) => c.value === value);
  return found ? t(found.key) : value;
}

export function medicineCategoryLabel(t, raw) {
  const value = normalizeMedicineCategory(raw);
  const found = MEDICINE_CATEGORIES.find((c) => c.value === value);
  return found ? t(found.key) : value;
}
