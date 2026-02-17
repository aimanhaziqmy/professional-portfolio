import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <nav className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex justify-between items-center transition-colors duration-300">
                <div className="font-mono font-bold text-gray-900 dark:text-white">Admin Dashboard</div>
                <button
                    onClick={handleLogout}
                    className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-mono"
                >
                    Logout
                </button>
            </nav>
            <div className="max-w-7xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-mono font-bold mb-8 text-gray-900 dark:text-white">Content Management</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {['Experience', 'Projects', 'Skills', 'Education', 'Publications', 'Certifications'].map((item) => (
                        <Link
                            key={item}
                            to={`/admin/${item.toLowerCase()}`}
                            className="block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors group"
                        >
                            <h3 className="text-xl font-bold font-mono mb-2 group-hover:underline text-gray-900 dark:text-white">{item}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Manage {item} entries</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
