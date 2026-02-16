import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { Trash2, Plus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ManageExperience = () => {
    const { documents: experiences, error } = useCollection("experience", ["order", "desc"]);
    const { addDocument, deleteDocument, updateDocument } = useFirestore("experience");

    // Simple inline form state for adding/editing
    const [isAdding, setIsAdding] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        period: "",
        description: "",
        order: 0
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = {
            ...formData,
            order: parseInt(formData.order) // Ensure order is a number
        };

        if (editId) {
            updateDocument(editId, dataToSave);
            setEditId(null);
        } else {
            addDocument(dataToSave);
        }

        setIsAdding(false);
        setFormData({ title: "", company: "", period: "", description: "", order: 0 });
    };

    const handleEdit = (exp) => {
        setFormData({
            title: exp.title,
            company: exp.company,
            period: exp.period,
            description: exp.description,
            order: exp.order || 0
        });
        setEditId(exp.id);
        setIsAdding(true);
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditId(null);
        setFormData({ title: "", company: "", period: "", description: "", order: 0 });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-12 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/admin" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-900 dark:text-white">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-3xl font-mono font-bold text-gray-900 dark:text-white">Manage Experience</h1>
                    </div>
                    <button
                        onClick={() => {
                            if (isAdding) handleCancel();
                            else setIsAdding(true);
                        }}
                        className="btn-sharp bg-black text-white dark:bg-white dark:text-black px-4 py-2 flex items-center gap-2"
                    >
                        <Plus size={16} /> {isAdding ? "Cancel" : "Add New"}
                    </button>
                </div>

                {isAdding && (
                    <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 mb-8 shadow-sm transition-colors">
                        <h2 className="text-lg font-bold font-mono mb-4 text-gray-900 dark:text-white">{editId ? "Edit Experience" : "Add New Experience"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Job Title</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Company</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Period</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Jan 2023 - Present"
                                        required
                                        className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                        value={formData.period}
                                        onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Display Order (Higher = Top)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Description</label>
                                <textarea
                                    rows="4"
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={handleCancel} className="btn-sharp border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white">Cancel</button>
                                <button type="submit" className="btn-sharp bg-black text-white dark:bg-white dark:text-black">{editId ? "Update" : "Save Experience"}</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
                    {experiences && experiences.map((exp) => (
                        <div key={exp.id} className="p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 flex justify-between items-start hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <div className="flex-1 cursor-pointer" onClick={() => handleEdit(exp)}>
                                <h3 className="font-bold font-mono text-lg text-gray-900 dark:text-white">{exp.title}</h3>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{exp.company} • {exp.period}</div>
                                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">Order: {exp.order}</div>
                            </div>
                            <button
                                onClick={() => deleteDocument(exp.id)}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                title="Delete"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                    {experiences && experiences.length === 0 && (
                        <div className="p-8 text-center text-gray-400 dark:text-gray-500 font-mono">No entries found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageExperience;
