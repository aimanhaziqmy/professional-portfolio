import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import Section from "../ui/Section";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

const Certifications = () => {
    const { documents: certifications, error } = useCollection("certifications", ["order", "desc"]);
    const [expanded, setExpanded] = useState(false);

    const LIMIT = 3;
    const displayedCerts = certifications
        ? (expanded ? certifications : certifications.slice(0, LIMIT))
        : [];

    return (
        <Section id="certifications" title="Certifications" className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {error && <p className="text-red-500">Failed to load certifications.</p>}
            {!certifications && !error && <p className="text-gray-500 dark:text-gray-400 font-mono">Loading certifications...</p>}

            <div className="space-y-6">
                {displayedCerts.map((cert) => (
                    <div key={cert.id} className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 group">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold font-mono text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-gray-200 transition-colors">{cert.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 font-mono mt-1">{cert.organization}</p>
                                <div className="text-sm text-gray-500 dark:text-gray-500 mt-2 flex flex-wrap gap-x-4 gap-y-1">
                                    {cert.dateReceived && <span>Issued: {cert.dateReceived}</span>}
                                    {cert.dateExpired && <span>Expires: {cert.dateExpired}</span>}
                                    {cert.credentialId && <span>ID: {cert.credentialId}</span>}
                                </div>
                            </div>
                            {cert.url && (
                                <a
                                    href={cert.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-sharp text-sm border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center gap-2 whitespace-nowrap"
                                >
                                    View Credential <ExternalLink size={14} />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {certifications && certifications.length > LIMIT && (
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="btn-sharp border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white flex items-center gap-2 text-gray-900 dark:text-white transition-all"
                    >
                        {expanded ? (
                            <>Show Less <ChevronUp size={16} /></>
                        ) : (
                            <>Show All Certifications <ChevronDown size={16} /></>
                        )}
                    </button>
                </div>
            )}

            {certifications && certifications.length === 0 && (
                <p className="text-gray-400 italic">No certifications added yet.</p>
            )}
        </Section>
    );
};

export default Certifications;
