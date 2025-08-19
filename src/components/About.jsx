// src/components/About.jsx
import React from 'react';

export default function About() {
  return (
    <section id="about" className="relative w-full min-h-screen flex items-center justify-center py-16 px-4">
      {/* Container for content, centered and with max width */}
      <div 
        className="container mx-auto max-w-4xl p-6 rounded-lg shadow-xl bg-white/10 backdrop-blur-md border border-white/20 text-white"
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-white">
          About Me
        </h2>
        
        {/* About Me content */}
        <div className="text-lg space-y-4">
          <p>
            Hi, I'm <span className="font-semibold text-amber-400">Joshua</span>, a 24-year-old IT graduate from the Technological University of the Philippines - Manila, where I graduated Cum Laude and made the Dean's List multiple times. I've always loved building projects whether it's creating websites, apps, or backend systems that solve real problems.
          </p>
          <p>
            I enjoy exploring different areas of tech like data engineering, cloud computing, cybersecurity, networking, design, and backend development. For me, every project is a chance to learn something new and expand my skills. My favorite so far is a full Ordering and Inventory System, where I worked on both the design and coding. I'm always curious, always experimenting, and always looking for ways to grow as a developer.
          </p>
        </div>
      </div>
    </section>
  );
}