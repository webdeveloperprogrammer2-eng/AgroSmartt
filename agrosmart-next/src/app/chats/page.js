import "@/features/drivers/drivers.css";
import "@/features/chat/chat.css";
import ChatsPage from "@/features/chat/ChatsPage";

export const metadata = { title: "Чатҳо — AgroSmart.tj" };

// Роҳи "/chats" — ҳамаи сӯҳбатҳои корбар
export default function Chats() {
  return <ChatsPage />;
}
