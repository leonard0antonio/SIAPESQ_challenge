import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom"; // <-- useParams adicionado
import { api } from "../services/api";

interface IBGELocation {
  city: string;
  state: string;
}

export function Register() {
  const navigate = useNavigate();
  const { id } = useParams(); // <-- Pega o ID da URL se existir
  const isEditMode = !!id; // Descobre se estamos a criar ou a editar

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState<number | "">(1);
  const [city, setCity] = useState("");
  const [state, setState] = useState(""); 

  // ESTADOS DE LOCALIZAÇÃO (IBGE)
  const [allLocations, setAllLocations] = useState<IBGELocation[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<IBGELocation[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // ESTADOS DE CONTROLO VISUAL
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locationNotFound, setLocationNotFound] = useState(false); 

  // === NOVO: Carregar dados se for modo de edição ===
  useEffect(() => {
    if (isEditMode) {
      api.get(`/species/${id}`).then(response => {
        const animal = response.data;
        setName(animal.name);
        setCategory(animal.category);
        setDescription(animal.description || "");
        setImageUrl(animal.imageUrl || "");
        setQuantity(animal.quantity || 1);
        setCity(animal.city || "");
        setState(animal.state || "");
      }).catch(() => {
        setError("Erro ao carregar os dados para edição.");
      });
    }
  }, [id, isEditMode]);

  // Busca inicial das cidades
  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((m: any) => ({
          city: m.nome,
          state: m.microrregiao?.mesorregiao?.UF?.sigla || 'DF'
        }));
        setAllLocations(formatted);
      })
      .catch(() => console.error("Erro ao carregar base de dados de cidades."));
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCity(val);
    setLocationNotFound(false); 

    if (val.length > 1) {
      const textToSearch = val.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const filtered = allLocations
        .filter(l => l.city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(textToSearch))
        .slice(0, 6);

      setFilteredLocations(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectLocation = (loc: IBGELocation) => {
    setCity(loc.city);
    setState(loc.state); 
    setShowSuggestions(false);
    setError(""); 
  };

  const handleSubmit = async (e: FormEvent | null, bypassMap = false) => {
    if (e) e.preventDefault();
    setError("");
    setSuccess(false);

    // 1. Campos básicos obrigatórios
    if (!name.trim() || !category || quantity === "") {
      setError("O nome da espécie e a categoria são obrigatórios.");
      return;
    }

    // 2. Validação Lógica de Localização
    if ((city && !state) || (!city && state)) {
      setError("Para localizar no mapa, preencha tanto a Cidade quanto o Estado.");
      return;
    }

    setIsLoading(true);

    try {
      let finalLat: number | undefined = undefined;
      let finalLng: number | undefined = undefined;

      // 3. Tenta localizar no mapa
      if (city && state && !bypassMap) {
        const query = encodeURIComponent(`${city}, ${state}`);
        const mapRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
        const mapData = await mapRes.json();

        if (mapData && mapData.length > 0) {
          finalLat = Number(mapData[0].lat);
          finalLng = Number(mapData[0].lon);
        } else {
          setLocationNotFound(true);
          setIsLoading(false);
          return;
        }
      }

      const payload = {
        name: name.trim(),
        category,
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        quantity: Number(quantity),
        city: city.trim(),
        state: state.trim().toUpperCase(),
        latitude: finalLat,
        longitude: finalLng,
      };

      // 4. Salva na API (Atualiza se for edição, Cria se for novo)
      if (isEditMode) {
        await api.put(`/species/${id}`, payload);
      } else {
        await api.post("/species", payload);
      }

      // 5. Sucesso e Redirecionamento
      setSuccess(true);
      setIsLoading(false);
      
      setTimeout(() => {
        navigate("/");
      }, 2500);

    } catch (err) {
      setError("Erro ao salvar. Verifique a sua conexão ou o servidor (json-server).");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-xl mt-10 mb-20 border border-gray-100 relative">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <span className="bg-green-600 w-2 h-8 rounded-full"></span>
        {/* Título dinâmico */}
        {isEditMode ? "Editar Registo" : "Novo Registo de Espécie"}
      </h2>

      <form onSubmit={(e) => handleSubmit(e, false)} className="flex flex-col gap-5">
        
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg font-medium text-sm animate-bounce">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="fixed inset-x-0 top-24 mx-auto max-w-md p-6 bg-green-600 text-white rounded-2xl shadow-2xl z-[60] text-center animate-in fade-in zoom-in duration-300">
            <span className="text-4xl mb-2 block">✅</span>
            <h3 className="text-xl font-bold">{isEditMode ? "Edição Concluída!" : "Cadastro Concluído!"}</h3>
            <p className="text-sm opacity-90">
              {isEditMode ? "A espécie foi atualizada com sucesso. A redirecionar..." : "A espécie foi adicionada. A redirecionar..."}
            </p>
          </div>
        )}

        {locationNotFound && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 shadow-sm animate-pulse">
            <p className="font-bold text-sm flex items-center gap-1">📍 Local não encontrado no mapa</p>
            <p className="text-xs mb-3 mt-1">
              O mapa não conseguiu encontrar "{city}, {state}". Deseja guardar apenas os nomes sem a marcação no mapa geográfico?
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)} 
                className="bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded hover:bg-amber-700 transition-colors"
              >
                Sim, guardar sem mapa
              </button>
              <button
                type="button"
                onClick={() => setLocationNotFound(false)}
                className="text-amber-700 text-xs px-3 py-2 underline hover:text-amber-900"
              >
                Tentar corrigir a cidade
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Espécie *</label>
            <input
              placeholder="Ex: Onça Pintada"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={success}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
            <select
              className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-green-500 outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={success}
            >
              <option value="">Selecione...</option>
              <option value="Aves">Aves</option>
              <option value="Mamíferos">Mamíferos</option>
              <option value="Répteis">Répteis</option>
              <option value="Anfíbios">Anfíbios</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade *</label>
            <input
              type="number"
              min="1"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
              disabled={success}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link da Imagem</label>
            <input
              type="url"
              placeholder="https://site.com/foto.jpg"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              disabled={success}
            />
          </div>
        </div>

        <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
          <p className="text-xs font-bold text-blue-600 uppercase mb-3">Localização (IBGE ou Manual)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
              <input
                placeholder="Busque ou digite a cidade..."
                className="w-full p-3 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                value={city}
                onChange={handleCityChange}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                disabled={success}
              />

              {showSuggestions && filteredLocations.length > 0 && (
                <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-2xl max-h-48 overflow-y-auto">
                  {filteredLocations.map((loc, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 flex justify-between border-b last:border-b-0"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSelectLocation(loc);
                      }}
                    >
                      <span className="font-bold">{loc.city}</span>
                      <span className="text-blue-600 font-bold text-xs bg-blue-100 px-2 py-1 rounded">{loc.state}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <input
                placeholder="Ex: SP"
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                value={state}
                onChange={(e) => setState(e.target.value)}
                disabled={success}
              />
            </div>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">
            Selecione uma cidade da lista do Brasil ou digite manualmente.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição (Opcional)</label>
          <textarea
            placeholder="Observações..."
            className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={success}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || success}
          className={`mt-4 py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
            success ? "bg-green-500 text-white" : "bg-green-600 hover:bg-green-700 text-white"
          } ${isLoading ? "opacity-50 cursor-wait" : ""}`}
        >
          {isLoading ? "A localizar e salvar..." : success ? "Finalizado!" : isEditMode ? "Confirmar Edição" : "Confirmar Cadastro"}
        </button>
      </form>
    </div>
  );
}