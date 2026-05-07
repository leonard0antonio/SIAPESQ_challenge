import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-green-200">
      
      {/* HEADER INSTITUCIONAL */}
      <header className="w-full absolute top-0 z-50 flex items-center justify-between p-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-2xl font-black text-white tracking-wider drop-shadow-md">
            SIAPESQ
          </span>
        </motion.div>
        
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:flex gap-6 text-white font-medium drop-shadow-md"
        >
          <a href="#sobre" className="hover:text-green-300 transition-colors">Sobre o Projeto</a>
          <a href="#pilares" className="hover:text-green-300 transition-colors">Nossos Pilares</a>
        </motion.nav>
      </header>

      {/* HERO SECTION (Capa com Imagem de Fundo) */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Imagem de Fundo (Natureza/Amazónia) */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1920')" }}
        >
          {/* Overlay Escuro para destacar o texto */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900/90"></div>
        </div>

        {/* Conteúdo Central */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-1.5 bg-green-500/20 border border-green-400/30 text-green-300 rounded-full text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm"
          >
            Preservação & Pesquisa
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-xl"
          >
            Sistema Integrado de <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
              Fauna Silvestre
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl drop-shadow-md"
          >
            Monitoramento inteligente, mapeamento geográfico e análise de dados para a conservação da biodiversidade brasileira.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* O BOTÃO QUE LEVA PARA O SISTEMA */}
            <Link 
              to="/catalogo" 
              className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(22,163,74,0.4)] transition-all hover:scale-105 flex items-center justify-center gap-2 text-lg"
            >
              Acessar Sistema
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
          </motion.div>
        </div>

        {/* Efeito de Scroll Down */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce text-white/50"
        >
          <span className="text-xs uppercase tracking-widest mb-2">Deslize</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </motion.div>
      </section>

      {/* SEÇÃO DE PILARES (Estilo Institucional) */}
      <section id="pilares" className="py-24 bg-white relative z-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">A Nossa Abordagem</h2>
            <div className="w-24 h-1.5 bg-green-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🗺️", title: "Mapeamento Ativo", desc: "Geolocalização precisa de espécies para identificar padrões de migração e áreas de risco." },
              { icon: "📊", title: "Dados em Tempo Real", desc: "Dashboards analíticos que auxiliam investigadores na tomada de decisões estratégicas." },
              { icon: "🌱", title: "Conservação Focada", desc: "Esforços direcionados para categorias ameaçadas com base no registo populacional." }
            ].map((pillar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow text-center group"
              >
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">{pillar.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{pillar.title}</h3>
                <p className="text-gray-600 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER SIMPLES */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm border-t border-gray-800">
        <p>© {new Date().getFullYear()} SIAPESQ - Sistema Integrado. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}