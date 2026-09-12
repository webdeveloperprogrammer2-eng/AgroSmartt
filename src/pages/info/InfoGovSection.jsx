import { useTranslation } from "../../context/language";

export default function InfoGovSection() {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="lg:flex lg:items-center lg:space-x-12">
        <div className="lg:w-1/2 mb-12 lg:mb-0">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-xs font-bold uppercase mb-4">
            <i className="fa-solid fa-building-columns"></i> <span>{t("infoGovBadge")}</span>
          </div>
          <h2 className="info-heading text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-6">
            {t("infoGovHeadingPre")}{" "}
            <span className="text-blue-600">{t("infoGovHeadingHighlight")}</span>
          </h2>
          <p className="info-text text-slate-600 mb-6 leading-relaxed">
            {t("infoGovIntro")}
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="mt-1 p-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                <i className="fa-solid fa-check"></i>
              </div>
              <div>
                <h4 className="font-semibold info-heading text-slate-900">{t("infoGovFeature1Title")}</h4>
                <p className="info-muted text-sm text-slate-500">
                  {t("infoGovFeature1Desc")}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-1 p-1 bg-blue-100 text-blue-600 rounded-full text-xs">
                <i className="fa-solid fa-check"></i>
              </div>
              <div>
                <h4 className="font-semibold info-heading text-slate-900">{t("infoGovFeature2Title")}</h4>
                <p className="info-muted text-sm text-slate-500">
                  {t("infoGovFeature2Desc")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
            alt={t("infoGovImgAlt")}
            className="rounded-2xl shadow-xl w-full h-[350px] object-cover"
          />
        </div>
      </div>
    </div>
  );
}
