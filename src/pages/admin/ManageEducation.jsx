import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { Trash2, Plus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ManageEducation = () => {
    const { documents: education, error } = useCollection("education", ["order", "desc"]);
    const { addDocument, deleteDocument, updateDocument } = useFirestore("education");

    const [isAdding, setIsAdding] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        degree: "",
        university: "",
        year: "",
        cgpa: "",
        modules: "",
        order: "0"
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            updateDocument(editId, formData);
            setEditId(null);
        } else {
            addDocument(formData);
        }
        setIsAdding(false);
        setFormData({ degree: "", university: "", year: "", cgpa: "", modules: "", order: "0" });
    };

    const handleEdit = (edu) => {
        setFormData({
            degree: edu.degree,
            university: edu.university,
            year: edu.year,
            cgpa: edu.cgpa,
            modules: edu.modules,
            order: edu.order || "0"
        });
        setEditId(edu.id);
        setIsAdding(true);
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditId(null);
        setFormData({ degree: "", university: "", year: "", cgpa: "", modules: "", order: "0" });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-12 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/admin" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-900 dark:text-white">
                            <ArrowLeft size={20} />
                        </Link>
                        <h1 className="text-3xl font-mono font-bold text-gray-900 dark:text-white">Manage Education</h1>
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
                        <h2 className="text-xl font-mono font-bold mb-4 text-gray-900 dark:text-white">{editId ? "Edit Education" : "Add New Education"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Degree</label>
                                    <input type="text" required className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none" value={formData.degree} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">University</label>
                                    <input type="text" required className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none" value={formData.university} onChange={(e) => setFormData({ ...formData, university: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Year</label>
                                    <input type="text" required className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">CGPA</label>
                                    <input type="text" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none" value={formData.cgpa} onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Order (Higher = Top)</label>
                                    <input type="number" className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none" value={formData.order} onChange={(e) => setFormData({ ...formData, order: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Key Modules</label>
                                <textarea className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none" rows="3" value={formData.modules} onChange={(e) => setFormData({ ...formData, modules: e.target.value })} />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={handleCancel} className="btn-sharp border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white">Cancel</button>
                                <button type="submit" className="btn-sharp bg-black text-white dark:bg-white dark:text-black">{editId ? "Update" : "Save"}</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
                    {education && education.map((edu) => (
                        <div key={edu.id} className="p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <div className="flex-1 cursor-pointer" onClick={() => handleEdit(edu)}>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-500 dark:text-gray-400">Order: {edu.order || 0}</span>
                                    <h3 className="font-bold font-mono text-gray-900 dark:text-white">{edu.degree}</h3>
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{edu.university}, {edu.year}</div>
                            </div>
                            <button onClick={() => deleteDocument(edu.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"><Trash2 size={18} /></button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageEducation;
