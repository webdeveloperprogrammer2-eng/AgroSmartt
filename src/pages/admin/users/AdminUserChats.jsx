import { useEffect, useState } from "react";
import { ArrowLeft, MessageSquare, Mic } from "lucide-react";
import { chatApi } from "../../../api/chatApi";
import { usersApi } from "../../../api/usersApi";
import { useTranslation } from "../../../context/language";

export default function AdminUserChats({ user, chats, loading }) {
  const { t } = useTranslation();
  const [openChat, setOpenChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);
  const [peers, setPeers] = useState({});

  useEffect(() => {
    let alive = true;
    usersApi
      .getAll()
      .then((list) => {
        if (!alive || !Array.isArray(list)) return;
        setPeers(Object.fromEntries(list.map((item) => [item.id, item.userName])));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  async function handleOpen(chat) {
    setBusy(true);
    setOpenChat(chat);
    try {
      setMessages(await chatApi.getMessages(chat.id, { userId: user.id }));
    } catch {
      setMessages([]);
    } finally {
      setBusy(false);
    }
  }

  if (openChat) {
    return (
      <div className="admin-chat-view">
        <button type="button" className="admin-chat-back" onClick={() => setOpenChat(null)}>
          <ArrowLeft size={15} /> {t("adminBackToChats")}
        </button>
        <h4 className="admin-chat-peer">
          {peers[openChat.peerId] || t("unknownValue")}
        </h4>

        {busy && <p className="admin-users-empty">{t("loading")}</p>}
        {!busy && messages.length === 0 && (
          <p className="admin-users-empty">{t("adminNoMessages")}</p>
        )}

        <div className="admin-chat-thread">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`admin-msg ${msg.senderId === user.id ? "is-own" : ""}`}
            >
              <span className="admin-msg-text">
                {msg.audio ? (
                  <>
                    <Mic size={13} /> {t("voiceMessage")}
                  </>
                ) : (
                  msg.text
                )}
              </span>
              <time>{formatTime(msg.createdAt)}</time>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (loading) return <p className="admin-users-empty">{t("loading")}</p>;
  if (chats.length === 0) return <p className="admin-users-empty">{t("adminNoChats")}</p>;

  return (
    <div className="admin-chat-list">
      {chats.map((chat) => (
        <button
          key={chat.id}
          type="button"
          className="admin-chat-row"
          onClick={() => handleOpen(chat)}
        >
          <MessageSquare size={16} />
          <span className="admin-chat-info">
            <b>{peers[chat.peerId] || t("unknownValue")}</b>
            <small>{chat.lastMessage?.text || t("adminNoMessages")}</small>
          </span>
          {chat.unreadCount > 0 && <span className="admin-chat-badge">{chat.unreadCount}</span>}
        </button>
      ))}
    </div>
  );
}

function formatTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
}
