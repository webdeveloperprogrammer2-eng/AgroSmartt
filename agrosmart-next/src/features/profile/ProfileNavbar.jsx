"use client";

import Link from "next/link";
import { Bell, MessageCircle } from "lucide-react";
import Avatar from "../../components/shared/Avatar";
import SettingsWidget from "../../components/shared/SettingsWidget";
import { useTranslation } from "../../context/language";

// Навбари болоии кабинети шахсӣ
export default function ProfileNavbar({ avatarLetter, avatarSrc, onOpenMenu, onOpenNotifications, unreadCount = 0 }) {
  const { t } = useTranslation();

  return (
    <header className="main-navbar">
      <div className="nav-logo">AgroSmart Dashboard</div>
      <div className="profile-actions">
        {/* Хабарномаҳо: фармоишҳое, ки ба молҳои ҳамин корбар омадаанд */}
        <button
          type="button"
          className="cart-icon-btn"
          onClick={onOpenNotifications}
          aria-label={t("notifications")}
        >
          <Bell size={20} strokeWidth={2.2} />
          {unreadCount > 0 && <span className="cart-count-badge">{unreadCount}</span>}
        </button>
        <Link href="/chats" className="cart-icon-btn" aria-label={t("chatsTitle")}>
          <MessageCircle size={20} strokeWidth={2.2} />
        </Link>
        <SettingsWidget />
        <button type="button" className="profile-toggle-btn" onClick={onOpenMenu} aria-label={t("openMenu")}>
          <Avatar src={avatarSrc} name={avatarLetter} className="nav-avatar" />
        </button>
      </div>
    </header>
  );
}
