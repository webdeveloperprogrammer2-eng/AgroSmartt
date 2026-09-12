import InfoNavbar from "./InfoNavbar";
import InfoHero from "./InfoHero";
import InfoStats from "./InfoStats";
import InfoGovSection from "./InfoGovSection";
import InfoFarmerSection from "./InfoFarmerSection";
import { InfoTelegramCTA, InfoFooter } from "./InfoFooterSections";

export default function InfoPage() {
  return (
    <div className="info-page bg-slate-50 text-slate-800 antialiased pt-16" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <InfoNavbar />
      <InfoHero />
      <InfoStats />
      <InfoGovSection />
      <InfoFarmerSection />
      <InfoTelegramCTA />
      <InfoFooter />
    </div>
  );
}
