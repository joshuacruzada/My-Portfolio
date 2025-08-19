// src/components/ExperienceCard.jsx
import React from 'react';

export default function ExperienceCard({ experience, onClick }) {
  const isVideo = (mediaPath) => {
    return mediaPath && (mediaPath.endsWith('.mp4') || mediaPath.endsWith('.webm') || mediaPath.endsWith('.ogg'));
  };

  return (
    <div
      className="p-4 flex justify-center w-full"
      onClick={() => onClick(experience)}
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer w-full md:w-[30rem]">
        <div className="relative w-full h-[12rem] md:h-[20rem] bg-black flex items-center justify-center">
          {isVideo(experience.media) ? (
            <video
              src={experience.media}
              alt={experience.title}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={experience.media}
              alt={experience.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="p-4 text-white text-center">
            <h3 className="text-lg md:text-l font-semibold">{experience.title}</h3>
            <p className="text-xs md:text-sm text-gray-400">{experience.subtitle}</p>
        </div>

      </div>
    </div>
  );
}