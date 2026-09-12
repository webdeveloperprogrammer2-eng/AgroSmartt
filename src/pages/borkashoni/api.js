import { jobsApi } from "../../api/jobsApi";

export const CARGO_KIND = "cargo";

export function isCargo(job) {
  return job?.kind === CARGO_KIND;
}

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

export function acceptCargoRequest(id, driver) {
  return jobsApi.patch(id, {
    status: "accepted",
    driverId: driver.id,
    driverName: driver.userName || "",
    driverPhone: driver.userPhone || "",
    acceptedAt: new Date().toISOString(),
  });
}

export function reopenCargoRequest(id) {
  return jobsApi.patch(id, { status: "open", driverId: null, driverName: "", driverPhone: "", acceptedAt: null });
}

export function deleteCargoRequest(id) {
  return jobsApi.remove(id);
}
