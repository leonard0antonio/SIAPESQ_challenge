import React from "react";

interface Props {
  isLoading: boolean;
  success: boolean;
  isEditMode: boolean;
}

export function SubmitButton({ isLoading, success, isEditMode }: Props) {
  return (
    <button
      type="submit"
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
      
      {/* Ícone que aparece no hover se não estiver a carregar nem for sucesso */}
      {!isLoading && !success && (
        <svg className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
}