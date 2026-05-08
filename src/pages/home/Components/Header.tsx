import { Link, useLocation, useNavigate } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Função para lidar com o clique no link do Dashboard, garantindo que a navegação seja suave e intuitiva
  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (location.pathname === "/catalogo") {
      document
        .getElementById("dashboard")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    } else {
      navigate("/catalogo#dashboard");
    }
  };

  return (
    <>
      {/* Efeito de Vidro Fosco (backdrop-blur) */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm sticky top-0 z-50 transition-all">
        
        {/* Adicionados breakpoints sm: para controlar os espaçamentos */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">

          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            {/* Ícone reduz proporcionalmente no mobile */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20 group-hover:bg-emerald-500 transition-colors">
              <span className="text-white font-black text-base sm:text-lg">S</span>
            </div>

            {/* Texto oculta-se no mobile para libertar espaço */}
            <span className="hidden sm:block text-lg sm:text-xl font-black text-gray-900 tracking-widest group-hover:text-emerald-600 transition-colors">
              SIAPESQ
            </span>
          </Link>

          {/* Menus e Gaps ajustam o tamanho automaticamente */}
          <nav className="flex items-center gap-3 sm:gap-8 font-medium text-xs sm:text-sm text-gray-600">

            <Link
              to="/catalogo"
              className={`hover:text-emerald-600 transition-colors ${
                location.pathname === "/catalogo" && !location.hash
                  ? "text-emerald-600 font-bold"
                  : ""
              }`}
            >
              Catálogo
            </Link>

            <a
              href="#dashboard"
              onClick={handleDashboardClick}
              className={`cursor-pointer hover:text-emerald-600 transition-colors ${
                location.hash === "#dashboard"
                  ? "text-emerald-600 font-bold"
                  : ""
              }`}
            >
              Dashboard
            </a>

            {/* Botão diminui os paddings e margens em telas pequenas */}
            <Link
              to="/register"
              className="ml-1 sm:ml-4 px-3 py-2 sm:px-6 sm:py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-emerald-600 shadow-md hover:shadow-emerald-600/30 transition-all active:scale-95 flex items-center gap-1 sm:gap-2"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>

              {/* Min-width query customizado para não quebrar a palavra em telemóveis antigos */}
              <span className="hidden min-[380px]:block">Cadastrar</span>
            </Link>

          </nav>
        </div>
      </header>
    </>
  );
}