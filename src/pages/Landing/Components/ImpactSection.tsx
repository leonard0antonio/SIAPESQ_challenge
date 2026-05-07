// Componente de seção "Impacto", responsável por destacar as principais métricas e resultados alcançados pelo projeto. Ele utiliza a biblioteca Framer Motion para animar a entrada dos elementos, proporcionando uma experiência visualmente envolvente. A seção apresenta estatísticas relevantes, como o número de estados mapeados, categorias monitoradas, precisão geográfica e disponibilidade, reforçando o impacto positivo do projeto na preservação da biodiversidade.

import { motion } from "framer-motion";

const stats = [
  { number: "27", label: "Estados Mapeados" },
  { number: "4+", label: "Categorias Monitoradas" },
  { number: "100%", label: "Precisão Geográfica" },
  { number: "24/7", label: "Disponibilidade" }
];

export function ImpactSection() {
  return (
    <section className="py-20 bg-green-900 relative overflow-hidden">
      {/* Padrão de fundo subtil */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-green-800/50">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center px-4"
            >
              <h3 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter">
                {stat.number}
              </h3>
              <p className="text-green-300 font-medium uppercase tracking-wider text-xs md:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}