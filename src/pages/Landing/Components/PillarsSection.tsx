import { motion } from "framer-motion";

const pillars = [
  { 
    icon: "📍", 
    title: "Mapeamento Ativo", 
    desc: "Geolocalização precisa de espécies para identificar padrões de migração, densidade populacional e mapear áreas críticas de risco ambiental." 
  },
  { 
    icon: "📊", 
    title: "Análise de Dados", 
    desc: "Dashboards analíticos interativos que transformam registos brutos em insights poderosos para investigadores e órgãos ambientais." 
  },
  { 
    icon: "🌱", 
    title: "Ação Direcionada", 
    desc: "Otimização de recursos e esforços de conservação direcionados especificamente para categorias de animais mais vulneráveis e ameaçadas." 
  }
];

export function PillarsSection() {
  return (
    <section id="pilares" className="py-24 bg-white relative z-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Título da Secção */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight"
          >
            A Nossa <span className="text-green-600">Missão</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }} 
            className="text-xl text-gray-500 max-w-3xl mx-auto font-light"
          >
            Transformamos dados de observação em ferramentas práticas de conservação ambiental.
          </motion.p>
        </div>

        {/* Grid de Pilares */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pillars.map((pillar, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: idx * 0.2 }} 
              className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100 hover:shadow-2xl hover:shadow-green-900/5 transition-all hover:-translate-y-2 group"
            >
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-4xl mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                {pillar.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{pillar.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg font-light">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}