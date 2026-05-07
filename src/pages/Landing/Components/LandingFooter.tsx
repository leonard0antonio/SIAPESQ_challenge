export function LandingFooter() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12 text-center border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-lg font-bold text-white tracking-widest">SIAPESQ</span>
        </div>
        
        <p className="text-sm">
          © {new Date().getFullYear()} Sistema Integrado de Pesquisa. Todos os direitos reservados.
        </p>
        
        <div className="flex gap-4 text-sm font-medium">
          <a href="#" className="hover:text-green-400 transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-green-400 transition-colors">Privacidade</a>
        </div>
        
      </div>
    </footer>
  );
}