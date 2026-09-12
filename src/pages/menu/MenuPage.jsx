import { useNavigate } from "react-router-dom";
import MenuNavbar from "./MenuNavbar";
import HeroSection from "./HeroSection";
import "./menu.css";

export default function MenuPage() {
  const navigate = useNavigate();

  function handleProfileClick(isRegistered) {
    navigate(isRegistered ? "/profile" : "/auth");
  }

  return (
    <div className="all">
      <MenuNavbar onProfileClick={handleProfileClick} />
      <HeroSection />
    </div>
  );
}
