import { useCollection } from "../../hooks/useCollection";
import Section from "../ui/Section";

const Education = () => {
    const { documents: education, error: eduError } = useCollection("education", ["order", "desc"]);
    const { documents: pubs, error: pubError } = useCollection("publications", ["order", "desc"]);

    return (
        <Section id="education" className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300" title="Academic & Research">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">

                {/* Education Column */}
                <div>
                    <h3 className="text-xl font-mono font-bold uppercase mb-6 text-gray-400 dark:text-gray-500">Education</h3>
                    {eduError && <p className="text-red-500">Failed to load education.</p>}

                    <div className="space-y-8">
                        {education && education.map((edu) => (
                            <div key={edu.id} className="relative pl-6 border-l border-gray-300 dark:border-gray-700">
                                <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                <h4 className="text-lg font-bold font-mono text-gray-900 dark:text-white">{edu.degree}</h4>
                                <div className="text-gray-800 dark:text-gray-300 font-medium">{edu.university}</div>
                                <div className="flex justify-between items-center mt-1 text-sm font-mono text-gray-500 dark:text-gray-400">
                                    <span>{edu.year}</span>
                                    {edu.cgpa && <span className="bg-white dark:bg-gray-800 px-2 py-0.5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">CGPA: {edu.cgpa}</span>}
                                </div>
                                {edu.modules && (
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        <span className="font-semibold text-gray-700 dark:text-gray-300">Key Modules:</span> {edu.modules}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Publications Column */}
                <div>
                    <h3 className="text-xl font-mono font-bold uppercase mb-6 text-gray-400 dark:text-gray-500">Publications</h3>
                    {pubError && <p className="text-red-500">Failed to load publications.</p>}

                    <div className="space-y-6">
                        {pubs && pubs.map((pub) => (
                            <div key={pub.id} className="group">
                                <a
                                    href={pub.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block p-4 border border-transparent hover:border-black dark:hover:border-white hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
                                >
                                    <h4 className="text-base font-bold font-mono text-gray-900 dark:text-white group-hover:underline decoration-1 underline-offset-4">
                                        {pub.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                                        {pub.description}
                                    </p>
                                    <div className="flex items-center gap-2 mt-3 text-xs font-mono text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white">
                                        <span>Read Publication</span>
                                        <span>→</span>
                                    </div>
                                </a>
                            </div>
                        ))}
                        {pubs && pubs.length === 0 && <p className="text-gray-400 italic">No publications listed.</p>}
                    </div>
                </div>

            </div>
        </Section>
    );
};

export default Education;
