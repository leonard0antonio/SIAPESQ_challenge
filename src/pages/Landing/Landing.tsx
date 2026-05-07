// Página de destino do projeto, composta por várias seções que apresentam a proposta, os pilares, o impacto e um convite para acessar o catálogo de espécies. Cada seção é implementada como um componente separado, utilizando a biblioteca Framer Motion para criar animações suaves e envolventes. A estrutura da página é organizada de forma a guiar os usuários através da narrativa do projeto, destacando seus objetivos e resultados de maneira clara e visualmente atraente.

import { LandingHeader } from "./Components/LandingHeader";
import { HeroSection } from "./Components/HeroSection";
import { PillarsSection } from "./Components/PillarsSection";
import { AboutSection } from "./Components/AboutSection";
import { ImpactSection } from "./Components/ImpactSection";
import { CtaSection } from "./Components/CtaSection";
import { LandingFooter } from "./Components/LandingFooter";

export function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-green-200">
      <LandingHeader />
      
      <main>
        {/* A Capa Inicial */}
        <HeroSection />
        
        {/* Os três pilares de missão */}
        <PillarsSection />
        
        {/* A secção sobre com a foto da arara */}
        <AboutSection />
        
        {/* A faixa verde com números de impacto */}
        <ImpactSection />
        
        {/* O convite final para aceder ao sistema */}
        <CtaSection />
      </main>
      
      <LandingFooter />
    </div>
  );
}