import { Link } from 'react-router-dom';
import type { Species } from '../types/species';

interface Props {
  data: Species;
  onDelete: (id: string) => void;
}

export function SpeciesCard({ data, onDelete }: Props) {
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 relative group">
      
      {/* BOTÕES DE AÇÃO COM ÍCONES PROFISSIONAIS (Aparecem ao passar o rato) */}
      <div className="absolute top-3 right-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Link 
          to={`/edit/${data.id}`} 
          className="bg-blue-500 hover:bg-blue-600 text-white p-2.5 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
          title="Editar Registo"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </Link>
        <button 
          onClick={() => onDelete(data.id)}
          className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
          title="Excluir Registo"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
              e.currentTarget.style.display = 'none';
              if (e.currentTarget.parentElement) {
                e.currentTarget.parentElement.classList.add('flex', 'items-center', 'justify-center');
                e.currentTarget.parentElement.innerHTML = '<span class="text-gray-400 font-medium">Imagem Indisponível</span>';
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
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1 capitalize">{data.name}</h3>
          <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
            {data.category}
          </span>
        </div>

        {(data.city || data.state) && (
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-3 font-medium">
            <span className="text-sm">📍</span>
            {data.city}{data.city && data.state ? ', ' : ''}{data.state}
          </div>
        )}

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {data.description || 'Nenhuma descrição fornecida.'}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-50 flex justify-end items-center text-xs">
          {data.latitude && data.longitude ? (
            <span className="text-green-600 font-bold flex items-center gap-1">
              <span>🗺️</span> Marcado no Mapa
            </span>
          ) : (
            <span className="text-gray-400">Sem localização exata</span>
          )}
        </div>
      </div>
    </div>
  );
}