import Hero from "./components/sections/Hero";
import Work from "./components/sections/Work";
import Skills from "./components/sections/Skills";

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <Work />
        <Skills />
      </main>
    </div>
  );
}
