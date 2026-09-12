import "@/features/drivers/drivers.css";
import "@/features/chat/chat.css";
import ChatsPage from "@/features/chat/ChatsPage";

export const metadata = { title: "Сӯҳбат — AgroSmart.tj" };

// Роҳи "/chats/:id" — ҳамон экран, вале бо сӯҳбати кушода
export default function Chat() {
  return <ChatsPage />;
}
