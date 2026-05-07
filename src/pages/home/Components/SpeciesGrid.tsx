//componente de grade de espécies, responsável por exibir uma coleção de cartões de espécies em um layout de grade. Ele utiliza a biblioteca Framer Motion para animar a entrada, saída e interação dos cartões, proporcionando uma experiência visualmente agradável. O SpeciesGrid também lida com o estado vazio, exibindo uma mensagem informativa quando não há espécies para mostrar. Este componente é essencial para a interface do usuário, pois organiza e apresenta as espécies registadas de forma clara e acessível.

import { motion, AnimatePresence } from "framer-motion";
import { SpeciesCard } from "../Components/SpeciesCard";
import type { Species } from "../../../types/species";

// Interface de props para o componente SpeciesGrid, definindo os tipos esperados para as propriedades de lista de espécies e função de exclusão
interface Props {
  speciesList: Species[];
  onRequestDelete: (id: string) => void;
}

export function SpeciesGrid({ speciesList, onRequestDelete }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
      <AnimatePresence mode="popLayout">
        {speciesList.length > 0 ? (
          speciesList.map((item) => (
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
              <SpeciesCard data={item} onDelete={onRequestDelete} />
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
  );
}
