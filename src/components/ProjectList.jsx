import React, { useState, useEffect } from 'react';
import CardProject from './CardProject';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProjectList = ({ showAll, initialItems }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('https://67237059493fac3cf24ae02b.mockapi.io/portfolio');
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                setProjects(data);
                console.log(data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching projects:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const displayedProjects = showAll ? projects : projects.slice(0, initialItems);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                Error loading projects: {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto flex justify-center items-center overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                    <div
                        key={project.id || index}
                        data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                        data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    >
                        <CardProject
                            Img={project.Img}
                            Title={project.Title}
                            Description={project.Description}
                            Link={project.Link}
                            id={project.id}
                            TechStack={project.TechStack}
                            Github={project.github}
                            Features={project.Features}

                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectList; 