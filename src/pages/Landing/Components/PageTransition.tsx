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