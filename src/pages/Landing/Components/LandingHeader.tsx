import { motion } from "framer-motion";

export function LandingHeader() {
  // Função para realizar o scroll suave
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className="absolute top-0 w-full z-50 flex items-center p-6 lg:px-12 backdrop-blur-sm border-b border-white/10">
      
      {/* Lado Esquerdo - Logótipo */}
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

      {/* Centro - Navegação com Scroll Suave */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.2 }} 
        className="hidden md:flex flex-none justify-center gap-8 text-white/90 font-medium"
      >
        <a 
          href="#pilares" 
          onClick={(e) => handleScroll(e, "pilares")}
          className="hover:text-emerald-400 transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >
          Nossa Missão
        </a>
        <a 
          href="#sobre" 
          onClick={(e) => handleScroll(e, "sobre")}
          className="hover:text-emerald-400 transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >
          O Projeto
        </a>
      </motion.nav>

      {/* Lado Direito - Equilíbrio */}
      <div className="flex-1 hidden md:block"></div>

    </header>
  );
}