import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // Importe o AnimatePresence
import { Header } from "./pages/home/Components/Header";
import { Landing } from "./pages/Landing/Landing";
import { Home } from "./pages/home/Home";
import { Register } from "./pages/register/Register";
import { PageTransition } from "./pages/Landing/Components/PageTransition"; // Importe o Wrapper

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isLandingPage && <Header />}

      <main className={isLandingPage ? "" : "py-8 flex-grow"}>
        {/* O mode="wait" garante que a página antiga saia antes da nova entrar */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            
            <Route path="/" element={
              <PageTransition><Landing /></PageTransition>
            } />

            <Route path="/catalogo" element={
              <PageTransition><Home /></PageTransition>
            } />

            <Route path="/register" element={
              <PageTransition><Register /></PageTransition>
            } />

            <Route path="/edit/:id" element={
              <PageTransition><Register /></PageTransition>
            } />

          </Routes>
        </AnimatePresence>
      </main>

      {!isLandingPage && (
        <footer className="text-center py-8 text-gray-400 text-sm">
          © 2026 SIAPESQ - Todos os direitos reservados.
        </footer>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;