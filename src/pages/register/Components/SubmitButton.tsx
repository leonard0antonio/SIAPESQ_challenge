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
      className={`mt-4 py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
        success
          ? "bg-green-500 text-white"
          : "bg-green-600 hover:bg-green-700 text-white"
      } ${isLoading ? "opacity-50 cursor-wait" : ""}`}
    >
      {isLoading
        ? "A processar..."
        : success
        ? "Finalizado!"
        : isEditMode
        ? "Confirmar Edição"
        : "Confirmar Cadastro"}
    </button>
  );
}