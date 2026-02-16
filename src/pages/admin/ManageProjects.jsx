import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { Trash2, Plus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ManageProjects = () => {
    const { documents: projects, error } = useCollection("projects", ["order", "desc"]);
    const { addDocument, deleteDocument, updateDocument } = useFirestore("projects");

    const [isAdding, setIsAdding] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tech_stack: "", // Input as comma separated string
        link: "",
        github: "",
        image: "",
        order: 0
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert comma separated tech stack to array
        const techStackArray = formData.tech_stack.split(',').map(item => item.trim()).filter(item => item !== "");

        const projectData = {
            ...formData,
            tech_stack: techStackArray,
            order: parseInt(formData.order)
        };

        if (editId) {
            await updateDocument(editId, projectData);
            setEditId(null);
        } else {
            await addDocument(projectData);
        }

        setIsAdding(false);
        resetForm();
    };

    const handleEdit = (project) => {
        setEditId(project.id);
        setFormData({
            title: project.title,
            description: project.description,
            tech_stack: project.tech_stack ? project.tech_stack.join(', ') : "",
            link: project.link || "",
            github: project.github || "",
            image: project.image || "",
            order: project.order || 0
        });
        setIsAdding(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setIsAdding(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({ title: "", description: "", tech_stack: "", link: "", github: "", image: "", order: 0 });
        setEditId(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-12 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/admin" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-900 dark:text-white">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-3xl font-mono font-bold text-gray-900 dark:text-white">Manage Projects</h1>
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
                        <h2 className="text-lg font-bold font-mono mb-4 text-gray-900 dark:text-white">{editId ? "Edit Project" : "Add New Project"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Project Title</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Tech Stack (comma separated)</label>
                                    <input
                                        type="text"
                                        placeholder="React, Firebase, Python"
                                        className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                        value={formData.tech_stack}
                                        onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Live Link</label>
                                    <input
                                        type="url"
                                        className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                        value={formData.link}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">GitHub Repo</label>
                                    <input
                                        type="url"
                                        className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                        value={formData.github}
                                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Image URL</label>
                                    <input
                                        type="url"
                                        className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Display Order</label>
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
                                    rows="3"
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={handleCancel} className="btn-sharp border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white">Cancel</button>
                                <button type="submit" className="btn-sharp bg-black text-white dark:bg-white dark:text-black">{editId ? "Update" : "Save"} Project</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
                    {projects && projects.map((proj) => (
                        <div key={proj.id} className="p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 flex justify-between items-start hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer" onClick={() => handleEdit(proj)}>
                            <div className="flex gap-4">
                                {proj.image && (
                                    <img src={proj.image} alt={proj.title} className="w-16 h-16 object-cover bg-gray-100 dark:bg-gray-700" />
                                )}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold font-mono text-lg text-gray-900 dark:text-white">{proj.title}</h3>
                                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-500 dark:text-gray-400">Order: {proj.order || 0}</span>
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{proj.description}</div>
                                    <div className="flex gap-1 mt-1">
                                        {proj.tech_stack && proj.tech_stack.map((t, i) => (
                                            <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 px-1 text-gray-600 dark:text-gray-300">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteDocument(proj.id);
                                }}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                title="Delete"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                    {projects && projects.length === 0 && (
                        <div className="p-8 text-center text-gray-400 dark:text-gray-500 font-mono">No projects found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageProjects;
