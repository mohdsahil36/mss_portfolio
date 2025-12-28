import Hero from "./components/sections/Hero";
import Work from "./components/sections/Work";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import Projects from "./components/sections/Projects";
import { SafeMovingLabels } from "./components/SafeMovingLabels";
import { SectionSeparator } from "./components/section-separator";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <SectionSeparator />
        <Work sectionIndex={0} />
        <SectionSeparator />
        <Projects sectionIndex={1} />
        <SectionSeparator />
        <Skills sectionIndex={2} />
        <SectionSeparator />
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
