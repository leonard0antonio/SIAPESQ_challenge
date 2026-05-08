// Componente de botão de submissão, responsável por renderizar um botão que os usuários podem clicar para enviar o formulário de registro ou edição de uma espécie. Ele recebe indicadores de carregamento e sucesso, um indicador de modo de edição e uma função de clique como props. O botão é projetado para ser acessível e responsivo, com estilos que refletem seu estado atual (carregando, sucesso ou inativo) e animações para melhorar a experiência do usuário. O texto do botão muda dinamicamente com base no estado, fornecendo feedback claro sobre a ação que está sendo realizada.

import React from "react";

// Interface de props para o componente SubmitButton, definindo os tipos esperados para os indicadores de carregamento, sucesso, modo de edição e a função de clique
interface Props {
  isLoading: boolean;
  success: boolean;
  isEditMode: boolean;
  onClick: (e: React.MouseEvent) => void; 
}

export function SubmitButton({ isLoading, success, isEditMode, onClick }: Props) {
  return (
    <button
      type="button" 
      onClick={onClick} 
      disabled={isLoading || success}
      className={`mt-6 py-4 rounded-xl font-bold text-lg transition-all flex justify-center items-center gap-2 overflow-hidden relative group ${
        success
          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
          : "bg-gray-900 text-white shadow-xl hover:bg-emerald-700 hover:shadow-emerald-700/30"
      } ${isLoading ? "opacity-70 cursor-wait" : ""}`}
    >
      <span className="relative z-10">
        {isLoading
          ? "A processar..."
          : success
          ? "Concluído!"
          : isEditMode
          ? "Guardar Edição"
          : "Registar Espécie"}
      </span>
      
      {!isLoading && !success && (
        <svg className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
}