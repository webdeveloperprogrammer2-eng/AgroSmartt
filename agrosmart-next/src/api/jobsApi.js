import { createResourceClient } from "./httpClient";

// Дархостҳо — http://localhost:8000/jobs
export const jobsApi = createResourceClient("jobs");
