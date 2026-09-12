import { createResourceClient } from "./httpClient";

// Бозори маҳсулот — http://localhost:8000/mahsulot
export const mahsulotApi = createResourceClient("mahsulot");
