import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Imagem de Fundo com Overlay Sóbrio (Verde Escuro em vez de Cinza/Preto) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1920')" }}
      >
        <div className="absolute inset-0 bg-emerald-950/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }} 
          className="px-5 py-2 bg-emerald-900/40 border border-emerald-400/20 text-emerald-100 rounded-full text-xs font-semibold tracking-[0.2em] uppercase mb-8 backdrop-blur-md"
        >
          Monitoramento e Conservação
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.1 }} 
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-lg"
        >
          Protegendo a <br className="hidden md:block" />
          <span className="text-emerald-400 font-black">
            Fauna Brasileira
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8, delay: 0.3 }} 
          className="text-lg md:text-2xl text-emerald-50/80 mb-12 max-w-3xl font-light leading-relaxed"
        >
          Plataforma integrada de mapeamento geográfico e análise de dados para a preservação das nossas espécies.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link 
            to="/catalogo" 
            className="group px-8 py-4 bg-emerald-600 text-white font-medium rounded-full transition-all hover:bg-emerald-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 text-lg"
          >
            Acessar o Sistema
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1, delay: 1.2 }} 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/40"
      >
        <span className="text-[10px] uppercase tracking-widest mb-3 font-medium">Rolar para baixo</span>
        <div className="w-[1px] h-12 bg-white/30 overflow-hidden relative">
          <div className="absolute top-0 w-full h-1/2 bg-white animate-[shimmer_2s_infinite]"></div>
        </div>
      </motion.div>
    </section>
  );
}