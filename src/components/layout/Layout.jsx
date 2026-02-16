import { Link, useLocation } from "react-router-dom";
import { Terminal, Menu, X, Moon, Sun } from "lucide-react";
import { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const location = useLocation();

    const navLinks = [
        { name: "About", path: "#about" },
        { name: "Experience", path: "#experience" },
        { name: "Projects", path: "#projects" },
        { name: "Contact", path: "#contact" },
    ];

    return (
        <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 text-gray-900 dark:text-white">
                            <Terminal className="h-6 w-6" />
                            <span className="font-mono font-bold text-lg">AIMAN.HAZIQ</span>
                        </Link>
                    </div>
                    {/* Desktop Menu */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.path}
                                className="font-mono text-sm uppercase hover:bg-black hover:text-white dark:text-gray-300 dark:hover:bg-white dark:hover:text-black px-3 py-1 transition-colors duration-200"
                            >
                                {link.name}
                            </a>
                        ))}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {theme === "dark" ? <Sun size={20} className="text-white" /> : <Moon size={20} />}
                        </button>
                        <Link to="/admin" className="btn-sharp text-xs dark:text-white dark:border-gray-600 dark:hover:border-white">Admin</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center sm:hidden gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {theme === "dark" ? <Sun size={20} className="text-white" /> : <Moon size={20} />}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black dark:focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="sm:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <div className="pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.path}
                                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-black dark:hover:border-white hover:text-gray-800 dark:hover:text-white font-mono"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto transition-colors duration-300">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                        © {new Date().getFullYear()} Aiman Haziq. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        {/* Social icons */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
