import { Link, useLocation, useNavigate } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (location.pathname === "/catalogo") {
      // Se já estamos no catálogo, apenas desliza suavemente até ao ID
      document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Se estamos noutra página (ex: Register), navega para o catálogo com a âncora na URL
      navigate("/catalogo#dashboard");
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logótipo - Clicar leva à Landing Page (Raiz) */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md group-hover:bg-emerald-500 transition-colors">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-black text-gray-800 tracking-wide group-hover:text-emerald-600 transition-colors">
            SIAPESQ
          </span>
        </Link>

        {/* Navegação */}
        <nav className="flex items-center gap-6 font-medium text-sm text-gray-600">
          <Link 
            to="/catalogo" 
            className={`hover:text-emerald-600 transition-colors ${location.pathname === '/catalogo' && !location.hash ? 'text-emerald-600 font-bold' : ''}`}
          >
            Início
          </Link>
          
          <a 
            href="#dashboard" 
            onClick={handleDashboardClick}
            className={`cursor-pointer hover:text-emerald-600 transition-colors ${location.hash === '#dashboard' ? 'text-emerald-600 font-bold' : ''}`}
          >
            Dashboard
          </a>

          <Link 
            to="/register" 
            className="ml-2 px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 hover:shadow-md transition-all active:scale-95"
          >
            + Cadastrar
          </Link>
        </nav>
        
      </div>
    </header>
  );
}