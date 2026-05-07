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