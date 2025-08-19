// src/components/SkillCard.jsx
import React, { useState, useEffect } from 'react';

export default function SkillCard({ name, logo, proficiency }) {

    const [animatedProficiency, setAnimatedProficiency] = useState(0);
    const [isHovered, setIsHovered] = useState(false);


    useEffect(() => {      

        if (isHovered) {
            setAnimatedProficiency(proficiency);
        } else {
          
            setAnimatedProficiency(0);
        }

    }, [isHovered, proficiency]);

   const strokeDashoffset = 280 - (280 * animatedProficiency) / 100;

    return (
        <div className="relative flex flex-col items-center w-48 h-48 sm:w-60 sm:h-60 p-6 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20"
            onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-2 sm:mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Define the gradient here */}
                    <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{stopColor: "#c5f9d7", stopOpacity: 1}} />
                            <stop offset="50%" style={{stopColor: "#f7d486", stopOpacity: 1}} />
                            <stop offset="100%" style={{stopColor: "#f27a7d", stopOpacity: 1}} />
                        </linearGradient>
                    </defs>

                    <circle 
                        className="text-gray-700"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"  
                        r="45"
                        cx="50"
                        cy="50"
                        strokeLinecap="round"
                    />
                    {/* Apply the gradient to the progress circle's stroke */}
                    <circle
                        strokeWidth="10"
                        stroke="url(#progressGradient)" 
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                        strokeLinecap="round"
                        style={{
                            strokeDasharray: 280,
                            strokeDashoffset: strokeDashoffset,
                            transition: 'stroke-dashoffset 0.5s ease-in-out'
                        }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <img src={logo} alt={`${name} Logo`} className="w-1/2 h-1/2" />
                </div>
            </div>
            
            {/* Skill Name */}
            <span className="text-base sm:text-lg font-semibold text-center">{name}</span>
            <span className="text-xs sm:text-sm text-gray-400 mt-1">{proficiency}%</span>
        </div>
    );
}