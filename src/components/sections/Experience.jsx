import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import Section from "../ui/Section";
import { ChevronDown, ChevronUp } from "lucide-react";

const Experience = () => {
    const { documents: experiences, error } = useCollection("experience", ["order", "desc"]);
    const [expanded, setExpanded] = useState(false);

    const LIMIT = 3;
    const displayedExperience = experiences
        ? (expanded ? experiences : experiences.slice(0, LIMIT))
        : [];

    return (
        <Section id="experience" title="Professional Journey" className="bg-white dark:bg-gray-950 transition-colors duration-300">
            {error && <p className="text-red-500">Failed to load experience.</p>}
            {!experiences && !error && <p className="text-gray-500 dark:text-gray-400 font-mono">Loading timeline...</p>}

            <div className="relative border-l border-gray-200 dark:border-gray-800 ml-3 md:ml-6 space-y-12 transition-colors duration-300">
                {displayedExperience.map((job) => (
                    <div key={job.id} className="relative pl-8 md:pl-12 group">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-black dark:bg-white border border-white dark:border-gray-950 ring-4 ring-white dark:ring-gray-950 transition-all duration-300" />

                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                            <h3 className="text-xl font-bold font-mono text-gray-900 dark:text-white transition-colors duration-300">{job.title}</h3>
                            <span className="text-sm font-mono text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 px-2 py-1 border border-gray-100 dark:border-gray-800 transition-colors duration-300">
                                {job.period}
                            </span>
                        </div>

                        <div className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-300">{job.company}</div>

                        <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-400 font-sans transition-colors duration-300">
                            <p className="whitespace-pre-line">{job.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {experiences && experiences.length > LIMIT && (
                <div className="mt-12 flex justify-center">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="btn-sharp border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white flex items-center gap-2 text-gray-900 dark:text-white transition-all"
                    >
                        {expanded ? (
                            <>Show Less <ChevronUp size={16} /></>
                        ) : (
                            <>Show Full History <ChevronDown size={16} /></>
                        )}
                    </button>
                </div>
            )}

            {experiences && experiences.length === 0 && (
                <p className="pl-8 text-gray-400 italic">No experience added yet.</p>
            )}
        </Section>
    );
};

export default Experience;
