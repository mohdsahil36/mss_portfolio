import Hero from "./components/sections/Hero";
import Work from "./components/sections/Work";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import Projects from "./components/sections/Projects";
import { SafeMovingLabels } from "./components/SafeMovingLabels";
import ScrollManager from "./components/ScrollManager";

export default function Home() {
  return (
    <div>
      <main>
        <ScrollManager />
        <Hero />
        <Work sectionIndex={0} />
        <Projects sectionIndex={1} />
        <Skills sectionIndex={2} />
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
        <Contact sectionIndex={3} />
      </main>
    </div>
  );
}
