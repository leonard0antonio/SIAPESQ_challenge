import { motion } from "framer-motion";

export function LandingHeader() {
  return (
    <header className="absolute top-0 w-full z-50 flex items-center p-6 lg:px-12 backdrop-blur-sm border-b border-white/10">
      
      {/* Lado Esquerdo - Logótipo (flex-1 faz com que ocupe o mesmo peso do lado direito) */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.6 }} 
        className="flex-1 flex items-center gap-3"
      >
        <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <span className="text-white font-black text-2xl">S</span>
        </div>
        <span className="text-2xl font-black text-white tracking-widest drop-shadow-md">
          SIAPESQ
        </span>
      </motion.div>

      {/* Centro - Navegação */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.2 }} 
        className="hidden md:flex flex-none justify-center gap-8 text-white/90 font-medium"
      >
        <a href="#pilares" className="hover:text-emerald-400 transition-colors">Nossa Missão</a>
        <a href="#sobre" className="hover:text-emerald-400 transition-colors">O Projeto</a>
      </motion.nav>

      {/* Lado Direito - Elemento fantasma para equilibrar a balança e forçar o centro perfeito */}
      <div className="flex-1 hidden md:block"></div>

    </header>
  );
}