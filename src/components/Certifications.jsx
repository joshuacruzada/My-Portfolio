import React, { useState, useEffect, useRef } from 'react';
import { IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons-react';

const certificationsData = [
    {
        id: 1,
        title: "Guardians of the Digital Realm: Navigating the Frontier of Cybersecurity and Information Security",
        issuer: "Technological University of the Philippines - Manila",
        description: "This is a certification of participation in the seminar on cybersecurity and information security held on January 15, 2024. The seminar focused on fundamental concepts and best practices for navigating the digital landscape, highlighting the importance of protecting data and systems from emerging threats.",
        image: "/Pictures/Certificate 1.jpg",
    }
];

const Card = ({ certification, isTop, isNext, isPrev, onClick }) => {
    const cardClass = isTop
        ? `transform transition-transform duration-500`
        : isNext
        ? `transform translate-x-full opacity-0`
        : isPrev
        ? `transform -translate-x-full opacity-0`
        : `transform scale-95 opacity-50 -translate-y-2 pointer-events-none`;

    return (
        <div 
            onClick={onClick}
            className={`
                absolute w-full h-full p-6 md:p-8 cursor-pointer
                rounded-3xl shadow-xl
                bg-white/10 backdrop-blur-md border border-white/20
                flex flex-col items-center justify-center text-center
                card-static-glow hover:scale-105 transition-all duration-300
                ${cardClass}
            `}
            style={{
                zIndex: isTop ? 3 : isNext || isPrev ? 2 : 1,
            }}
        >
            {/* Adjusted image size for both mobile and desktop */}
            <img src={certification.image} alt={certification.title} className="w-80 h-80 object-contain mb-4 rounded-lg md:w- md:h-96" />
            <h3 className="text-sm md:text-2xl font-bold text-white mb-2">{certification.title}</h3>
            <p className="text-xs md:text-base text-gray-300 mb-4">{certification.issuer}</p>
            <p className="text-xs md:text-sm text-amber-500 mt-auto drop-shadow-lg">Click me to see more</p>
        </div>
    );
};

const Modal = ({ certification, onClose }) => {
    const [showFullImage, setShowFullImage] = useState(false);

    // Effect to prevent scrolling on the body when the modal is open
    useEffect(() => {
        if (certification) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [certification]);

    if (!certification) return null;

    return (
        // Added onClick to close modal by clicking outside
        <div 
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
            <div 
                
                onClick={(e) => e.stopPropagation()}
                className="relative p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg max-w-3xl w-full text-center"
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-white hover:text-amber-500 transition"
                >
                    <IconX size={24} />
                </button>

                {!showFullImage ? (
                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
                        <img 
                            src={certification.image} 
                            alt={certification.title} 
                            className="w-48 h-48 object-contain rounded-lg flex-shrink-0" 
                        />
                        <div className="flex flex-col">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{certification.title}</h3>
                            <p className="text-lg md:text-xl text-gray-300 mb-4">{certification.issuer}</p>
                            <p className="text-sm md:text-base text-gray-400 leading-relaxed">{certification.description}</p>
                            <button
                                onClick={() => setShowFullImage(true)}
                                className="mt-6 inline-block bg-white/20 text-white px-4 py-2 rounded-full transition hover:bg-white/30 self-center md:self-start"
                            >
                                View Certificate
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <button 
                            onClick={() => setShowFullImage(false)} 
                            className="absolute top-4 right-4 text-white hover:text-amber-500 transition"
                        >
                            <IconX size={24} />
                        </button>
                        {/* Adjusted class for landscape view */}
                        <img src={certification.image} alt={certification.title} className="max-w-full max-h-full object-contain aspect-video" />
                    </div>
                )}
            </div>
        </div>
    );
};


export default function Certifications() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedCert, setSelectedCert] = useState(null);
    const cardStackRef = useRef(null);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % certificationsData.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + certificationsData.length) % certificationsData.length);
    };
    
    const openModal = (cert) => {
        setSelectedCert(cert);
    };

    const closeModal = () => {
        setSelectedCert(null);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                handlePrev();
            } else if (event.key === 'ArrowRight') {
                handleNext();
            }
        };

        const handleTouchStart = (e) => {
            if (e.touches.length === 1) {
                cardStackRef.current.touchStartX = e.touches[0].clientX;
            }
        };

        const handleTouchEnd = (e) => {
            if (e.changedTouches.length === 1 && cardStackRef.current.touchStartX) {
                const touchEndX = e.changedTouches[0].clientX;
                const deltaX = touchEndX - cardStackRef.current.touchStartX;
                if (deltaX > 50) {
                    handlePrev();
                } else if (deltaX < -50) {
                    handleNext();
                }
                cardStackRef.current.touchStartX = null;
            }
        };

        const cardStackElement = cardStackRef.current;
        if (cardStackElement) {
            cardStackElement.addEventListener('touchstart', handleTouchStart);
            cardStackElement.addEventListener('touchend', handleTouchEnd);
        }
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            if (cardStackElement) {
                cardStackElement.removeEventListener('touchstart', handleTouchStart);
                cardStackElement.removeEventListener('touchend', handleTouchEnd);
            }
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentIndex]);

    return (
        <section id="certification" className="min-h-screen p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-center lg:items-center lg:justify-center gap-12">
            {/* Left side: Title and Description */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/2">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                    Certifications
                </h2>
                <p className="text-lg text-gray-400 max-w-lg mb-8">
                    My certifications are a testament to my dedication and continuous learning. They include accomplishments from seminars and coursework during my college years, and I'm actively pursuing more to expand my knowledge and foster my professional growth.
                </p>
            </div>
            
            {/* Right side: Certification Card and Navigation */}
            <div className="flex flex-col items-center lg:items-center w-full lg:w-1/2">
                <div className="relative w-full h-[450px] lg:h-[500px] lg:w-full" ref={cardStackRef}>
                    {certificationsData.map((cert, index) => {
                        const isTop = index === currentIndex;
                        const isNext = index === (currentIndex + 1) % certificationsData.length;
                        const isPrev = index === (currentIndex - 1 + certificationsData.length) % certificationsData.length;
                        return (
                            <Card
                                key={cert.id}
                                certification={cert}
                                isTop={isTop}
                                isNext={isNext}
                                isPrev={isPrev}
                                onClick={() => openModal(cert)}
                            />
                        );
                    })}
                </div>
                <div className="flex flex-row items-center gap-4 mt-8">
                    <button
                        onClick={handlePrev}
                        className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-200 transition-all duration-300 hover:scale-110 hover:text-amber-500"
                    >
                        <IconChevronLeft size={20} />
                    </button>
                    <span className="text-white text-lg font-medium">{currentIndex + 1}/{certificationsData.length}</span>
                    <button
                        onClick={handleNext}
                        className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-200 transition-all duration-300 hover:scale-110 hover:text-amber-500"
                    >
                        <IconChevronRight size={20} />
                    </button>
                </div>
            </div>
            <Modal certification={selectedCert} onClose={closeModal} />
        </section>
    );
}
