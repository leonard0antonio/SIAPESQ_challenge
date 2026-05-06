import { useState, useEffect, FormEvent } from "react";
import { api } from "../services/api";

// Criamos um tipo para nos ajudar com as cidades do IBGE
interface IBGELocation {
  city: string;
  state: string;
}

export function Register() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  // Descrição agora é opcional, deixamos o estado igual
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState<number | "">(1);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // NOVOS ESTADOS: Para o Autocompletar de Cidades
  const [allLocations, setAllLocations] = useState<IBGELocation[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<IBGELocation[]>(
    [],
  );
  const [showSuggestions, setShowSuggestions] = useState(false);

  // ESTADOS DE CONTROLO VISUAL
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locationNotFound, setLocationNotFound] = useState(false);

  // useEffect para buscar todas as cidades do Brasil de graça (IBGE)
  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
      .then(res => res.json())
      .then(data => {
        // O uso do "?." impede que o código quebre se o IBGE enviar dados nulos (ex: Distrito Federal)
        const formatted = data.map((m: any) => ({
          city: m.nome,
          state: m.microrregiao?.mesorregiao?.UF?.sigla || 'DF' // 'DF' como fallback se não encontrar
        }));
        
        setAllLocations(formatted);
      })
      .catch(err => console.error("Erro ao carregar cidades do IBGE:", err));
  }, []);

  // Função que roda sempre que digita uma letra na Cidade
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCity(val);

    if (val.length > 1) {
      // Remove os acentos tanto do que digitou quanto do banco do IBGE para comparar perfeitamente
      const textToSearch = val
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      const filtered = allLocations
        .filter((l) => {
          const cityName = l.city
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
          return cityName.includes(textToSearch);
        })
        .slice(0, 6);

      setFilteredLocations(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Função disparada ao clicar numa cidade da lista
  const handleSelectLocation = (loc: IBGELocation) => {
    setCity(loc.city);
    setState(loc.state); // Preenche o estado automaticamente!
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: FormEvent, bypassMap = false) => {
    if (e) e.preventDefault();
    setError("");
    setSuccess(false);

    // MUDANÇA: Retirámos a "description" da verificação de campos obrigatórios!
    if (!name || !category || quantity === "") {
      setError("Por favor, preencha todos os campos obrigatórios (*).");
      return;
    }

    setIsLoading(true);

    try {
      let finalLat: number | undefined = undefined;
      let finalLng: number | undefined = undefined;

      if (city && state && !bypassMap) {
        const query = encodeURIComponent(`${city}, ${state}`);
        const mapRes = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query}`,
        );
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

      await api.post("/species", {
        name,
        category,
        description,
        imageUrl,
        quantity: Number(quantity),
        city,
        state,
        latitude: finalLat,
        longitude: finalLng,
      });

      setSuccess(true);
      resetForm();
    } catch (err) {
      setError(
        "Erro de conexão com o servidor. Verifique se o json-server está a rodar.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setCategory("");
    setDescription("");
    setImageUrl("");
    setQuantity(1);
    setCity("");
    setState("");
    setLocationNotFound(false);
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-xl mt-10 mb-10 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <span className="bg-green-600 w-2 h-8 rounded-full"></span>
        Novo Registo
      </h2>

      <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-5">
        {/* MENSAGENS DE ERRO/SUCESSO (Mantidas iguais) */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 animate-pulse rounded-r-lg">
            <p className="font-bold">Erro</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
        {success && (
          <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-r-lg">
            <p className="font-bold">Sucesso!</p>
            <p className="text-sm">
              A espécie foi adicionada ao catálogo com sucesso.
            </p>
          </div>
        )}
        {locationNotFound && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 shadow-sm">
            <p className="font-bold text-sm flex items-center gap-1">
              📍 Local não encontrado no mapa
            </p>
            <p className="text-xs mb-3 mt-1">
              Deseja guardar apenas o nome da cidade sem a marcação no mapa
              geográfico?
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleSubmit(null as any, true)}
                className="bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded hover:bg-amber-700 transition-colors"
              >
                Sim, guardar assim mesmo
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

        {/* NOME E CATEGORIA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome da Espécie *
            </label>
            <input
              placeholder="Ex: Arara Azul"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria *
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-green-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="Aves">Aves</option>
              <option value="Mamíferos">Mamíferos</option>
              <option value="Répteis">Répteis</option>
              <option value="Anfíbios">Anfíbios</option>
            </select>
          </div>
        </div>

        {/* QUANTIDADE E IMAGEM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantidade Registada *
            </label>
            <input
              type="number"
              min="1"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link da Imagem (Opcional)
            </label>
            <input
              type="url"
              placeholder="https://..."
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
        </div>

        {/* LOCALIZAÇÃO COM AUTOCOMPLETAR */}
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <p className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-wider">
            Localização de Registro
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input da Cidade com dropdown relativo a ele */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cidade
              </label>
              <input
                placeholder="Ex: Manaus"
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-400"
                value={city}
                onChange={handleCityChange}
                onBlur={() => setShowSuggestions(false)}
                onFocus={() => city.length > 1 && setShowSuggestions(true)}
              />

              {/* Dropdown de Sugestões de Cidades com Z-Index altíssimo (z-50) e Sombra forte (shadow-2xl) */}
              {showSuggestions && filteredLocations.length > 0 && (
                <ul className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-2xl max-h-48 overflow-y-auto">
                  {filteredLocations.map((loc, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 flex justify-between border-b last:border-b-0"
                      // MUDANÇA CHAVE: onMouseDown evita que o onBlur do input feche a lista antes do clique registar!
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSelectLocation(loc);
                      }}
                    >
                      <span className="font-medium">{loc.city}</span>
                      <span className="text-blue-600 font-bold text-xs bg-blue-100 px-2 py-1 rounded">
                        {loc.state}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado / Região
              </label>
              <input
                placeholder="Ex: AM"
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-400"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Comece a digitar a cidade e selecione na lista para preencher o
            estado automaticamente "ou Digite Manualmente".
          </p>
        </div>

        {/* DESCRIÇÃO (Agora sem o asterisco e não obrigatória no backend) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição (Opcional)
          </label>
          <textarea
            placeholder="Detalhes sobre a espécie encontrada..."
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* BOTÃO SUBMIT */}
        <button
          disabled={isLoading}
          className={`mt-2 py-4 rounded-xl font-bold text-lg shadow-md transition-all active:scale-[0.98] ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed text-gray-100"
              : "bg-green-600 hover:bg-green-700 text-white hover:shadow-lg"
          }`}
        >
          {isLoading ? "A processar e localizar..." : "Finalizar Cadastro"}
        </button>
      </form>
    </div>
  );
}
