import { useTranslation } from "../../context/language";

export default function InfoFarmerSection() {
  const { t } = useTranslation();

  return (
    <div className="info-light-section bg-white py-20 border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="lg:flex lg:items-center lg:space-x-12 lg:flex-row-reverse">
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pl-12">
            <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-md text-xs font-bold uppercase mb-4">
              <i className="fa-solid fa-wheat-awn"></i> <span>{t("infoFarmerBadge")}</span>
            </div>
            <h2 className="info-heading text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-6">
              {t("infoFarmerHeadingPre")}{" "}
              <span className="text-green-600">{t("infoFarmerHeadingHighlight")}</span>
            </h2>
            <p className="info-text text-slate-600 mb-6 leading-relaxed">
              {t("infoFarmerIntro")}
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="mt-1 p-1 bg-green-100 text-green-600 rounded-full text-xs">
                  <i className="fa-solid fa-check"></i>
                </div>
                <div>
                  <h4 className="font-semibold info-heading text-slate-900">{t("infoFarmerFeature1Title")}</h4>
                  <p className="info-muted text-sm text-slate-500">
                    {t("infoFarmerFeature1Desc")}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="mt-1 p-1 bg-green-100 text-green-600 rounded-full text-xs">
                  <i className="fa-solid fa-check"></i>
                </div>
                <div>
                  <h4 className="font-semibold info-heading text-slate-900">{t("infoFarmerFeature2Title")}</h4>
                  <p className="info-muted text-sm text-slate-500">
                    {t("infoFarmerFeature2Desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80"
              alt={t("infoFarmerImgAlt")}
              className="rounded-2xl shadow-xl w-full h-[350px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
