import type { Species } from '../types/species';

interface Props {
  data: Species;
}

export function SpeciesCard({ data }: Props) {
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      
      {/* === ÁREA DA IMAGEM === */}
      {data.imageUrl ? (
        <div className="h-48 w-full overflow-hidden relative bg-gray-100">
          <img 
            src={data.imageUrl} 
            alt={`Foto de ${data.name}`} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            // Proteção: se o link quebrar no futuro, ele avisa em vez de ficar um erro feio
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              if (e.currentTarget.parentElement) {
                e.currentTarget.parentElement.classList.add('flex', 'items-center', 'justify-center');
                e.currentTarget.parentElement.innerHTML = '<span class="text-gray-400 font-medium">Imagem Indisponível</span>';
              }
            }}
          />
          {/* Badge de Quantidade sobre a imagem */}
          <div className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            Qtd: {data.quantity || 1}
          </div>
        </div>
      ) : (
        /* Caso o registo não tenha imagem */
        <div className="h-48 bg-gray-200 w-full flex items-center justify-center relative">
          <span className="text-gray-400 font-medium">Sem Imagem</span>
          <div className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            Qtd: {data.quantity || 1}
          </div>
        </div>
      )}
      
      {/* === CONTEÚDO DO CARTÃO === */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* Cabeçalho do Cartão: Nome e Categoria */}
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1 capitalize">{data.name}</h3>
          <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
            {data.category}
          </span>
        </div>

        {/* Localização (Cidade e Estado) */}
        {(data.city || data.state) && (
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-3 font-medium">
            <span className="text-sm">📍</span>
            {data.city}{data.city && data.state ? ', ' : ''}{data.state}
          </div>
        )}

        {/* Descrição */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {data.description || 'Nenhuma descrição fornecida para esta espécie.'}
        </p>
        
        {/* Rodapé do Cartão: Status do Mapa */}
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