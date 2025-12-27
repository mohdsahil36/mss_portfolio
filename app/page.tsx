import Hero from "./components/sections/Hero";
import Work from "./components/sections/Work";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import Projects from "./components/sections/Projects";
import { SafeMovingLabels } from "./components/SafeMovingLabels";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <Work />
        <Projects />
        <Skills />
        <SafeMovingLabels
          labels={[
            "Execution",
            "Ownership",
            "Stable",
            "Scalable",
            "Practical",
            "Dependable",
          ]}
          speed="fast"
        />
        <Contact />
      </main>
    </div>
  );
}
