import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Lado do Texto */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:w-1/2"
        >
          <span className="text-green-600 font-bold tracking-widest uppercase text-sm mb-4 block">
            O Projeto SIAPESQ
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Tecnologia a favor da nossa <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500">Fauna</span>.
          </h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed font-light">
            O Brasil abriga a maior biodiversidade do mundo, mas muitas espécies enfrentam ameaças diárias. O SIAPESQ nasceu da necessidade de centralizar dados de observação da vida selvagem num único ecossistema tecnológico.
          </p>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed font-light">
            A nossa plataforma capacita biólogos, investigadores e cidadãos a registarem ocorrências, alimentando um mapa inteligente que orienta políticas públicas e esforços reais de resgate e conservação.
          </p>
          
          <ul className="space-y-4">
            {['Código Aberto e Transparente', 'Focado na Usabilidade', 'Dados Georreferenciados'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm">✔</div>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Lado da Imagem/Mosaico */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:w-1/2 relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Y7nzgnDzHnNMqG4TPTQ6nGk_iOYieOhZdhzuJYlY29ypdrbRB5Ln6Zliy2F8MFko1FDJAopqXyhnHuDaj5_x90c-pryapjQMtow9OEromJoHfjNKU2S67QfW-9rIkg&s=10&ec=121657068" 
              alt="Arara Vermelha no Brasil" 
              className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-8">
              <div className="text-white">
                <p className="font-bold text-xl mb-1">Mapeamento em Ação</p>
                <p className="text-gray-300 text-sm">Registo fotográfico de Arara Vermelha (Aves).</p>
              </div>
            </div>
          </div>
          
          {/* Elemento Decorativo Flutuante */}
          <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block animate-bounce-slow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">
                🗺️
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Precisão</p>
                <p className="text-gray-900 font-black text-lg">GPS Integrado</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}