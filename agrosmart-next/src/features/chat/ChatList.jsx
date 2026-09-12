"use client";

import Link from "next/link";
import { ArrowLeft, MessageCircle, Mic } from "lucide-react";
import Avatar from "../../components/shared/Avatar";
import SettingsWidget from "../../components/shared/SettingsWidget";
import { useTranslation } from "../../context/language";
import { peerIdOf } from "./useChatPeers";

function timeOf(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toTimeString().slice(0, 5);
}

// Сутуни чапи чат — рӯйхати ҳамаи сӯҳбатҳо (мисли Instagram)
export default function ChatList({ chats, peers, myId, activeId, loading, onSelect }) {
  const { t } = useTranslation();

  return (
    <aside className={`chat-side ${activeId ? "has-active" : ""}`}>
      <header className="chat-side-head">
        <Link href="/" className="chat-back" aria-label={t("backBtn")}>
          <ArrowLeft size={19} strokeWidth={2.4} />
        </Link>
        <span className="chat-head-text">
          <b>{t("chatsTitle")}</b>
          <small>
            {chats.length} {t("chatsCountWord")}
          </small>
        </span>
        <SettingsWidget />
      </header>

      <div className="chat-side-list">
        {loading && <p className="chat-empty">{t("loading")}</p>}

        {!loading && chats.length === 0 && (
          <div className="chats-empty">
            <MessageCircle size={34} strokeWidth={1.4} />
            <p>{t("chatsEmpty")}</p>
            <Link href="/ronandagon" className="chats-empty-link">
              {t("driversTitle")}
            </Link>
          </div>
        )}

        {chats.map((chat) => {
          const peer = peers[peerIdOf(chat, myId)];
          const name = peer?.userName || t("unknownValue");
          const last = chat.lastMessage;
          return (
            <button
              key={chat.id}
              type="button"
              className={`chat-row ${String(chat.id) === String(activeId) ? "is-active" : ""}`}
              onClick={() => onSelect(chat.id)}
            >
              <Avatar src={peer?.avatar} name={name} className="chat-row-avatar" />
              <span className="chat-row-body">
                <span className="chat-row-top">
                  <b>{name}</b>
                  {last && <time>{timeOf(last.createdAt)}</time>}
                </span>
                <small>
                  {last?.kind === "voice" ? (
                    <>
                      <Mic size={12} strokeWidth={2.4} /> {t("voiceMessage")}
                    </>
                  ) : (
                    last?.text || t("chatNoMessages")
                  )}
                </small>
              </span>
              {chat.unreadCount > 0 && <span className="chat-unread">{chat.unreadCount}</span>}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
