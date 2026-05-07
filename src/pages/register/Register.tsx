import { useState, useEffect, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";

// Importação dos componentes extraídos
import { RegisterAlerts } from "../../pages/register/Components/RegisterAlerts";
import { LocationAutocomplete } from "../../pages/register/Components/LocationAutocomplete";
import { BasicInputFields } from "../../pages/register/Components/BasicInputFields";
import { DescriptionInput } from "../../pages/register/Components/DescriptionInput";
import { SubmitButton } from "../../pages/register/Components/SubmitButton";

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
  const [filteredLocations, setFilteredLocations] = useState<IBGELocation[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Estados de Controlo Visual
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locationNotFound, setLocationNotFound] = useState(false);

  // Carrega dados se for Edição
  useEffect(() => {
    if (isEditMode) {
      api.get(`/species/${id}`)
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
        .catch(() => setError("Erro ao carregar os dados para edição."));
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
      const textToSearch = val.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const filtered = allLocations
        .filter((l) =>
          l.city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(textToSearch)
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
      setError("Para localizar no mapa, preencha tanto a Cidade quanto o Estado.");
      return;
    }

    setIsLoading(true);

    try {
      let finalLat: number | undefined = undefined;
      let finalLng: number | undefined = undefined;

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

      if (isEditMode) {
        await api.put(`/species/${id}`, payload);
      } else {
        await api.post("/species", payload);
      }

      setSuccess(true);
      setIsLoading(false);
      setTimeout(() => navigate("/catalogo"), 2500);
    } catch (err) {
      setError("Erro ao salvar. Verifique a sua conexão ou o servidor (json-server).");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-xl mt-10 mb-20 border border-gray-100 relative">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <span className="bg-green-600 w-2 h-8 rounded-full"></span>
        {isEditMode ? "Editar Registo" : "Novo Registo de Espécie"}
      </h2>

      <form onSubmit={(e) => handleSubmit(e, false)} className="flex flex-col gap-5" autoComplete="off" >
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

        <BasicInputFields
          name={name}
          setName={setName}
          category={category}
          setCategory={setCategory}
          quantity={quantity}
          setQuantity={setQuantity}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          disabled={success}
        />

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

        <DescriptionInput
          description={description}
          setDescription={setDescription}
          disabled={success}
        />

        <SubmitButton
          isLoading={isLoading}
          success={success}
          isEditMode={isEditMode}
        />
      </form>
    </div>
  );
}