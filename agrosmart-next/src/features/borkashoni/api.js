import { jobsApi } from "../../api/jobsApi";

// Дархостҳои боркашонӣ дар ҳамон ресурси /jobs нигоҳ дошта мешаванд,
// вале бо аломати `kind: "cargo"` — то бо дархостҳои содироти саҳифаи
// "Хабарҳо" омехта нашаванд. Дар API ресурси алоҳида вуҷуд надорад.
export const CARGO_KIND = "cargo";

export function isCargo(job) {
  return job?.kind === CARGO_KIND;
}

// Дархости КУШОДА-ро ҳама мебинанд. Ҳамин ки ронанда онро гирифт,
// он аз тахтаи умумӣ мебарояд ва танҳо ба ду кас мемонад:
// соҳиби дархост ва худи ҳамон ронанда.
export function visibleCargoFor(list, user) {
  return list.filter((item) => {
    if (item.status !== "accepted") return true;
    if (!user) return false;
    return String(item.userId) === String(user.id) || String(item.driverId) === String(user.id);
  });
}

export async function fetchCargoRequests() {
  const list = await jobsApi.getAll();
  return list.filter(isCargo).reverse();
}

export function createCargoRequest(data) {
  return jobsApi.create({ ...data, kind: CARGO_KIND, status: "open", createdAt: new Date().toISOString() });
}

// Қабули дархост — танҳо майдонҳои ронанда иваз мешаванд
export function acceptCargoRequest(id, driver) {
  return jobsApi.patch(id, {
    status: "accepted",
    driverId: driver.id,
    driverName: driver.userName || "",
    driverPhone: driver.userPhone || "",
    acceptedAt: new Date().toISOString(),
  });
}

// Соҳиби дархост метавонад қабулро бекор кунад ва дархостро аз нав кушояд
export function reopenCargoRequest(id) {
  return jobsApi.patch(id, { status: "open", driverId: null, driverName: "", driverPhone: "", acceptedAt: null });
}

export function deleteCargoRequest(id) {
  return jobsApi.remove(id);
}
