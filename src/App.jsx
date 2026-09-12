import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { LanguageProvider } from "./context/LanguageContext";
import { DialogProvider } from "./components/shared/DialogProvider";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import MenuPage from "./pages/menu/MenuPage";

const BozorPage = lazy(() => import("./pages/bozor/BozorPage"));
const ZaminPage = lazy(() => import("./pages/zamin/ZaminPage"));
const MushtariPage = lazy(() => import("./pages/mushtari/MushtariPage"));
const ProfilePage = lazy(() => import("./pages/profile/ProfilePage"));
const InfoPage = lazy(() => import("./pages/info/InfoPage"));
const DoruvoriPage = lazy(() => import("./pages/doruvori/DoruvoriPage"));
const AuthPage = lazy(() => import("./pages/auth/AuthPage"));
const AdminPage = lazy(() => import("./pages/admin/AdminPage"));
const DriversPage = lazy(() => import("./pages/drivers/DriversPage"));
const DriverDetailPage = lazy(() => import("./pages/drivers/DriverDetailPage"));
const BorkashoniPage = lazy(() => import("./pages/borkashoni/BorkashoniPage"));
const ChatsPage = lazy(() => import("./pages/chat/ChatsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  return (
    <UserProvider>
      <LanguageProvider>
        <DialogProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <Suspense fallback={<div className="page-loading">…</div>}>
                <Routes>
                  <Route path="/" element={<MenuPage />} />
                  <Route path="/bozor" element={<BozorPage />} />
                  <Route path="/zamin" element={<ZaminPage />} />
                  <Route path="/doruvori" element={<DoruvoriPage />} />
                  <Route path="/mushtari" element={<MushtariPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/info" element={<InfoPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/ronandagon" element={<DriversPage />} />
                  <Route path="/ronandagon/:id" element={<DriverDetailPage />} />
                  <Route path="/borkashoni" element={<BorkashoniPage />} />
                  <Route path="/chats" element={<ChatsPage />} />
                  <Route path="/chats/:id" element={<ChatsPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </DialogProvider>
      </LanguageProvider>
    </UserProvider>
  );
}
