import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSliderReady, setIsSliderReady] = useState(false);

  // Effect to prevent scrolling on the body when the modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  // Use a combination of a timeout and a window resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsSliderReady(false);
      setTimeout(() => {
        setIsSliderReady(true);
      }, 100);
    };

    // Initial render delay
    const initialTimer = setTimeout(() => {
      setIsSliderReady(true);
    }, 500);

    // Listen for resize events
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, 
        },
      },
    ],
  };

  return (
    <section id="projects" className="relative min-h-screen py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <h2 className="text-5xl font-bold mb-12 text-center text-white">
          Projects & Activities
        </h2>
        <div className="w-full relative">
          {isSliderReady ? (
            <Slider {...sliderSettings}>
              {projectsData.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={{
                    ...project,
                    media: project.media[0] 
                  }}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </Slider>
          ) : (
            // You can replace this with a spinner or a skeleton loader
            <div className="text-center">Loading projects...</div>
          )}
        </div>

        {isModalOpen && (
          <ProjectModal
            project={selectedProject}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </section>
  );
}