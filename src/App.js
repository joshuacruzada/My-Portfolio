import './App.css';
import Hero from "./components/Hero";
import About from './components/About'; 
import Particles from './components/Particles/Particles';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Experiences from './components/Experiences';
import Skills from './components/Skills'
import Certifications from './components/Certifications';
import Contact from './components/Contact';
function App() {
 return (
    <div className="relative min-h-screen bg-black">
      {/* This is the single, full-page background effect */}
      <div className="fixed inset-0 z-0">
        <Particles
          particleColors={["#ffffff", "#ffffff", "#ffffff"]}
          particleCount={700}
          particleSpread={10}
          speed={0.10}
          particleBaseSize={200}
          sizeRandomness={2}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
          className="w-full h-full"
        />
      </div>

      <Navbar />

      <div className="relative z-10">
        <Hero />
        <About />
        <Projects /> 
        <Experiences /> 
        <Skills /> 
        <Certifications />
        <Contact/>
      </div>
    </div>
  );
}

export default App;
