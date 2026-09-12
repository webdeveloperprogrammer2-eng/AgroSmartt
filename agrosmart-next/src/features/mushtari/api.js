import { jobsApi } from "../../api/jobsApi";

// Дархостҳо (http://localhost:8000/jobs)
export async function fetchRequests() {
  const list = await jobsApi.getAll();
  // Дархостҳои боркашонӣ дар ҳамин ресурс мемонанд, вале саҳифаи
  // худашонро доранд — ин ҷо намебароянд.
  return list.filter((item) => item.kind !== "cargo");
}

export async function createRequest(newRequest) {
  return jobsApi.create(newRequest);
}

export async function updateRequest(id, updatedData) {
  return jobsApi.update(id, updatedData);
}

export async function deleteRequest(id) {
  return jobsApi.remove(id);
}
