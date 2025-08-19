// src/components/Experiences.jsx
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import ExperienceCard from './ExperienceCard';
import ProjectModal from './ProjectModal';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Experiences() {
  const experiencesData = [
    {
      id: 1,
      title: "OJT - Technical Support Hardware",
      subtitle: "Zenshin Systems Corporation",
      media: [
        "/Videos/ojt3.mp4",
        "/Videos/ojt1.mp4",
        "/Videos/ojt2.mp4",
        "/Pictures/OJT.jpg",
      ],
      description: "As a Technical Support Hardware intern, my tasks involved a variety of hardware-related activities, including the unboxing, packaging, and removal of SSDs and memory from computer units. I also performed BIOS updates and checked unit specifications. Additionally, I assisted in assembling and disassembling units, installing TP-Link PCI network adapters, and conducting quality assurance on hardware components.",
    },
    {
      id: 2,
      title: "Freelance Web Developer",
      subtitle: "Provided web development services to various clients, including building responsive websites and implementing custom features.",
      media: ["/images/freelance_placeholder.jpg"],
      description: "This is a placeholder for a freelance experience.",
    },
    {
      id: 3,
      title: "Open Source Contributions",
      subtitle: "Contributed to several open-source projects on platforms like GitHub, focusing on bug fixes and feature enhancements.",
      media: ["/videos/opensource_demo.mp4"],
      description: "This is a placeholder for an open-source experience.",
    },
    {
      id: 4,
      title: "UI/UX Designer",
      subtitle: "Designed user interfaces for mobile and web applications, ensuring a clean and intuitive user experience.",
      media: ["/images/ui_ux_placeholder.jpg"],
      description: "This is a placeholder for a UI/UX design experience.",
    },
  ];

  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Effect to prevent scrolling on the body when the modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to restore scrolling when the component unmounts or dependency changes
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const handleExperienceClick = (experience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExperience(null);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    afterChange: (index) => setCurrentSlideIndex(index),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <section id="experiences" className="relative min-h-screen py-24 px-4 text-white flex items-center justify-center">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-1/2 md:pr-16 mb-8 md:mb-0 md:pl-8">
            <h2 className="text-7xl font-bold mb-4 text-center md:text-left">
              Experiences
            </h2>
            <h3 className="text-2xl font-semibold mb-2 text-center md:text-left text-amber-500">
              {experiencesData[currentSlideIndex].title}
            </h3>
            <p className="text-gray-300 text-xl text-center md:text-left">
              {experiencesData[currentSlideIndex].subtitle}
            </p>
          </div>
          <div className="w-full md:w-1/2 relative px-2">
            <Slider {...sliderSettings} className="experience-slider">
              {experiencesData.map((experience) => {
                const thumbnailMedia = Array.isArray(experience.media)
                  ? experience.media[0] 
                  : experience.media;

                return (
                  <ExperienceCard
                    key={experience.id}
                    experience={{ ...experience, media: thumbnailMedia }}
                    onClick={() => handleExperienceClick(experience)}
                  />
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
      {isModalOpen && selectedExperience && (
        <ProjectModal
          project={selectedExperience}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}
