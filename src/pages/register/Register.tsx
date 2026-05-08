// Página de registro de espécies, responsável por fornecer um formulário para criar ou editar registros de espécies. A Register é uma interface intuitiva que permite aos usuários inserir informações detalhadas sobre a espécie, incluindo nome, categoria, descrição, imagem e localização. Ela também integra funcionalidades de autocomplete para cidades e estados, utilizando dados do IBGE, e validação para garantir que as informações sejam completas e precisas. A Register é essencial para a criação e manutenção do catálogo de espécies no aplicativo.

import React, { useState, useEffect } from "react";
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

//  FIX 2: Criar tipagem para a resposta da API do IBGE
interface IBGEMunicipio {
  nome: string;
  microrregiao?: {
    mesorregiao?: {
      UF?: {
        sigla?: string;
      };
    };
  };
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
        .catch(() => setError("Erro ao carregar os dados para edição."));
    }
  }, [id, isEditMode]);

  // Busca inicial das cidades (IBGE)
  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios")
      .then((res) => res.json())
      .then((data: IBGEMunicipio[]) => {
        // ✨ Aplicamos a tipagem aqui em vez do 'any'
        const formatted = data.map((m) => ({
          city: m.nome,
          state: m.microrregiao?.mesorregiao?.UF?.sigla || "DF",
        }));
        setAllLocations(formatted);
      })
      .catch(() => console.error("Erro ao carregar cidades."));
  }, []);

  // Lógica de Autocomplete para Cidade/Estado
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

  // Lógica para selecionar uma sugestão de localização
  const handleSelectLocation = (loc: IBGELocation) => {
    setCity(loc.city);
    setState(loc.state);
    setShowSuggestions(false);
    setError("");
  };

  // Lógica de Submissão do Formulário, incluindo a consulta ao Nominatim para obter coordenadas geográficas
  const handleSubmit = async (
    e?: React.SyntheticEvent | null,
    bypassMap = false,
  ) => {
    if (e && e.preventDefault) e.preventDefault();
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

      // Prepara o payload para envio, garantindo que os campos de texto sejam limpos e as coordenadas sejam incluídas se disponíveis
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
    } catch {
      //  FIX 3: Remoção do (err) já que não estava a ser usado
      setError(
        "Erro ao salvar. Verifique a sua conexão ou o servidor (json-server).",
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-xl mt-10 mb-20 border border-gray-100 relative">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <span className="bg-emerald-600 w-2 h-8 rounded-full"></span>{" "}
        {/* Combinando com o tema Emerald! */}
        {isEditMode ? "Editar Registo" : "Novo Registo de Espécie"}
      </h2>

      <div className="flex flex-col gap-5">
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
          onClick={(e) => handleSubmit(e, false)}
        />
      </div>
    </div>
  );
}
