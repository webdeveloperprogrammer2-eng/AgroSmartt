import { useEffect, useState } from "react";
import { usersApi } from "../../api/usersApi";

export function peerIdOf(chat, myId) {
  if (chat?.peerId != null) return chat.peerId;
  const list = Array.isArray(chat?.participants) ? chat.participants : [];
  return list.find((id) => String(id) !== String(myId)) ?? null;
}

export function useChatPeers(chats, myId) {
  const [peers, setPeers] = useState({});

  useEffect(() => {
    const ids = [...new Set(chats.map((chat) => peerIdOf(chat, myId)).filter((id) => id != null))];
    if (ids.length === 0) return;

    Promise.all(ids.map((id) => usersApi.getById(id).catch(() => null))).then((list) => {
      const map = {};
      list.forEach((user, i) => {
        if (user) map[ids[i]] = user;
      });
      setPeers(map);
    });
  }, [chats, myId]);

  return peers;
}
