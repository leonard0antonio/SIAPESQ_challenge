import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:w-1/2"
        >
          <span className="text-emerald-700 font-semibold tracking-widest uppercase text-xs mb-4 block">
            Contexto do Projeto
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Tecnologia em prol da nossa <span className="text-emerald-600">Biodiversidade</span>.
          </h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed font-light">
            O Brasil abriga a maior diversidade de fauna do mundo, mas o monitoramento em vastas extensões territoriais é um desafio complexo. O SIAPESQ centraliza esses dados num único ecossistema institucional.
          </p>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed font-light">
            A plataforma permite que biólogos e investigadores registem ocorrências de forma padronizada, criando um mapa histórico que orienta políticas públicas e esforços de preservação reais.
          </p>
          
          <ul className="space-y-4">
            {['Sistema Governamental Padronizado', 'Monitoramento Georreferenciado', 'Foco na Preservação Ativa'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-800 font-medium text-sm">
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:w-1/2 w-full"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200/50">
            {/* Imagem elegante, sem bordas exageradas */}
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Y7nzgnDzHnNMqG4TPTQ6nGk_iOYieOhZdhzuJYlY29ypdrbRB5Ln6Zliy2F8MFko1FDJAopqXyhnHuDaj5_x90c-pryapjQMtow9OEromJoHfjNKU2S67QfW-9rIkg&s=10&ec=121657068" 
              alt="Arara Vermelha no seu habitat natural" 
              className="w-full h-[450px] object-cover"
            />
            {/* Faixa inferior discreta tipo legenda de foto de jornal */}
            <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-sm p-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900 text-sm">Registo em Campo</p>
                <p className="text-gray-500 text-xs">Arara Vermelha (Categoria: Aves)</p>
              </div>
              <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-700">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}