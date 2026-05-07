import { useState, useMemo, useEffect } from "react";
import { SpeciesCard } from "../components/SpeciesCard";
import type { Species } from "../types/species";
import { api } from "../services/api";
import { Dashboard } from "../components/Dashboard";
import { SpeciesMap } from "../components/SpeciesMap";
import { motion, AnimatePresence } from "framer-motion"; // Importe a biblioteca

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

  // === NOVA FUNÇÃO DE EXCLUIR ===
  const handleDelete = async (id: string) => {
    // Pede confirmação antes de apagar
    const confirmDelete = window.confirm("Tem a certeza que deseja excluir este registo permanentemente?");
    
    if (confirmDelete) {
      try {
        await api.delete(`/species/${id}`); // Apaga na API
        setSpecies(species.filter(item => item.id !== id)); // Remove da tela imediatamente
      } catch (error) {
        alert("Erro ao excluir. Tente novamente.");
      }
    }
  };

  // FILTRO BLINDADO (Ignora acentos, maiúsculas e espaços acidentais)
  const filteredSpecies = useMemo(() => {
    if (!Array.isArray(species)) return [];

    return species.filter((item) => {
      // 1. Tratamento do Nome e Pesquisa (Remove acentos e espaços soltos)
      const nomeSeguro = item.name 
        ? String(item.name).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() 
        : "";
      const buscaSegura = searchTerm 
        ? String(searchTerm).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() 
        : "";

      const matchesSearch = nomeSeguro.includes(buscaSegura);

      // 2. Tratamento da Categoria (Garante que "Aves " seja lido como "Aves")
      const itemCategory = item.category ? String(item.category).trim() : "";
      const selectedCategory = filterCategory ? String(filterCategory).trim() : "";

      const matchesCategory = selectedCategory ? itemCategory === selectedCategory : true;

      // 3. Só exibe se passar nos dois testes
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
          placeholder="Buscar por nome (ex: onça)..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          aria-label="Filtrar por categoria"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white shadow-sm"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">Todas as Categorias</option>
          <option value="Aves">Aves</option>
          <option value="Mamíferos">Mamíferos</option>
          <option value="Répteis">Répteis</option>
          <option value="Anfíbios">Anfíbios</option>
        </select>
      </div>

      {/* Grid de Listagem com Animações */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        <AnimatePresence mode="popLayout">
          {filteredSpecies.length > 0 ? (
            filteredSpecies.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.03 }}
                className="w-full"
              >
                <SpeciesCard data={item} onDelete={handleDelete} />
              </motion.div>
            ))
          ) : (
            <motion.p
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center text-gray-500 bg-white p-10 rounded-2xl shadow-sm border border-gray-100"
            >
              Nenhuma espécie encontrada com estes filtros.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* PAINEL DE GRÁFICOS (Com ID para o scroll do Header) */}
      <div id="dashboard" className="scroll-mt-24 mt-12">
        <Dashboard species={species} />
      </div>  

      {/* MAPA */}
      <div className="mt-8">
        <SpeciesMap species={species} />
      </div>
    </div>
  );
}