"use client";

import { useRouter } from "next/navigation";
import MenuNavbar from "./MenuNavbar";
import HeroSection from "./HeroSection";

// Саҳифаи асосии сомона (пештар Menu/index.html)
export default function MenuPage() {
  const router = useRouter();

  // Агар корбар аллакай ворид шуда бошад — ба кабинет мебарем,
  // вагарна ба саҳифаи нави Register/Sign in меравем
  function handleProfileClick(isRegistered) {
    router.push(isRegistered ? "/profile" : "/auth");
  }

  return (
    <div className="all">
      <MenuNavbar onProfileClick={handleProfileClick} />
      <HeroSection />
    </div>
  );
}
