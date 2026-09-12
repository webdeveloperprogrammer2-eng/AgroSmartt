"use client";

import { UserProvider } from "@/context/UserContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { DialogProvider } from "@/components/shared/DialogProvider";
import ErrorBoundary from "@/components/shared/ErrorBoundary";

// Ҳамаи провайдерҳои умумии сайт дар як ҷо.
// layout.js компоненти сервер аст, бинобар ин провайдерҳо (онҳо useState
// доранд) ба ҳамин файли клиентӣ бароварда шудаанд.
export default function Providers({ children }) {
  return (
    <UserProvider>
      <LanguageProvider>
        {/* DialogProvider дар дохили LanguageProvider — то тугмаҳо тарҷума шаванд */}
        <DialogProvider>
          <ErrorBoundary>{children}</ErrorBoundary>
        </DialogProvider>
      </LanguageProvider>
    </UserProvider>
  );
}
