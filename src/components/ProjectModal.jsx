// src/components/ProjectModal.jsx
import React, { useState } from 'react';
import Slider from 'react-slick';
import { FaTimes } from 'react-icons/fa';

export default function ProjectModal({ project, onClose }) {
  const [expandedMedia, setExpandedMedia] = useState(null);

  if (!project) return null;

  // Ensure media is always an array
  const mediaToDisplay = Array.isArray(project.media) ? project.media : [project.media];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const getLogoForTool = (tool) => {
    switch (tool) {
      case "React":
        return '/Logo/React.png';
      case "HTML":
        return '/Logo/HTML5.png';
      case "CSS":
        return '/Logo/CSS3.png';
      case "Firebase":
        return '/Logo/Firebase.png';
      case "GitHub":
        return '/Logo/Github.png';
      case "Figma":
        return '/Logo/Figma.png';
      case "Unity":
        return '/Logo/Unity.png';
      case "C#":
        return '/Logo/Csharp.png';
      case "Java":
        return '/Logo/Java.png';
      case "Java Script":
        return '/Logo/JavaScript.png';
      default:
        return null;
    }
  };

  const isVideo = (mediaPath) => {
    return mediaPath && (mediaPath.endsWith('.mp4') || mediaPath.endsWith('.webm') || mediaPath.endsWith('.ogg'));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-white rounded-lg p-6 max-w-3xl w-full max-h-[70vh] overflow-y-auto relative hide-scrollbar"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition duration-300"
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-0 text-center text-amber-500">{project.title}</h2>
        <h3 className="text-l font-medium text-center text-gray-300 mb-6">{project.subtitle}</h3>

        {project.tools && project.tools.languages && (
          <div className="flex flex-col items-center justify-center mb-6">
            <h4 className="text-l font-semibold text-gray-200 mb-2">Tools & Languages</h4>
            <div className="flex space-x-4">
              {project.tools.languages.map(lang => (
                <div key={lang} className="flex flex-col items-center">
                  <img src={getLogoForTool(lang)} alt={`${lang} Logo`} className="w-8 h-8" />
                  <span className="text-xs mt-1">{lang}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          {/* Use mediaToDisplay, which is now guaranteed to be an array */}
          <Slider {...sliderSettings} className="modal-slider">
            {mediaToDisplay.map((mediaUrl, index) => (
              <div key={index} className="px-2">
                {isVideo(mediaUrl) ? (
                  <video
                    src={mediaUrl}
                    controls
                    className="w-full h-80 object-contain cursor-pointer"
                    onClick={() => setExpandedMedia(mediaUrl)}
                  />
                ) : (
                  <img
                    src={mediaUrl}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-80 object-contain cursor-pointer"
                    onClick={() => setExpandedMedia(mediaUrl)}
                  />
                )}
              </div>
            ))}
          </Slider>
        </div>

        <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-wrap mt-12 mb-8">{project.description}</p>

        {project.link && (
          <div className="text-center">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:text-amber-400 font-semibold transition duration-300"
            >
              {project.link.includes('figma') ? 'View Figma Prototype' : 'View Live Demo / Repository'}
            </a>
          </div>
        )}

        {/* --- EXPANDED MEDIA MODAL --- */}
        {expandedMedia && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={() => setExpandedMedia(null)}>
            {isVideo(expandedMedia) ? (
              <video
                src={expandedMedia}
                controls
                autoPlay
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <img
                src={expandedMedia}
                alt="Expanded view"
                className="max-w-full max-h-full object-contain"
              />
            )}
            <button
              onClick={() => setExpandedMedia(null)}
              className="absolute top-4 right-4 text-white hover:text-amber-500 transition duration-300"
            >
              <FaTimes size={32} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}