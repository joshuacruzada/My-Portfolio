// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { IconBrandFacebook, IconBrandGithub, IconBrandLinkedinFilled } from '@tabler/icons-react'; // Import the icons
import Lanyard from './Lanyard/Lanyard';
import TextType from './TextType/TextType';

export default function Hero() {
  const [showLanyard, setShowLanyard] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        setShowLanyard(rect.top >= 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex flex-col justify-center items-center p-4 lg:p-0">
      <div className="relative z-10 w-full flex-grow p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-2 items-center justify-center">
        {/* Lanyard */}
        <div className="w-full h-1/2 flex items-center justify-center lg:h-full lg:order-2">
          {showLanyard && <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />}
        </div>
        
        {/* Text content */}
        <div className="flex flex-col items-center text-center p-4 lg:items-start lg:text-left lg:max-w-xl lg:w-full lg:order-1">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-white drop-shadow-lg">
            Hi, I’m{" "}
            <span className="text-white">
              <TextType
                text={["Joshua Cruzada"]}
                typingSpeed={120}
                pauseDuration={900}
                showCursor={true}
                cursorCharacter="|"
              />
            </span>
          </h1>
          <p className="text-sm lg:text-lg text-gray-200 mb-4 max-w-xl drop-shadow-lg">
            IT Graduate / Aspiring Developer
          </p>
          
          <div className="flex gap-4 my-2">
              <a href="https://www.facebook.com/joshua.cruzada.96" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-amber-500 transition ">
                  <IconBrandFacebook size={32} />
              </a>
              <a href="https://github.com/joshuacruzada" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-amber-500 transition ">
                  <IconBrandGithub size={32} />
              </a>
              <a href="https://www.linkedin.com/in/joshua-cruzada-529539340" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-amber-500 transition">
                  <IconBrandLinkedinFilled size={32} />
              </a>
          </div>
          
          <div className="flex gap-4 my-4">
           <a
                  href="/CRUZADA_JOSHUA-CV.pdf"
                  download="CRUZADA_JOSHUA-CV.pdf"
                  className="
                              relative
                              px-4 py-2 lg:px-6 lg:py-3 rounded-lg shadow-lg
                            text-gray-800 font-medium
                            bg-white/10 backdrop-blur-md border border-white/20
                              transition-all duration-300
                              hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20
                              hover:bg-gradient-to-r from-sky-300 to-yellow-200
                            hover:text-gray-500
                             glowing-button
                            "
           >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}