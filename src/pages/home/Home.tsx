import { useState, useMemo, useEffect } from "react";
import type { Species } from "../../types/species";
import { api } from "../../services/api";
import { useLocation } from "react-router-dom";

// Importação dos subcomponentes
import { Dashboard } from "../home/Components/Dashboard";
import { SpeciesMap } from "../home/Components/SpeciesMap";
import { ConfirmDeleteModal } from "../home/Components/ConfirmDeleteModal";
import { ToastNotification } from "../home/Components/ToastNotification";
import { FilterBar } from "../home/Components/FilterBar";
import { SpeciesGrid } from "../home/Components/SpeciesGrid";

export function Home() {
  const location = useLocation();
  const [species, setSpecies] = useState<Species[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null }>({ isOpen: false, id: null });
  const [toastMessage, setToastMessage] = useState(""); 

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

  const filteredSpecies = useMemo(() => {
    if (!Array.isArray(species)) return [];
    return species.filter((item) => {
      const nomeSeguro = item.name ? String(item.name).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";
      const buscaSegura = searchTerm ? String(searchTerm).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";
      const matchesSearch = nomeSeguro.includes(buscaSegura);
      const itemCategory = item.category ? String(item.category).trim() : "";
      const selectedCategory = filterCategory ? String(filterCategory).trim() : "";
      const matchesCategory = selectedCategory ? itemCategory === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [species, searchTerm, filterCategory]);

  const requestDelete = (id: string) => {
    setDeleteModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    if (!deleteModal.id) return;
    try {
      await api.delete(`/species/${deleteModal.id}`);
      setSpecies(species.filter(item => item.id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: null });
      
      setToastMessage("Espécie excluída permanentemente.");
      setTimeout(() => setToastMessage(""), 3000);
    } catch (error) {
      console.error("Erro ao excluir", error);
    }
  };

    useEffect(() => {
    if (location.hash === "#dashboard") {
      // Um pequeno delay garante que o React termine a animação de página antes de deslizar
      setTimeout(() => {
        document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } else if (location.pathname === "/catalogo") {
      // Se não tem hash, garante que a página começa no topo
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="max-w-6xl mx-auto p-6 relative">
      <ConfirmDeleteModal 
        isOpen={deleteModal.isOpen} 
        onClose={() => setDeleteModal({ isOpen: false, id: null })} 
        onConfirm={confirmDelete} 
      />
      
      <ToastNotification message={toastMessage} />

      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Catálogo de Espécies
      </h1>

      <FilterBar 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        filterCategory={filterCategory} 
        onFilterChange={setFilterCategory} 
      />

      <SpeciesGrid 
        speciesList={filteredSpecies} 
        onRequestDelete={requestDelete} 
      />

      <div id="dashboard" className="scroll-mt-24 mt-12 z-0 relative">
        <Dashboard species={species} />
      </div>  

      <div className="mt-8 z-0 relative">
        <SpeciesMap species={species} />
      </div>
    </div>
  );
}