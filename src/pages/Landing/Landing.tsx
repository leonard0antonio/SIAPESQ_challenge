import { LandingHeader } from "./Components/LandingHeader";
import { HeroSection } from "./Components/HeroSection";
import { PillarsSection } from "./Components/PillarsSection";
import { LandingFooter } from "./Components/LandingFooter";

export function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-green-200">
      <LandingHeader />
      
      <main>
        <HeroSection />
        <PillarsSection />
      </main>
      
      <LandingFooter />
    </div>
  );
}