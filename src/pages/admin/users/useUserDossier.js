import { useCallback, useEffect, useState } from "react";
import { mahsulotApi } from "../../../api/mahsulotApi";
import { zaminApi } from "../../../api/zaminApi";
import { jobsApi } from "../../../api/jobsApi";
import { chatApi } from "../../../api/chatApi";

const asArray = (data) => (Array.isArray(data) ? data : []);
const toNumber = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

export function useUserDossier(user) {
  const [state, setState] = useState({ loading: true, products: [], lands: [], jobs: [], chats: [] });

  const load = useCallback(async () => {
    if (!user) return;
    setState((prev) => ({ ...prev, loading: true }));
    const [products, lands, jobs, chats] = await Promise.all([
      mahsulotApi.getByUser(user.id).catch(() => []),
      zaminApi.getByUser(user.id).catch(() => []),
      jobsApi.getByUser(user.id).catch(() => []),
      chatApi.getMyChats(user.id).catch(() => []),
    ]);
    setState({
      loading: false,
      products: asArray(products),
      lands: asArray(lands),
      jobs: asArray(jobs),
      chats: asArray(chats),
    });
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const { products, lands, jobs, chats } = state;

  const productValue = products.reduce(
    (sum, item) => sum + toNumber(item.price) * Math.max(toNumber(item.leftovers), 1),
    0,
  );
  const landValue = lands.reduce((sum, item) => sum + toNumber(item.price), 0);

  const reviews = asArray(user?.reviews);
  const ratingSum = reviews.reduce((sum, review) => sum + toNumber(review.rating), 0);
  const rating = reviews.length ? Math.round((ratingSum / reviews.length) * 10) / 10 : 0;

  const ratingBars = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((review) => Math.round(toNumber(review.rating)) === star).length,
  }));

  return {
    ...state,
    stats: {
      products: products.length,
      lands: lands.length,
      jobs: jobs.length,
      chats: chats.length,
      reviews: reviews.length,
      rating,
      productValue,
      landValue,
      totalValue: productValue + landValue,
    },
    ratingBars,
    reload: load,
  };
}
