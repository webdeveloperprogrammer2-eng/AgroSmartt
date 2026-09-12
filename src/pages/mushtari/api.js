import { jobsApi } from "../../api/jobsApi";

export async function fetchRequests() {
  const list = await jobsApi.getAll();
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
