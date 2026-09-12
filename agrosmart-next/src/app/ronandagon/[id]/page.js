import "@/features/drivers/drivers.css";
import DriverDetailPage from "@/features/drivers/DriverDetailPage";

export const metadata = { title: "Ронанда — AgroSmart.tj" };

// Роҳи "/ronandagon/:id" — саҳифаи як ронанда бо отзивҳо
export default function Driver() {
  return <DriverDetailPage />;
}
