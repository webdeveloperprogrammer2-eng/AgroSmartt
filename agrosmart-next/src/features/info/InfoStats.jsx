"use client";

import { useTranslation } from "../../context/language";

// МУҲИМ: рангҳо пурра навишта мешаванд (`bg-amber-50`), на бо ҳамроҳкунӣ
// (`bg-${color}-50`). Tailwind файлҳоро ҳамчун матн мехонад ва номи синфи
// сохташударо намебинад — дар натиҷа он синф ба CSS дохил намешуд ва
// заминаи иконка холӣ мемонд.
const STAT_STYLES = {
  green: "bg-green-50 text-green-600",
  blue: "bg-blue-50 text-blue-600",
  amber: "bg-amber-50 text-amber-600",
};

export default function InfoStats() {
  const { t } = useTranslation();

  const stats = [
    { icon: "fa-map-location-dot", tone: "green", value: "100%", label: t("infoStatTransparency") },
    { icon: "fa-chart-line", tone: "blue", value: "+45%", label: t("infoStatForeignInvestment") },
    { icon: "fa-users", tone: "amber", value: "10к+", label: t("infoStatActiveFarmers") },
  ];

  return (
    <div className="max-w-5xl mx-auto -mt-12 px-4 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center space-x-4"
          >
            <div className={`p-4 rounded-xl ${STAT_STYLES[stat.tone]}`}>
              <i className={`fa-solid ${stat.icon} text-2xl`} aria-hidden="true"></i>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
