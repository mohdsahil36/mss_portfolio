import Hero from "./components/sections/Hero";
import Work from "./components/sections/Work";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import Projects from "./components/sections/Projects";
import Education from "./components/sections/Education";
import BeyondCode from "./components/sections/BeyondCode";
import Specialization from "./components/sections/Specialization";
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
        <Specialization sectionIndex={3} />
        <Education sectionIndex={4} />
        <BeyondCode sectionIndex={5} />
        <Contact sectionIndex={6} />
      </main>
    </div>
  );
}
