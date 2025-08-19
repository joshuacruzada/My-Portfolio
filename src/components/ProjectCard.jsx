// src/components/ProjectCard.jsx
import React from 'react';

export default function ProjectCard({ project, onClick }) {
  const isVideo = (mediaPath) => {
    return mediaPath && (mediaPath.endsWith('.mp4') || mediaPath.endsWith('.webm') || mediaPath.endsWith('.ogg'));
  };

  return (
    <div
      className="transform transition duration-300 hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg overflow-hidden">
          <div className="relative w-full h-48 bg-gray-700 flex items-center justify-center">
            {isVideo(project.media) ? (
              <video
                src={project.media}
                alt={project.title}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={project.media}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
            
            <div className="absolute inset-0 bg-amber-500 bg-opacity-55 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-lg font-bold">{project.title}</span>
            </div>
          </div>
          <div className="p-4 text-white text-center">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="text-sm text-gray-400">{project.subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}