import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Imagem de Fundo com Gradiente Mais Escuro para Destacar o Texto */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1920')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-900/95"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-10">
        
        {/* Etiqueta Flutuante */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }} 
          className="px-5 py-2 bg-white/10 border border-white/20 text-green-300 rounded-full text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-md"
        >
          Tecnologia para a Biodiversidade
        </motion.div>
        
        {/* Título Principal */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.2 }} 
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-2xl"
        >
          Protegendo a <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-500">
            Fauna Silvestre
          </span>
        </motion.h1>
        
        {/* Subtítulo */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.4 }} 
          className="text-lg md:text-2xl text-gray-300 mb-12 max-w-3xl drop-shadow-md font-light leading-relaxed"
        >
          Monitoramento inteligente, mapeamento geográfico em tempo real e análise de dados focada na conservação das espécies brasileiras.
        </motion.p>
        
        {/* Botão de Call to Action (CTA) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Link 
            to="/catalogo" 
            className="group relative px-8 py-4 bg-green-600 text-white font-bold rounded-full shadow-[0_0_30px_rgba(22,163,74,0.5)] transition-all hover:scale-105 flex items-center justify-center gap-3 text-lg overflow-hidden"
          >
            <span className="relative z-10">Acessar o Sistema</span>
            <svg className="w-6 h-6 relative z-10 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-green-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
          </Link>
        </motion.div>
      </div>

      {/* Seta para fazer Scroll */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1, delay: 1.5 }} 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-white/50 cursor-pointer"
      >
        <span className="text-xs uppercase tracking-widest mb-2 font-semibold">Descubra mais</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}