import { Link, useLocation } from "react-router-dom"; // <-- Importámos o useLocation
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // O location guarda a página atual (ex: "/" ou "/register")
  const location = useLocation(); 

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const scrollToDashboard = (e: React.MouseEvent) => {
    setIsMobileMenuOpen(false);
    if (window.location.pathname === "/") {
      e.preventDefault();
      const dashboardElement = document.getElementById("dashboard");
      if (dashboardElement) {
        dashboardElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-0 md:h-20 flex flex-col md:flex-row md:items-center justify-between relative">
        
        {/* === LINHA 1 NO MOBILE: Logo + Menu Hambúrguer === */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center border-2 border-green-600 overflow-hidden shadow-sm shrink-0">
              <img
                src="../public/logo.png"
                alt="Logo SIAPESQ"
                className="w-full h-full object-cover"
              />
            </div>

            <a
              href="https://siapesq.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl sm:text-2xl font-extrabold text-green-700 hover:opacity-80 transition-opacity"
            >
              SIAPESQ
            </a>
          </div>

          <button 
            className="md:hidden flex items-center text-gray-600 hover:text-green-600 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Abrir menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* === CENTRO: Título do Sistema === */}
        <div className="text-center mt-2 pb-1 md:pb-0 md:mt-0 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
          <h1 className="text-sm sm:text-base md:text-xl font-bold text-gray-700 tracking-wide whitespace-nowrap">
            Sistema de Cadastro de Animais
          </h1>
        </div>

        {/* === LADO DIREITO: Menu de Navegação para DESKTOP === */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            onClick={scrollToTop}
            className="text-gray-600 hover:text-green-600 font-medium transition-colors"
          >
            Início
          </Link>

          <a
            href="/#dashboard"
            onClick={scrollToDashboard}
            className="text-gray-600 hover:text-green-600 font-medium transition-colors"
          >
            Dashboard
          </a>

          {/* Oculta o botão no DESKTOP se já estiver na página de cadastro */}
          {location.pathname !== '/register' && (
            <Link
              to="/register"
              className="bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition-all shadow-sm hover:shadow-md"
            >
              + Cadastrar
            </Link>
          )}
        </nav>
      </div>

      {/* === MENU DROPDOWN PARA MOBILE === */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute w-full left-0 bg-white border-t border-gray-100 shadow-xl flex flex-col px-6 py-6 gap-6 z-40">
          <Link
            to="/"
            onClick={scrollToTop}
            className="text-lg text-gray-700 font-medium flex items-center gap-2"
          >
            🏠 Início
          </Link>

          <a
            href="/#dashboard"
            onClick={scrollToDashboard}
            className="text-lg text-gray-700 font-medium flex items-center gap-2"
          >
            📊 Dashboard
          </a>

          {/* Oculta o botão no MOBILE se já estiver na página de cadastro */}
          {location.pathname !== '/register' && (
            <Link
              to="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-green-600 text-white text-center px-5 py-3 rounded-xl font-bold shadow-md active:scale-95 transition-transform"
            >
              + Cadastrar Nova Espécie
            </Link>
          )}
        </div>
      )}
    </header>
  );
}