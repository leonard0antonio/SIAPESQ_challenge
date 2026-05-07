import { Link, useLocation, useNavigate } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

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
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20 group-hover:bg-emerald-500 transition-colors">
              <span className="text-white font-black text-lg">S</span>
            </div>

            <span className="text-xl font-black text-gray-900 tracking-widest group-hover:text-emerald-600 transition-colors">
              SIAPESQ
            </span>
          </Link>

          <nav className="flex items-center gap-8 font-medium text-sm text-gray-600">

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

            <Link
              to="/register"
              className="ml-4 px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-emerald-600 shadow-md hover:shadow-emerald-600/30 transition-all active:scale-95 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
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

              Cadastrar
            </Link>

          </nav>
        </div>
      </header>
    </>
  );
}