// src/components/Projects.jsx
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const projectsData = [
    {
      id: 1,
      title: "Delhai Medical Enterprise",
      subtitle: "Ordering and Inventory System",
      // Combine all media into one array
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
      // Combine all media into one array
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
      // Combine all media into one array
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
    <section id="projects" className="relative min-h-screen py-24 px-4 text-white sm:px-8 lg:px-12">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold mb-12 text-center text-white">
          Projects & Activities
        </h2>
        <div className="mx-auto relative max-w-full md:max-w-5xl">
          <Slider {...sliderSettings}>
            {projectsData.map((project) => (
              <ProjectCard
                key={project.id}
                project={{
                  ...project,
                  // Pass only the first media item for the thumbnail
                  media: project.media[0] 
                }}
                onClick={() => handleProjectClick(project)}
              />
            ))}
            
          </Slider>
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
