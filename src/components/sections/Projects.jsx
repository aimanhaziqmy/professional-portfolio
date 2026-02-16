import { ExternalLink, Github } from "lucide-react";
import { useCollection } from "../../hooks/useCollection";
import Section from "../ui/Section";

const Projects = () => {
    const { documents: projects, error } = useCollection("projects", ["order", "asc"]);

    return (
        <Section id="projects" title="Featured Projects" className="transition-colors duration-300">
            {error && <p className="text-red-500">Failed to load projects.</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects && projects.map((project) => (
                    <div
                        key={project.id}
                        className="group border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-black dark:hover:border-white transition-all duration-300 flex flex-col h-full"
                    >
                        {project.image && (
                            <div className="aspect-video w-full overflow-hidden border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        )}

                        <div className="p-6 flex-grow flex flex-col">
                            <h3 className="text-xl font-bold font-mono mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 font-light text-sm flex-grow">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tech_stack && project.tech_stack.map((tech, idx) => (
                                    <span key={idx} className="text-xs font-mono bg-gray-50 dark:bg-gray-800 px-2 py-1 text-gray-500 dark:text-gray-300 border border-gray-100 dark:border-gray-700">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 mt-auto">
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 text-sm font-mono hover:underline text-gray-900 dark:text-white"
                                    >
                                        Live Demo <ExternalLink size={14} />
                                    </a>
                                )}
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 text-sm font-mono hover:underline text-gray-900 dark:text-white"
                                    >
                                        Code <Github size={14} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {projects && projects.length === 0 && (
                <p className="text-gray-400 italic">No projects added yet.</p>
            )}
        </Section>
    );
};

export default Projects;
