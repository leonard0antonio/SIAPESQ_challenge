import { useState, useMemo, useEffect } from "react";
import { SpeciesCard } from "../components/SpeciesCard";
import type { Species } from "../types/species";
import { api } from "../services/api";
import { Dashboard } from "../components/Dashboard";
import { SpeciesMap } from "../components/SpeciesMap";
import { motion, AnimatePresence } from "framer-motion";

export function Home() {
  const [species, setSpecies] = useState<Species[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // NOVOS ESTADOS PARA FEEDBACK VISUAL
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null }>({ isOpen: false, id: null });
  const [toastMessage, setToastMessage] = useState(""); // Mensagem verde de sucesso flutuante

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

  // FILTRO
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

  // === LÓGICA DE EXCLUSÃO PROFISSIONAL ===
  // 1. Abre a caixinha elegante em vez do window.confirm
  const requestDelete = (id: string) => {
    setDeleteModal({ isOpen: true, id });
  };

  // 2. Executa a exclusão se o utilizador clicar em "Sim, Excluir"
  const confirmDelete = async () => {
    if (!deleteModal.id) return;
    try {
      await api.delete(`/species/${deleteModal.id}`); // Apaga na API
      setSpecies(species.filter(item => item.id !== deleteModal.id)); // Remove da tela
      setDeleteModal({ isOpen: false, id: null }); // Fecha o modal
      
      // Mostra a notificação verde e esconde após 3 segundos
      setToastMessage("Espécie excluída permanentemente.");
      setTimeout(() => setToastMessage(""), 3000);
      
    } catch (error) {
      console.error("Erro ao excluir", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 relative">
      
      {/* === MODAL DE EXCLUSÃO (SUBSTITUI O WINDOW.CONFIRM) === */}
      <AnimatePresence>
        {deleteModal.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm px-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full"
            >
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-2">Atenção!</h3>
              <p className="text-center text-gray-600 text-sm mb-6">
                Tem a certeza que deseja excluir este registo? Esta ação não pode ser desfeita e os dados serão removidos dos gráficos.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setDeleteModal({ isOpen: false, id: null })}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-md transition-colors"
                >
                  Sim, Excluir
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* === TOAST DE SUCESSO FLUTUANTE === */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-gray-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-medium text-sm"
          >
            <span className="text-green-400">✔</span> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
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
                {/* Aqui passamos a função 'requestDelete' para o cartão abrir o modal */}
                <SpeciesCard data={item} onDelete={requestDelete} />
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

      {/* PAINEL DE GRÁFICOS */}
      <div id="dashboard" className="scroll-mt-24 mt-12 z-0 relative">
        <Dashboard species={species} />
      </div>  

      {/* MAPA */}
      <div className="mt-8 z-0 relative">
        <SpeciesMap species={species} />
      </div>
    </div>
  );
}