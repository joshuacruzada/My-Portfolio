import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = (
    <>
      <a href="#home" className="block lg:inline-block bg-transparent text-white px-3 py-2 rounded-lg shadow hover:text-amber-500 hover:scale-110 transition duration-300" onClick={toggleMenu}>Home</a>
      <a href="#about" className="block lg:inline-block bg-transparent text-white px-3 py-2 rounded-lg shadow hover:text-amber-500 hover:scale-110 transition duration-300" onClick={toggleMenu}>About</a>
      <a href="#projects" className="block lg:inline-block bg-transparent text-white px-3 py-2 rounded-lg shadow hover:text-amber-500 hover:scale-110 transition duration-300" onClick={toggleMenu}>Projects</a>
      <a href="#experiences" className="block lg:inline-block bg-transparent text-white px-3 py-2 rounded-lg shadow hover:text-amber-500 hover:scale-110 transition duration-300" onClick={toggleMenu}>Experience</a>
      <a href="#skills" className="block lg:inline-block bg-transparent text-white px-3 py-2 rounded-lg shadow hover:text-amber-500 hover:scale-110 transition duration-300" onClick={toggleMenu}>Skills&Tools</a>
      <a href="#certification" className="block lg:inline-block bg-transparent text-white px-3 py-2 rounded-lg shadow hover:text-amber-500 hover:scale-110 transition duration-300" onClick={toggleMenu}>Certification</a>
      <a href="#contact" className="block lg:inline-block bg-transparent text-white px-3 py-2 rounded-lg shadow hover:text-amber-500 hover:scale-110 transition duration-300" onClick={toggleMenu}>Contact</a>
    </>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden lg:block">
        <div className="flex justify-center space-x-4 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
          {navLinks}
        </div>
      </div>

      {/* Mobile Hamburger Menu Button */}
      <div className="fixed top-4 right-4 z-50 lg:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>


      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-90 z-40 flex flex-col items-center justify-center space-y-8 lg:hidden">
          <div className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          {navLinks}
        </div>
      )}
    </>
  );
}
