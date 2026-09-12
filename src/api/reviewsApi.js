import { usersApi } from "./usersApi";

export function averageRating(reviews) {
  const list = Array.isArray(reviews) ? reviews : [];
  if (list.length === 0) return 0;
  const sum = list.reduce((acc, item) => acc + (Number(item.rating) || 0), 0);
  return Math.round((sum / list.length) * 10) / 10;
}

export const reviewsApi = {
  async list(userId) {
    const user = await usersApi.getById(userId);
    return Array.isArray(user?.reviews) ? user.reviews : [];
  },

  async add(userId, review) {
    const user = await usersApi.getById(userId);
    const existing = Array.isArray(user?.reviews) ? user.reviews : [];
    const rest = existing.filter((item) => String(item.authorId) !== String(review.authorId));
    const next = [{ ...review, id: Date.now(), createdAt: new Date().toISOString() }, ...rest];
    const saved = await usersApi.patch(userId, { reviews: next });
    return Array.isArray(saved?.reviews) ? saved.reviews : next;
  },
};
