// src/components/Skills.jsx
import React from 'react';

// You'll create this component in the next step
import SkillCard from './SkillCard';

export default function Skills() {
    const skillsData = {
        'Front-End': [
            { name: 'HTML', logo: '/Logo/HTML5.png', proficiency: 90 },
            { name: 'CSS', logo: '/Logo/CSS3.png', proficiency: 70 },
            { name: 'JavaScript', logo: '/Logo/JavaScript.png', proficiency: 50 },
            { name: 'React', logo: '/Logo/React.png', proficiency: 85 },
            { name: 'Tailwind CSS', logo: '/Logo/Tailwind.png', proficiency: 50 },
        ],
        'Back-End': [
            { name: 'Node.js', logo: '/Logo/NodeJS.png', proficiency: 30 },
            { name: 'Firebase Database', logo: '/Logo/Firebase.png', proficiency: 70 },
        ],
        'Tools & Others': [
            { name: 'Figma', logo: '/Logo/Figma.png', proficiency: 80 },
            { name: 'GitHub', logo: '/Logo/Github.png', proficiency: 70 },
        ],
    };

    return (
        <section id="skills" className="relative py-32 px-8 text-white min-h-screen">
            <div className="container mx-auto px-8">
                <h2 className="text-5xl font-bold mb-12 text-center">Skills & Tools</h2>

                {Object.keys(skillsData).map(category => (
                    <div key={category} className="mb-12">
                        <h3 className="text-3xl font-semibold mb-6 text-center text-amber-500">{category}</h3>
                        {/* Change the grid classes here */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
                            {skillsData[category].map(skill => (
                                <SkillCard
                                    key={skill.name}
                                    name={skill.name}
                                    logo={skill.logo}
                                    proficiency={skill.proficiency}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}