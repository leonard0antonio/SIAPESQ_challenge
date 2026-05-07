// Componente de rodapé da página de destino, responsável por exibir informações de copyright, links para os termos de uso e política de privacidade, e o logotipo do projeto. Ele utiliza a biblioteca Framer Motion para animar a entrada dos elementos, criando uma experiência visualmente atraente. O rodapé é projetado para ser responsivo e acessível, garantindo que as informações importantes estejam sempre visíveis para os usuários.

import { useState } from "react";
import { LegalModal } from "./LegalModal";

export function LandingFooter() {
  const [modalType, setModalType] = useState<"termos" | "privacidade" | null>(null);

  return (
    <>
      <footer className="bg-gray-950 text-gray-400 py-12 text-center border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-lg font-bold text-white tracking-widest">SIAPESQ</span>
          </div>
          
          <p className="text-sm">
            © {new Date().getFullYear()} Sistema Integrado de Pesquisa. Todos os direitos reservados.
          </p>
          
          <div className="flex gap-6 text-sm font-medium">
            <button 
              onClick={() => setModalType("termos")} 
              className="hover:text-emerald-400 transition-colors"
            >
              Termos de Uso
            </button>
            <button 
              onClick={() => setModalType("privacidade")} 
              className="hover:text-emerald-400 transition-colors"
            >
              Privacidade
            </button>
          </div>
          
        </div>
      </footer>

      {/* O Modal escondido que abre ao clicar nos botões */}
      <LegalModal 
        isOpen={modalType !== null} 
        type={modalType} 
        onClose={() => setModalType(null)} 
      />
    </>
  );
}