"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Truck } from "lucide-react";
import DriverCard from "./DriverCard";
import SettingsWidget from "../../components/shared/SettingsWidget";
import { usersApi } from "../../api/usersApi";
import { averageRating } from "../../api/reviewsApi";
import { useTranslation } from "../../context/language";
import "./drivers.css";

// Рӯйхати ҳамаи ронандагон. Дар ҷои аввал ҳамонаш меистад,
// ки рейтингаш калонтар аст — талаби асосии ин саҳифа.
export default function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    usersApi
      .getDrivers()
      .then((list) => {
        const rated = list.map((driver) => ({
          driver,
          rating: averageRating(driver.reviews),
          reviewsCount: (driver.reviews || []).length,
        }));
        rated.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
        setDrivers(rated);
      })
      .catch(() => setDrivers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <header className="main-navbar">
        <Link href="/" className="nav-back">
          <ArrowLeft size={18} strokeWidth={2.4} />
          {t("backBtn")}
        </Link>
        <div className="nav-logo">{t("driversTitle")}</div>
        <SettingsWidget />
      </header>

      <main className="drivers-page">
        <div className="drivers-head">
          <h1>
            <Truck size={22} strokeWidth={2.2} /> {t("driversTitle")}
          </h1>
          <p>{t("driversDesc")}</p>
        </div>

        {loading && <div className="page-loading">{t("loading")}</div>}

        {!loading && drivers.length === 0 && (
          <div className="drivers-empty">
            <Truck size={38} strokeWidth={1.5} />
            <p>{t("driversEmpty")}</p>
          </div>
        )}

        <div className="drivers-list">
          {drivers.map(({ driver, rating, reviewsCount }) => (
            <DriverCard key={driver.id} driver={driver} rating={rating} reviewsCount={reviewsCount} />
          ))}
        </div>
      </main>
    </>
  );
}
