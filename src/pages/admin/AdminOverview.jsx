import {
  Boxes,
  Coins,
  Leaf,
  MapPin,
  Pill,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { useTranslation } from "../../context/language";

const num = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};
const fmt = (value) => new Intl.NumberFormat("ru-RU").format(Math.round(value || 0));

const valueOf = (list) =>
  list.reduce((sum, item) => sum + num(item.price) * Math.max(num(item.leftovers), 1), 0);

function monthOf(item) {
  const raw = item.createdAt || item.date;
  if (!raw) return null;
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return null;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function lastMonths(count) {
  const now = new Date();
  const out = [];
  for (let i = count - 1; i >= 0; i -= 1) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    out.push({
      key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
      label: date.toLocaleDateString("ru-RU", { month: "short" }),
    });
  }
  return out;
}

export default function AdminOverview({ data, users }) {
  const { t } = useTranslation();

  const products = data.mahsulot || [];
  const lands = data.zamin || [];
  const medicine = data.apteka || [];
  const requests = data.jobs || [];

  const productValue = valueOf(products);
  const landValue = valueOf(lands);
  const medicineValue = valueOf(medicine);
  const salesValue = productValue + landValue + medicineValue;
  const salesCount = products.length + lands.length + medicine.length;

  const buyValue = requests.reduce(
    (sum, item) => sum + num(item.volume) * Math.max(num(item.price), 1),
    0,
  );

  const months = lastMonths(6);
  const series = months.map(({ key, label }) => ({
    label,
    users: users.filter((item) => monthOf(item) === key).length,
    listings: [...products, ...lands, ...medicine].filter((item) => monthOf(item) === key).length,
  }));
  const peak = Math.max(...series.map((point) => Math.max(point.users, point.listings)), 1);

  const last = series[series.length - 1];
  const prev = series[series.length - 2] || { users: 0, listings: 0 };
  const lastTotal = last.users + last.listings;
  const prevTotal = prev.users + prev.listings;
  const growth = prevTotal > 0 ? Math.round(((lastTotal - prevTotal) / prevTotal) * 100) : null;

  const breakdown = [
    { key: "adminOvProducts", value: productValue, count: products.length, Icon: Leaf, tone: "a" },
    { key: "adminOvLands", value: landValue, count: lands.length, Icon: MapPin, tone: "b" },
    { key: "adminOvMedicine", value: medicineValue, count: medicine.length, Icon: Pill, tone: "c" },
  ];

  return (
    <section className="admin-ov">
      <div className="admin-ov-kpis">
        <Kpi
          Icon={Coins}
          label={t("adminOvSalesValue")}
          value={fmt(salesValue)}
          suffix={t("somoniShort")}
          accent
        />
        <Kpi Icon={Boxes} label={t("adminOvSalesCount")} value={fmt(salesCount)} />
        <Kpi
          Icon={ShoppingCart}
          label={t("adminOvBuyValue")}
          value={fmt(buyValue)}
          suffix={t("somoniShort")}
        />
        <Kpi Icon={Users} label={t("adminOvUsers")} value={fmt(users.length)} />
      </div>

      <div className="admin-ov-grid">
        <article className="admin-ov-card">
          <header className="admin-ov-head">
            <h3>
              <TrendingUp size={16} /> {t("adminOvGrowth")}
            </h3>
            {growth !== null && (
              <span className={`admin-ov-delta ${growth >= 0 ? "is-up" : "is-down"}`}>
                {growth >= 0 ? "+" : ""}
                {growth}%
              </span>
            )}
          </header>

          <div className="admin-ov-chart">
            {series.map((point) => (
              <div className="admin-ov-col" key={point.label}>
                <div className="admin-ov-bars">
                  <span
                    className="admin-ov-bar is-users"
                    style={{ height: `${(point.users / peak) * 100}%` }}
                    title={`${t("adminOvUsers")}: ${point.users}`}
                  />
                  <span
                    className="admin-ov-bar is-listings"
                    style={{ height: `${(point.listings / peak) * 100}%` }}
                    title={`${t("adminOvListings")}: ${point.listings}`}
                  />
                </div>
                <small>{point.label}</small>
              </div>
            ))}
          </div>

          <div className="admin-ov-legend">
            <span>
              <i className="dot is-users" /> {t("adminOvUsers")}
            </span>
            <span>
              <i className="dot is-listings" /> {t("adminOvListings")}
            </span>
          </div>
        </article>

        <article className="admin-ov-card">
          <header className="admin-ov-head">
            <h3>
              <Coins size={16} /> {t("adminOvBreakdown")}
            </h3>
          </header>

          {breakdown.map(({ key, value, count, Icon, tone }) => (
            <div className="admin-ov-row" key={key}>
              <span className="admin-ov-row-label">
                <Icon size={14} /> {t(key)}
                <small>({count})</small>
              </span>
              <span className="admin-ov-track">
                <span
                  className={`admin-ov-fill is-${tone}`}
                  style={{ width: `${salesValue > 0 ? (value / salesValue) * 100 : 0}%` }}
                />
              </span>
              <b>{fmt(value)}</b>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}

function Kpi({ Icon, label, value, suffix, accent }) {
  return (
    <div className={`admin-ov-kpi ${accent ? "is-accent" : ""}`}>
      <span className="admin-ov-kpi-icon">
        <Icon size={18} />
      </span>
      <b>
        {value}
        {suffix && <i>{suffix}</i>}
      </b>
      <small>{label}</small>
    </div>
  );
}
