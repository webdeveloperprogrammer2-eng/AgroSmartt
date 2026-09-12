import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import ChatList from "./ChatList";
import ChatConversation from "./ChatConversation";
import { chatApi } from "../../api/chatApi";
import { useUser } from "../../context/user";
import { useTranslation } from "../../context/language";
import { useChatPeers } from "./useChatPeers";
import "./chat.css";

export default function ChatsPage() {
  const { id } = useParams();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: userLoading } = useUser();
  const { t } = useTranslation();
  const navigate = useNavigate();
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
      navigate("/auth", { replace: true });
      return;
    }
    load();
  }, [user, userLoading, navigate, load]);

  if (!user) return null;

  return (
    <div className={`chat-screen ${id ? "is-open" : ""}`}>
      <ChatList
        chats={chats}
        peers={peers}
        myId={user.id}
        activeId={id}
        loading={loading}
        onSelect={(chatId) => navigate(`/chats/${chatId}`)}
      />

      {id ? (
        <ChatConversation
          key={id}
          chatId={id}
          user={user}
          onBack={() => navigate("/chats")}
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
