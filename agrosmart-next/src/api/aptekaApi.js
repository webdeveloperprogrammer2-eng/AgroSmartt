import { createResourceClient } from "./httpClient";

// Бозори дорувори — http://localhost:8000/ZaminApteka
export const aptekaApi = createResourceClient("ZaminApteka");
