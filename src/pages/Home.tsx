import { useState, useMemo, useEffect } from "react";
import { SpeciesCard } from "../components/SpeciesCard";
import type { Species } from "../types/species";
import { api } from "../services/api";
import { Dashboard } from "../components/Dashboard";
import { SpeciesMap } from "../components/SpeciesMap";

export function Home() {
  const [species, setSpecies] = useState<Species[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Busca os dados da API
  useEffect(() => {
    async function fetchSpecies() {
      try {
        const response = await api.get("/species");
        setSpecies(response.data);
      } catch (error) {
        console.error("Erro ao buscar as espécies:", error);
      }
    }
    fetchSpecies();
  }, []);

  // FILTRO CORRIGIDO E À PROVA DE FALHAS
  const filteredSpecies = useMemo(() => {
    // Se a API não devolver um array válido, retorna vazio para não quebrar a tela
    if (!Array.isArray(species)) return [];

    return species.filter((item) => {
      // Usamos String() para garantir que mesmo que venha vazio ou undefined, não quebra o código
      const nomeSeguro = item.name ? String(item.name).toLowerCase() : "";
      const buscaSegura = searchTerm ? String(searchTerm).toLowerCase() : "";

      const matchesSearch = nomeSeguro.includes(buscaSegura);
      const matchesCategory = filterCategory
        ? item.category === filterCategory
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [species, searchTerm, filterCategory]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Catálogo de Espécies
      </h1>

      {/* Barra de Busca e Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Buscar por nome..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          aria-label="Filtrar por categoria"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Todas as Categorias</option>
          <option value="Aves">Aves</option>
          <option value="Mamíferos">Mamíferos</option>
          <option value="Répteis">Répteis</option>
          {/* ADICIONADO ANFÍBIOS AQUI! */}
          <option value="Anfíbios">Anfíbios</option>
        </select>
      </div>

      {/* Grid de Listagem */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpecies.length > 0 ? (
          filteredSpecies.map((item) => (
            <SpeciesCard key={item.id} data={item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Nenhuma espécie encontrada.
          </p>
        )}
      </div>
      {/* FIM DA DIV DO GRID */}

      {/* PAINEL DE GRÁFICOS COM ID PARA A ÂNCORA DO HEADER */}
      {/* A classe scroll-mt-24 garante que o cabeçalho fixo não tape o título ao rolar! */}
      <div id="dashboard" className="scroll-mt-24">
        <Dashboard species={species} />
      </div>  

      {/* MAPA VEM AQUI, DEBAIXO DO DASHBOARD */}
      <div className="mt-8">
        <SpeciesMap species={species} />
      </div>
    </div>
  );
}
