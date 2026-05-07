import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  type: "termos" | "privacidade" | null;
  onClose: () => void;
}

export function LegalModal({ isOpen, type, onClose }: Props) {
  if (!isOpen) return null;

  const title = type === "termos" ? "Termos de Uso" : "Política de Privacidade";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-full flex flex-col overflow-hidden"
        >
          {/* Cabeçalho do Documento */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-emerald-600">§</span> {title}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Corpo do Documento com Scroll */}
          <div className="p-6 overflow-y-auto flex-1 text-gray-600 text-sm leading-relaxed space-y-4">
            {type === "termos" ? (
              <>
                <p><strong>1. Aceitação dos Termos</strong><br/>Ao aceder e utilizar o Sistema Integrado de Pesquisa e Fauna Silvestre (SIAPESQ), o utilizador concorda integralmente com as condições aqui estabelecidas. Este sistema é de uso institucional, destinado exclusivamente a fins de conservação, pesquisa e monitoramento ambiental.</p>
                <p><strong>2. Uso da Plataforma</strong><br/>Os dados inseridos no catálogo (incluindo imagens, descrições e coordenadas geográficas) devem ser verídicos e baseados em observações reais em campo. É estritamente proibida a inserção intencional de dados falsos que visem enviesar estatísticas ou prejudicar o mapeamento do ecossistema.</p>
                <p><strong>3. Propriedade Intelectual</strong><br/>A infraestrutura tecnológica, código, design e logótipos do SIAPESQ são propriedade da instituição. Os registos e dados inseridos pelos utilizadores tornam-se parte do banco de dados científico unificado, cedendo os direitos de uso para publicações, estudos ambientais e formulação de políticas públicas.</p>
                <p><strong>4. Obrigações Legais</strong><br/>O utilizador compromete-se a não utilizar a plataforma para facilitar atividades ilícitas, como a caça furtiva, o tráfico de animais silvestres ou o desmatamento ilegal, sob pena de responsabilização civil e criminal segundo as leis ambientais em vigor.</p>
              </>
            ) : (
              <>
                <p><strong>1. Recolha de Dados</strong><br/>O SIAPESQ recolhe informações fornecidas ativamente pelo utilizador no ato do registo de uma espécie, incluindo a localização geográfica (Latitude e Longitude Exatas), datas, imagens enviadas e características descritivas do animal observado.</p>
                <p><strong>2. Finalidade do Tratamento</strong><br/>Os dados recolhidos são tratados e armazenados exclusivamente para o mapeamento populacional de espécies da fauna brasileira, identificação de rotas de migração, deteção de declínio populacional e suporte analítico a entidades de conservação.</p>
                <p><strong>3. Partilha de Informação</strong><br/>Visando o interesse público, o SIAPESQ poderá partilhar os dados estatísticos e geográficos (anonimizados quanto ao autor do registo) com Instituições de Ensino Superior, Organizações Não Governamentais (ONGs) parceiras e órgãos governamentais (ex: IBAMA, ICMBio).</p>
                <p><strong>4. Proteção de Espécies Ameaçadas</strong><br/>Por questões de segurança, alertamos que os registos de localização de espécies classificadas como "Criticamente Ameaçadas" (CR) ou "Em Perigo" (EN) poderão sofrer ofuscação sistémica (perturbação intencional das coordenadas públicas) para evitar que a plataforma sirva de guia para a ação de caçadores ilegais.</p>
              </>
            )}
            
            <p className="pt-6 mt-6 border-t border-gray-100 text-xs text-gray-400 font-medium">
              Documento oficial em vigor atualizado em: Maio de 2026.
            </p>
          </div>

          {/* Botão de Aceite */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
            <button onClick={onClose} className="px-6 py-2.5 bg-emerald-700 text-white font-medium rounded-lg hover:bg-emerald-800 transition-colors shadow-sm">
              Ciente e de Acordo
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}