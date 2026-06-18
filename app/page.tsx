import Hero from "./components/sections/Hero";
import Work from "./components/sections/Work";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import Projects from "./components/sections/Projects";
import Education from "./components/sections/Education";
import BeyondCode from "./components/sections/BeyondCode";
import Specialization from "./components/sections/Specialization";
import Impact from "./components/sections/Impact";
import ScrollManager from "./components/ScrollManager";

export default function Home() {
  return (
    <div>
      <main>
        <ScrollManager />
        <Hero />
        <Work sectionIndex={0} />
        <Impact sectionIndex={1} />
        <Projects sectionIndex={2} />
        <Skills sectionIndex={3} />
        <Specialization sectionIndex={4} />
        <Education sectionIndex={5} />
        <BeyondCode sectionIndex={6} />
        <Contact sectionIndex={7} />
      </main>
    </div>
  );
}
