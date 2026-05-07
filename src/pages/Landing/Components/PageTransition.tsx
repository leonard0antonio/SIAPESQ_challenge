// Componente de transição de página, responsável por animar a entrada e saída dos componentes da página de destino. Ele utiliza a biblioteca Framer Motion para criar uma experiência visualmente envolvente, com animações suaves que melhoram a navegação entre as seções da página. O componente envolve os elementos filhos e aplica as animações de opacidade e movimento vertical para criar uma transição fluida entre as páginas.

import { motion } from "framer-motion";
import type {ReactNode} from "react";

interface Props {
  children: ReactNode;
}

export function PageTransition({ children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} // Começa um pouco abaixo e invisível
      animate={{ opacity: 1, y: 0 }}   // Sobe e fica visível
      exit={{ opacity: 0, y: -10 }}    // Sobe mais um pouco e desaparece ao sair
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}