const Section = ({ id, title, children, className = "" }) => {
    return (
        <section id={id} className={`py-16 sm:py-24 border-b border-gray-100 dark:border-gray-800 last:border-0 transition-colors duration-300 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {title && (
                    <h2 className="text-2xl sm:text-3xl font-mono font-bold mb-8 sm:mb-12 uppercase tracking-tight text-gray-900 dark:text-white">
                        {title}
                    </h2>
                )}
                {children}
            </div>
        </section>
    );
};

export default Section;
