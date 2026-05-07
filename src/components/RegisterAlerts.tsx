import { FormEvent } from "react";

interface Props {
  error: string;
  success: boolean;
  isEditMode: boolean;
  locationNotFound: boolean;
  city: string;
  state: string;
  onBypassMap: (e: FormEvent | null, bypass: boolean) => void;
  onRetryMap: () => void;
}

export function RegisterAlerts({ 
  error, success, isEditMode, locationNotFound, city, state, onBypassMap, onRetryMap 
}: Props) {
  return (
    <>
      {/* MENSAGEM DE ERRO */}
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg font-medium text-sm animate-bounce">
          ⚠️ {error}
        </div>
      )}

      {/* MENSAGEM DE SUCESSO (Verde - Flutuante) */}
      {success && (
        <div className="fixed inset-x-0 top-24 mx-auto max-w-md p-6 bg-green-600 text-white rounded-2xl shadow-2xl z-[60] text-center animate-in fade-in zoom-in duration-300">
          <span className="text-4xl mb-2 block">✅</span>
          <h3 className="text-xl font-bold">{isEditMode ? "Edição Concluída!" : "Cadastro Concluído!"}</h3>
          <p className="text-sm opacity-90">
            {isEditMode ? "A espécie foi atualizada com sucesso. A redirecionar..." : "A espécie foi adicionada. A redirecionar..."}
          </p>
        </div>
      )}

      {/* AVISO: MAPA NÃO ENCONTROU O QUE ELE DIGITOU */}
      {locationNotFound && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 shadow-sm animate-pulse">
          <p className="font-bold text-sm flex items-center gap-1">📍 Local não encontrado no mapa</p>
          <p className="text-xs mb-3 mt-1">
            O mapa não conseguiu encontrar "{city}, {state}". Deseja guardar apenas os nomes sem a marcação no mapa geográfico?
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={(e) => onBypassMap(e, true)} 
              className="bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded hover:bg-amber-700 transition-colors"
            >
              Sim, guardar sem mapa
            </button>
            <button
              type="button"
              onClick={onRetryMap}
              className="text-amber-700 text-xs px-3 py-2 underline hover:text-amber-900"
            >
              Tentar corrigir a cidade
            </button>
          </div>
        </div>
      )}
    </>
  );
}