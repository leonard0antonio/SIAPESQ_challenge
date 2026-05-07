import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./pages/home/Components/Header";
import { Landing } from "./pages/Landing/Landing";
import { Home } from "./pages/home/Home";
import { Register } from "./pages/register/Register";

// Criamos um componente auxiliar para gerir o Layout
function AppLayout() {
  const location = useLocation();
  
  // Define se estamos na Landing Page
  const isLandingPage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* O Header só aparece se NÃO for a Landing Page */}
      {!isLandingPage && <Header />}

      <main className={isLandingPage ? "" : "py-8 flex-grow"}>
        <Routes>
          {/* A nova tela de apresentação (Premium) */}
          <Route path="/" element={<Landing />} />

          {/* O Sistema propriamente dito */}
          <Route path="/catalogo" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit/:id" element={<Register />} />
        </Routes>
      </main>

      {/* O Rodapé do sistema também só aparece fora da Landing */}
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
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;