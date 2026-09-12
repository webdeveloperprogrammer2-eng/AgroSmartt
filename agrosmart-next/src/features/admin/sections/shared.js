// Ёрирасонҳои хурди умумии ҳамаи бахшҳои панели идора

export const num = (v) => Number(v) || 0;
export const text = (v) => String(v ?? "").trim();

// Ҳар моли иловашуда бояд соҳиби худро дошта бошад — ном ва рақами телефон
// дар худи сабт нигоҳ дошта мешаванд. Аз ҳамин ҷо системаи хабарномаҳо
// медонад, ки фармоишро ба кӣ расонад ва харидор бо кӣ тамос гирад.
export const ownerExtra = (t, user) => ({
  farmerName: user.userName || user.name || t("defaultFarmerName"),
  farmerPhone: user.userPhone || user.phone || "",
});
