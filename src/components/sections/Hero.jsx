import { ArrowRight, Terminal } from "lucide-react";

const Hero = () => {
    return (
        <section className="min-h-[80vh] flex items-center justify-center border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center space-x-2 text-sm font-mono text-gray-500 dark:text-gray-400 mb-6 bg-gray-50 dark:bg-gray-900 px-3 py-1 border border-gray-100 dark:border-gray-800">
                        <Terminal size={14} />
                        <span>Data Engineering • Infrastructure • Developer</span>
                    </div>

                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-mono tracking-tighter mb-6 leading-tight text-gray-900 dark:text-white">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-500">Hi, I'm</span><br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-500">
                            Aiman Haziq
                        </span>
                    </h1>

                    <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-8 font-sans font-light leading-relaxed max-w-2xl">
                        A Data Engineer based in Malaysia, specializing in building robust infrastructure and scalable Data solutions.
                        Currently evolving at the intersection of Data Engineering and System Architecture.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="https://terminal.aimanhaziq.my"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-sharp bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 flex items-center justify-center gap-2 group transition-all"
                        >
                            <span>Open Terminal</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/aimanhaziqmy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-sharp border-gray-300 hover:border-black text-gray-700 dark:border-gray-700 dark:text-gray-300 dark:hover:border-white dark:hover:text-white flex items-center justify-center transition-all"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://aimanhaziq.my"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-sharp border-gray-300 hover:border-black text-gray-700 dark:border-gray-700 dark:text-gray-300 dark:hover:border-white dark:hover:text-white flex items-center justify-center transition-all"
                        >
                            Blog
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
