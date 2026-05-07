import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function LandingHeader() {
  return (
    <header className="absolute top-0 w-full z-50 flex items-center justify-between p-6 lg:px-12 backdrop-blur-sm border-b border-white/10">
      {/* Logótipo */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.6 }} 
        className="flex items-center gap-3"
      >
        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
          <span className="text-white font-black text-2xl">S</span>
        </div>
        <span className="text-2xl font-black text-white tracking-widest drop-shadow-md">
          SIAPESQ
        </span>
      </motion.div>

      {/* Navegação */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.2 }} 
        className="hidden md:flex gap-8 text-white/90 font-medium"
      >
        <a href="#pilares" className="hover:text-green-400 transition-colors">Nossa Missão</a>
        <a href="#sobre" className="hover:text-green-400 transition-colors">O Projeto</a>
      </motion.nav>

      {/* Botão de Acesso Rápido */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Link 
          to="/catalogo" 
          className="hidden md:flex px-6 py-2 border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-bold rounded-full transition-all"
        >
          Entrar
        </Link>
      </motion.div>
    </header>
  );
}