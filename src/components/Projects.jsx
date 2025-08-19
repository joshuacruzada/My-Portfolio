// src/components/Projects.jsx
import React, { useState, useRef } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const projectsData = [
    {
      id: 1,
      title: "Delhai Medical Enterprise",
      subtitle: "Ordering and Inventory System",
      media: [
        "/system screenshot/LandingPage.png",
        "/system screenshot/DASHBOARD.jpg",
        "/system screenshot/PRODUCTLIST.jpg",
        "/system screenshot/CREATE ORDER.jpg",
        "/system screenshot/INVENTORY MANAGEMENT.jpg",
        "/system screenshot/ADD NEW PRODUCT.jpg",
        "/system screenshot/AUDIT TRAIL.jpg",
        "/system screenshot/INVOICE LIST.jpg",
        "/system screenshot/LOW STOCKS.jpg",
        "/system screenshot/ORDER HISTORY.jpg",
        "/system screenshot/OUT OF STOCKS.jpg",
        "/system screenshot/REPORTS AND ANALYTICS.jpg",
        "/system screenshot/SETTINGS.jpg",
        "/system screenshot/STOCK HISTORY IN AND OUT.jpg",
        "/system screenshot/TOTAL STOCKS.jpg",
      ],
      tools: {
        languages: ["React", "HTML", "CSS", "Java Script", "Firebase", "GitHub"],
      },
      description: "An inventory and ordering system for a medical company to manage sales, track stock levels, and ease the overall workflow of daily operations. It includes features for real-time sales monitoring and report generation.",
      link: "https://delhai.vercel.app/",
    },
    {
      id: 2,
      title: "Coffee App UI/UX Design",
      subtitle: "Figma Prototype",
      media: [
        "/Prototype/prototype1.png",
        "/Prototype/prototype2.png",
        "/Prototype/prototype3.png",
        "/Prototype/prototype4.png",
        "/Prototype/prototype5.png",
      ],
      tools: {
        languages: ["Figma"]
      },
      description: "A mobile UI/UX design prototype for a coffee ordering app, created using Figma. This project focuses on a clean and intuitive user interface to enhance the user experience for ordering drinks.",
      link: "https://www.figma.com/design/0tBTxzpC6pSon4tnvdrXZ8/CRUZADA_PROTOTYPE?node-id=9-498&t=qUKhdWigm5HPJ4bX-1",
    },
    {
      id: 3,
      title: "Sneak",
      subtitle: "E-Commerce Platform",
      media: ["/Videos/MyProjDemo.mp4"],
      tools: {
        languages: ["React", "HTML", "CSS", "Java", "Java Script", "GitHub"],
      },
      description: "Sneak is a full-stack e-commerce platform designed to mimic an online shoe store. The application features full CRUD (Create, Read, Update, Delete) functionality, allowing administrators to manage product listings, inventory, and customer orders. Users can browse products, add items to a shopping cart, and proceed through a secure checkout process. The platform also includes user authentication for a personalized shopping experience.",
    },
    {
      id: 4,
      title: "Pandemic Dodger:",
      subtitle: "Game Development",
      media: ["/Videos/GameDev.mp4"],
      tools: {
        languages: ["Unity", "C#"],
      },
      description: "Pandemic Dodger is a mobile game built with Unity and C# that combines intuitive gameplay with a timely theme. The player controls a doctor character flying on a syringe, whose goal is to dodge incoming viruses. As the game progresses, the difficulty increases as the speed of the viruses accelerates. To help the player, the game includes various good viruses that act as power-ups, providing temporary shields or other beneficial effects. The objective is to survive for as long as possible.",
    },
  ];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
  };

  const handlePrev = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + projectsData.length) % projectsData.length);
  };

  // New touch handlers for swiping
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const swipeDistance = touchStartX.current - touchEndX.current;

    // A minimum swipe distance to trigger a slide
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance) {
      // Swiped left, go to next card
      handleNext();
    } else if (swipeDistance < -minSwipeDistance) {
      // Swiped right, go to previous card
      handlePrev();
    }
  };

  return (
    <section id="projects" className="relative min-h-screen py-24 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <h2 className="text-5xl font-bold mb-4 text-center text-white">
          Projects & Activities
        </h2>
        {/* Added a description below the title */}
        <p className="mb-5 text-center text-lg text-gray-300 max-w-2xl mx-auto">
          Here you can explore my projects, including web development and design, game development, and other activities that demonstrate my skills and passion for building.
        </p>

        {/* Container with touch events */}
        <div
          className="relative flex items-center justify-center h-[350px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {projectsData.map((project, index) => {
            const isPrev = index === (currentCardIndex - 1 + projectsData.length) % projectsData.length;
            const isNext = index === (currentCardIndex + 1) % projectsData.length;
            const isActive = index === currentCardIndex;

            let cardClass = "absolute transition-all duration-500 ease-in-out";

            if (isActive) {
              cardClass += " z-30 transform scale-[1.1] opacity-100";
            } else if (isPrev) {
              cardClass += " z-20 transform scale-[0.95] translate-x-[-200px] opacity-70";
            } else if (isNext) {
              cardClass += " z-20 transform scale-[0.95] translate-x-[200px] opacity-70";
            } else {
              cardClass += " z-10 transform scale-80 opacity-0";
            }

            return (
              <div key={project.id} className={cardClass}>
                <ProjectCard
                  project={{ ...project, media: project.media[0] }}
                  onClick={() => handleProjectClick(project)}
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-center space-x-2">
          <button
            onClick={handlePrev}
            className="bg-white/10 text-white rounded-full p-2.5 hover:bg-white/20 transition-colors duration-300 z-40"
            aria-label="Previous project"
          >
            <FaChevronLeft size={20} />
          </button>
          <div className="text-sm self-center">
            {currentCardIndex + 1} / {projectsData.length}
          </div>
          <button
            onClick={handleNext}
            className="bg-white/10 text-white rounded-full p-2.5 hover:bg-white/20 transition-colors duration-300 z-40"
            aria-label="Next project"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>
      {isModalOpen && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}