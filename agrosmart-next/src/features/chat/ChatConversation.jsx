"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Phone, Send } from "lucide-react";
import Avatar from "../../components/shared/Avatar";
import VoiceRecorder from "./VoiceRecorder";
import { chatApi } from "../../api/chatApi";
import { usersApi } from "../../api/usersApi";
import { useTranslation } from "../../context/language";
import { peerIdOf } from "./useChatPeers";

const REFRESH_MS = 5000;

function timeOf(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toTimeString().slice(0, 5);
}

// Тарафи рости экран — худи сӯҳбат. Ҳангоми интихоби чати дигар
// ҳамин компонент аз нав бор мешавад, саҳифа кушода намешавад.
export default function ChatConversation({ chatId, user, onBack, onSent }) {
  const [messages, setMessages] = useState([]);
  const [peer, setPeer] = useState(null);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const bottomRef = useRef(null);

  useEffect(() => {
    let alive = true;
    setMessages([]);
    setPeer(null);

    function load() {
      chatApi
        .getMessages(chatId, { userId: user.id })
        .then((list) => alive && setMessages(list))
        .catch(() => {});
    }

    chatApi
      .getById(chatId, user.id)
      .then((chat) => usersApi.getById(peerIdOf(chat, user.id)))
      .then((found) => alive && setPeer(found))
      .catch(() => {});

    load();
    chatApi.markRead(chatId, user.id).catch(() => {});
    // Сервер push надорад — ҳар 5 сония худамон нав мекунем
    const timer = setInterval(load, REFRESH_MS);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, [chatId, user.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setText("");
    const sent = await chatApi.sendText(chatId, user.id, value);
    setMessages((prev) => [...prev, sent]);
    onSent?.();
  }

  async function handleVoice(voice) {
    setError("");
    const sent = await chatApi.sendVoice(chatId, user.id, voice);
    setMessages((prev) => [...prev, sent]);
    onSent?.();
  }

  const name = peer?.userName || t("chatsTitle");

  return (
    <section className="chat-main">
      <header className="chat-head">
        {/* Дар телефон рӯйхат пинҳон мешавад — ин тугма ба он бармегардонад */}
        <button type="button" className="chat-back is-mobile" onClick={onBack} aria-label={t("backBtn")}>
          <ArrowLeft size={19} strokeWidth={2.4} />
        </button>
        <Avatar src={peer?.avatar} name={name} className="chat-head-avatar" />
        <span className="chat-head-text">
          <b>{name}</b>
          <small>{peer?.city || ""}</small>
        </span>
        {peer?.userPhone && (
          <a href={`tel:${peer.userPhone}`} className="chat-call" aria-label={peer.userPhone}>
            <Phone size={17} strokeWidth={2.3} />
          </a>
        )}
      </header>

      <div className="chat-messages">
        {messages.length === 0 && <p className="chat-empty">{t("chatNoMessages")}</p>}

        {messages.map((msg) => {
          const mine = String(msg.senderId) === String(user.id);
          return (
            <div key={msg.id} className={`chat-bubble ${mine ? "is-mine" : ""}`}>
              {msg.kind === "voice" ? (
                <audio className="chat-audio" controls src={msg.audio} preload="none" />
              ) : (
                <span className="chat-text">{msg.text}</span>
              )}
              <time>{timeOf(msg.createdAt)}</time>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {error && <p className="chat-error">{error}</p>}

      <form className="chat-input" onSubmit={handleSend}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder={t("chatPlaceholder")} />
        <VoiceRecorder onSend={handleVoice} onError={setError} />
        <button type="submit" className="chat-send" aria-label={t("chatSend")}>
          <Send size={17} strokeWidth={2.3} />
        </button>
      </form>
    </section>
  );
}
