import { useCollection } from "../../hooks/useCollection";
import Section from "../ui/Section";

const Skills = () => {
    const { documents: skills, error } = useCollection("skills");

    // Fallback data if DB is empty for demo purposes (optional, or just show loading)
    // For now, let's just handle loading/empty.

    return (
        <Section id="skills" title="Technical Arsenal" className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {error && <p className="text-red-500">Failed to load skills.</p>}
            {!skills && !error && <p className="text-gray-500 dark:text-gray-400 font-mono">Loading skills...</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skills && skills.map((category) => (
                    <div key={category.id} className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-6 hover:border-black dark:hover:border-white transition-all duration-300">
                        <h3 className="text-lg font-mono font-bold mb-4 border-b border-gray-100 dark:border-gray-800 pb-2 text-gray-900 dark:text-white">
                            {category.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {category.items && category.items.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 px-3 py-1 text-sm font-mono border border-gray-100 dark:border-gray-800"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
                {skills && skills.length === 0 && (
                    <p className="text-gray-400 italic">No skills added yet.</p>
                )}
            </div>
        </Section>
    );
};

export default Skills;
