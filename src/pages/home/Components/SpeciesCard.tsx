//componente de cartão de espécie, responsável por exibir as informações de cada espécie registada em um formato visualmente atraente. Ele inclui a imagem da espécie (se disponível), nome, categoria, localização e descrição. O SpeciesCard também possui botões de ação para editar ou excluir o registo, que aparecem ao passar o mouse sobre o cartão. Este componente é fundamental para a interface do usuário, pois permite que os usuários visualizem e gerenciem facilmente suas espécies registadas.

import { Link } from "react-router-dom";
import type { Species } from "../../../types/species";

// Interface de props para o componente SpeciesCard, definindo os tipos esperados para as propriedades de dados da espécie e a função de exclusão
interface Props {
  data: Species;
  onDelete: (id: string) => void;
}

export function SpeciesCard({ data, onDelete }: Props) {
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 relative group">
      {/* BOTÕES DE AÇÃO COM ÍCONES (Aparecem ao passar o rato) */}
      <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Link
          to={`/edit/${data.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2.5 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
          title="Editar Registo"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </Link>
        <button
          onClick={() => onDelete(data.id)}
          className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
          title="Excluir Registo"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {/* === ÁREA DA IMAGEM === */}
      {data.imageUrl ? (
        <div className="h-48 w-full overflow-hidden relative bg-gray-100">
          <img
            src={data.imageUrl}
            alt={`Foto de ${data.name}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              if (e.currentTarget.parentElement) {
                e.currentTarget.parentElement.classList.add(
                  "flex",
                  "items-center",
                  "justify-center",
                );
                e.currentTarget.parentElement.innerHTML =
                  '<span class="text-gray-400 font-medium">Imagem Indisponível</span>';
              }
            }}
          />
          <div className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            Qtd: {data.quantity || 1}
          </div>
        </div>
      ) : (
        <div className="h-48 bg-gray-200 w-full flex items-center justify-center relative">
          <span className="text-gray-400 font-medium">Sem Imagem</span>
          <div className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            Qtd: {data.quantity || 1}
          </div>
        </div>
      )}

      {/* === CONTEÚDO DO CARTÃO === */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1 capitalize">
            {data.name}
          </h3>
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider whitespace-nowrap">
            {data.category}
          </span>
        </div>

        {(data.city || data.state) && (
          <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-4 font-medium">
            <svg
              className="w-4 h-4 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {data.city}
            {data.city && data.state ? ", " : ""}
            {data.state}
          </div>
        )}

        <p className="text-gray-600 text-sm line-clamp-3 mb-5 font-light leading-relaxed">
          {data.description || "Nenhuma descrição fornecida para este registo."}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-end items-center text-xs">
          {data.latitude && data.longitude ? (
            <span className="text-emerald-600 font-medium flex items-center gap-1.5">
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
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              Mapeado
            </span>
          ) : (
            <span className="text-gray-400 font-light">Sem geolocalização</span>
          )}
        </div>
      </div>
    </div>
  );
}
