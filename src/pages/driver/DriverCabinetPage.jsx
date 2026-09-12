import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Boxes, MessageCircle, Package, Star, Truck, UserRound } from "lucide-react";
import StarRating from "../../components/shared/StarRating";
import DriverStats from "../drivers/DriverStats";
import ProfileNavbar from "../profile/ProfileNavbar";
import ProfileDrawer from "../profile/ProfileDrawer";
import NotificationsModal from "../profile/NotificationsModal";
import { fetchCargoRequests } from "../borkashoni/api";
import { chatApi } from "../../api/chatApi";
import { averageRating } from "../../api/reviewsApi";
import { useUser } from "../../context/user";
import { useTranslation } from "../../context/language";
import { useDialog } from "../../context/dialog";
import { useNotifications } from "../profile/useNotifications";
import { useChatUnread } from "../chat/useChatUnread";
import "../drivers/drivers.css";
import "./driver-cabinet.css";

export default function DriverCabinetPage() {
  const { user, logout } = useUser();
  const { t } = useTranslation();
  const dialog = useDialog();
  const navigate = useNavigate();
  const notifications = useNotifications(user?.id);
  const chatUnread = useChatUnread(user?.id);

  const [openCargo, setOpenCargo] = useState(0);
  const [chatsCount, setChatsCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    fetchCargoRequests()
      .then((list) => setOpenCargo(list.filter((item) => item.status !== "accepted").length))
      .catch(() => setOpenCargo(0));
    chatApi.getMyChats(user.id).then((list) => setChatsCount(list.length)).catch(() => {});
  }, [user.id]);

  const reviews = Array.isArray(user.reviews) ? user.reviews : [];
  const rating = averageRating(reviews);

  const tiles = [
    { key: "rating", Icon: Star, tone: "is-amber", value: rating > 0 ? rating : "—", label: t("driverStatRating") },
    { key: "reviews", Icon: UserRound, tone: "is-violet", value: reviews.length, label: t("reviewsTitle") },
    { key: "jobs", Icon: Boxes, tone: "is-blue", value: openCargo, label: t("driverStatJobs") },
    { key: "chats", Icon: MessageCircle, tone: "is-green", value: chatsCount, label: t("chatsTitle") },
  ];

  async function openChat(job) {
    const chat = await chatApi.open({ buyerId: user.id, sellerId: job.userId });
    navigate(`/chats/${chat.id}`);
  }

  async function handleLogout() {
    setDrawerOpen(false);
    const ok = await dialog.confirm({ title: t("logoutConfirm"), confirmText: t("logoutMenu") });
    if (ok) {
      logout();
      navigate("/");
    }
  }

  const name = user.userName || t("defaultFarmerName");

  return (
    <>
      <ProfileNavbar
        avatarLetter={name.charAt(0).toUpperCase()}
        avatarSrc={user.avatar}
        onOpenMenu={() => setDrawerOpen(true)}
        unreadCount={notifications.unreadCount + chatUnread}
        onOpenNotifications={() => setNotifOpen(true)}
      />
      <ProfileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        name={name}
        phone={user.userPhone}
        avatarLetter={name.charAt(0).toUpperCase()}
        accountType={user.accountType}
        onLogout={handleLogout}
      />

      <main className="dcab">
        <section className="dcab-hero">
          <span className="dcab-hero-icon">
            <Truck size={30} strokeWidth={1.9} />
          </span>
          <div className="dcab-hero-text">
            <span className="dcab-kicker">{t("accountTypeDriver")}</span>
            <h1>{name}</h1>
            <div className="dcab-hero-rate">
              <StarRating value={rating} size={16} />
              <b>{rating > 0 ? rating : "—"}</b>
              <small>
                ({reviews.length} {t("reviewsShort")})
              </small>
            </div>
          </div>
          <Link to={`/ronandagon/${user.id}`} className="dcab-hero-link">
            {t("driverPublicPage")}
          </Link>
        </section>

        <div className="dcab-tiles">
          {tiles.map(({ key, Icon, tone, value, label }) => (
            <div key={key} className="dcab-tile">
              <span className={`dcab-tile-icon ${tone}`}>
                <Icon size={17} strokeWidth={2.3} />
              </span>
              <b>{value}</b>
              <small>{label}</small>
            </div>
          ))}
        </div>

        <DriverStats reviews={reviews} rating={rating} />

        <Link to="/borkashoni" className="dcab-cta">
          <span className="dcab-cta-icon">
            <Package size={20} strokeWidth={2.2} />
          </span>
          <span className="dcab-cta-text">
            <b>{t("cargoTitle")}</b>
            <small>{t("cargoDesc")}</small>
          </span>
          <span className="dcab-cta-count">{openCargo}</span>
        </Link>

        <section className="dcab-section">
          <h2>
            <Star size={17} strokeWidth={2.3} /> {t("driverReviewsTitle")}
          </h2>
          {reviews.length === 0 ? (
            <div className="dcab-empty">{t("reviewsEmpty")}</div>
          ) : (
            <ul className="review-list">
              {reviews.map((item) => (
                <li key={item.id} className="review-item">
                  <div className="review-item-head">
                    <b>{item.authorName}</b>
                    <StarRating value={item.rating} size={13} />
                  </div>
                  {item.text && <p>{item.text}</p>}
                  <time>{new Date(item.createdAt).toLocaleDateString()}</time>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <NotificationsModal
        open={notifOpen}
        onClose={() => {
          setNotifOpen(false);
          notifications.markAllRead();
        }}
        items={notifications.items}
        chatUnread={chatUnread}
        onChatWithBuyer={(n) => openChat({ userId: n.buyerId })}
        onRemove={notifications.remove}
        onClearAll={notifications.clearAll}
      />
    </>
  );
}
