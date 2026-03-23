import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Preloader } from "@/components/Preloader";
import { AuthGuard } from "@/guards/AuthGuard";
import { PokemonGuard } from "@/guards/PokemonGuard";
import { useAuth } from "@/hooks/use-auth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 1 },
  },
});

// Lazy-loaded pages
const PokemonListPage = lazy(() => import("@/pages/PokemonListPage"));
const PokemonDetailsPage = lazy(() => import("@/pages/PokemonDetailsPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const ProtectedPage = lazy(() => import("@/pages/ProtectedPage"));

// Eager-loaded pages (will be created in subsequent tasks)
// These use named imports and will be swapped to real components later
const HomePage = lazy(() => import("@/pages/HomePage"));
const ResumePage = lazy(() => import("@/pages/ResumePage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function AuthInitializer() {
  const { verifyAuth } = useAuth();

  useEffect(() => {
    verifyAuth();
  }, []);

  return null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/pokemon" element={<PokemonListPage />} />
      <Route
        path="/pokemon/:name"
        element={
          <PokemonGuard>
            <PokemonDetailsPage />
          </PokemonGuard>
        }
      />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route
        path="/auth/protected"
        element={
          <AuthGuard>
            <ProtectedPage />
          </AuthGuard>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowPreloader(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {showPreloader && <Preloader />}
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Suspense
              fallback={
                <div className="flex justify-center p-8">Загрузка...</div>
              }
            >
              <AppRoutes />
            </Suspense>
          </main>
          <Footer />
        </div>
        <AuthInitializer />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
