import { useEffect, useState } from "react";
import { chatApi } from "../../api/chatApi";

const REFRESH_MS = 10000;

export function useChatUnread(userId) {
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (userId == null) return;

    let alive = true;
    function load() {
      chatApi
        .unreadCount(userId)
        .then((count) => alive && setUnread(count))
        .catch(() => {});
    }

    load();
    const timer = setInterval(load, REFRESH_MS);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, [userId]);

  return unread;
}
