import { Link } from "react-router-dom";
import { useTranslation } from "../../context/language";

export default function InfoHero() {
  const { t } = useTranslation();

  return (
    <div className="relative bg-gradient-to-r select-none from-green-800 to-emerald-600 py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <span className="bg-green-700/50 text-green-200 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider border border-green-500/30">
          {t("infoHeroBadge")}
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-6 tracking-tight">
          {t("infoHeroHeadingPre")} <span className="text-yellow-300">AgroSmart</span>
        </h1>
        <p className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto leading-relaxed mb-8">
          {t("infoHeroDesc")}
        </p>

        <div className="flex justify-center space-x-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-white text-green-800 font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-lg hover:bg-green-50 transform hover:-translate-y-0.5"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>{t("backToHome")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
