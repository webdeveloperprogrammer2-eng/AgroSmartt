import { useCallback, useEffect, useState } from "react";
import { usersApi } from "../../../api/usersApi";

export const USER_FILTERS = [
  { value: "all", labelKey: "adminUsersAll" },
  { value: "driver", labelKey: "accountTypeDriver" },
  { value: "buyer", labelKey: "accountTypeBuyer" },
  { value: "seller", labelKey: "accountTypeSeller" },
];

export function isUserBanned(user) {
  if (!user) return false;
  if (user.banned === true && !user.bannedUntil) return true;
  if (!user.bannedUntil) return false;
  return new Date(user.bannedUntil).getTime() > Date.now();
}

export function useAdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const list = await usersApi.getAll();
      setUsers(Array.isArray(list) ? list : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const text = query.trim().toLowerCase();
  const visible = users.filter((user) => {
    if (filter !== "all" && user.accountType !== filter) return false;
    if (!text) return true;
    const name = String(user.userName || "").toLowerCase();
    const phone = String(user.userPhone || "").toLowerCase();
    return name.includes(text) || phone.includes(text);
  });

  return { users, visible, loading, filter, setFilter, query, setQuery, reload };
}
