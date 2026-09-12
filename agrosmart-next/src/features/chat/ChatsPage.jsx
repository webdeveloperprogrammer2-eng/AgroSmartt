"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import ChatList from "./ChatList";
import ChatConversation from "./ChatConversation";
import { chatApi } from "../../api/chatApi";
import { useUser } from "../../context/user";
import { useTranslation } from "../../context/language";
import { useChatPeers } from "./useChatPeers";
import "./chat.css";

// Экрани чат мисли Instagram: рӯйхат дар чап, худи сӯҳбат дар рост.
// Роҳҳои "/chats" ва "/chats/:id" ҳамин як экранро мекушоянд —
// интихоби сӯҳбат танҳо суроғаро иваз мекунад, саҳифа аз нав бор намешавад.
export default function ChatsPage() {
  const { id } = useParams();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: userLoading } = useUser();
  const { t } = useTranslation();
  const router = useRouter();
  const peers = useChatPeers(chats, user?.id);

  const load = useCallback(() => {
    if (!user?.id) return;
    chatApi
      .getMyChats(user.id)
      .then(setChats)
      .catch(() => setChats([]))
      .finally(() => setLoading(false));
  }, [user?.id]);

  useEffect(() => {
    if (userLoading) return;
    if (!user) {
      router.replace("/auth");
      return;
    }
    load();
  }, [user, userLoading, router, load]);

  if (!user) return null;

  return (
    <div className={`chat-screen ${id ? "is-open" : ""}`}>
      <ChatList
        chats={chats}
        peers={peers}
        myId={user.id}
        activeId={id}
        loading={loading}
        onSelect={(chatId) => router.push(`/chats/${chatId}`)}
      />

      {id ? (
        <ChatConversation
          key={id}
          chatId={id}
          user={user}
          onBack={() => router.push("/chats")}
          onSent={load}
        />
      ) : (
        <section className="chat-main chat-none">
          <MessageCircle size={46} strokeWidth={1.3} />
          <p>{t("chatPickOne")}</p>
        </section>
      )}
    </div>
  );
}
