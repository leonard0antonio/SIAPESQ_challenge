// Componente de seção "Call to Action", responsável por incentivar os usuários a acessarem o catálogo de espécies. Ele utiliza a biblioteca Framer Motion para animar a entrada dos elementos, criando uma experiência visualmente atraente. A seção inclui um título chamativo, uma descrição persuasiva e um botão estilizado que direciona os usuários para a plataforma, reforçando a importância da participação na comunidade de observadores de espécies.

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function CtaSection() {
  return (
    <section className="py-32 bg-white relative">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-gray-900 mb-6"
        >
          Pronto para explorar o <span className="text-green-600">Catálogo</span>?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-500 mb-10 font-light"
        >
          Junte-se ao SIAPESQ, visualize o mapa interativo e contribua para a nossa base de dados adicionando novas observações.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link 
            to="/catalogo" 
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gray-900 text-white font-bold rounded-full hover:bg-green-600 transition-colors shadow-xl hover:shadow-green-600/30 text-lg group"
          >
            Acessar Plataforma Agora
            <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}