import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";

// Importação dos componentes extraídos
import { RegisterAlerts } from "./Components/RegisterAlerts";
import { LocationAutocomplete } from "./Components/LocationAutocomplete";

interface IBGELocation {
  city: string;
  state: string;
}

export function Register() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // Estados dos Campos
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [quantity, setQuantity] = useState<number | "">(1);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // Estados de Localização (IBGE)
  const [allLocations, setAllLocations] = useState<IBGELocation[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<IBGELocation[]>(
    [],
  );
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Estados de Controlo Visual
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locationNotFound, setLocationNotFound] = useState(false);

  // Carrega dados se for Edição
  useEffect(() => {
    if (isEditMode) {
      api
        .get(`/species/${id}`)
        .then((response) => {
          const animal = response.data;
          setName(animal.name);
          setCategory(animal.category);
          setDescription(animal.description || "");
          setImageUrl(animal.imageUrl || "");
          setQuantity(animal.quantity || 1);
          setCity(animal.city || "");
          setState(animal.state || "");
        })
        .catch(() => {
          setError("Erro ao carregar os dados para edição.");
        });
    }
  }, [id, isEditMode]);

  // Busca inicial das cidades (IBGE)
  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((m: any) => ({
          city: m.nome,
          state: m.microrregiao?.mesorregiao?.UF?.sigla || "DF",
        }));
        setAllLocations(formatted);
      })
      .catch(() => console.error("Erro ao carregar cidades."));
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCity(val);
    setLocationNotFound(false);

    if (val.length > 1) {
      const textToSearch = val
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      const filtered = allLocations
        .filter((l) =>
          l.city
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(textToSearch),
        )
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

    if (!name.trim() || !category || quantity === "") {
      setError("O nome da espécie e a categoria são obrigatórios.");
      return;
    }

    if ((city && !state) || (!city && state)) {
      setError(
        "Para localizar no mapa, preencha tanto a Cidade quanto o Estado.",
      );
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

      if (isEditMode) {
        await api.put(`/species/${id}`, payload);
      } else {
        await api.post("/species", payload);
      }

      setSuccess(true);
      setIsLoading(false);
      setTimeout(() => navigate("/"), 2500);
    } catch (err) {
      setError(
        "Erro ao salvar. Verifique a sua conexão ou o servidor (json-server).",
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-xl mt-10 mb-20 border border-gray-100 relative">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <span className="bg-green-600 w-2 h-8 rounded-full"></span>
        {isEditMode ? "Editar Registo" : "Novo Registo de Espécie"}
      </h2>

      <form
        onSubmit={(e) => handleSubmit(e, false)}
        className="flex flex-col gap-5"
      >
        {/* COMPONENTE DE ALERTAS EXTRAÍDO */}
        <RegisterAlerts
          error={error}
          success={success}
          isEditMode={isEditMode}
          locationNotFound={locationNotFound}
          city={city}
          state={state}
          onBypassMap={handleSubmit}
          onRetryMap={() => setLocationNotFound(false)}
        />

        {/* INPUTS BÁSICOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome da Espécie *
            </label>
            <input
              placeholder="Ex: Onça Pintada"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={success}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoria *
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantidade *
            </label>
            <input
              type="number"
              min="1"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value === "" ? "" : Number(e.target.value))
              }
              disabled={success}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link da Imagem
            </label>
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

        {/* COMPONENTE DE LOCALIZAÇÃO EXTRAÍDO */}
        <LocationAutocomplete
          city={city}
          state={state}
          disabled={success}
          showSuggestions={showSuggestions}
          filteredLocations={filteredLocations}
          onCityChange={handleCityChange}
          onStateChange={setState}
          onSelectLocation={handleSelectLocation}
          onBlurCity={() => setTimeout(() => setShowSuggestions(false), 200)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descrição (Opcional)
          </label>
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
      </form>
    </div>
  );
}
