import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { Trash2, Plus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ManageSkills = () => {
    const { documents: skills, error } = useCollection("skills");
    const { addDocument, deleteDocument, updateDocument } = useFirestore("skills");

    const [isAdding, setIsAdding] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        items: "" // comma separated
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const itemsArray = formData.items.split(',').map(item => item.trim()).filter(item => item !== "");

        const skillData = {
            title: formData.title,
            items: itemsArray
        };

        if (editId) {
            await updateDocument(editId, skillData);
            setEditId(null);
        } else {
            await addDocument(skillData);
        }

        setIsAdding(false);
        resetForm();
    };

    const handleEdit = (category) => {
        setEditId(category.id);
        setFormData({
            title: category.title,
            items: category.items ? category.items.join(', ') : ""
        });
        setIsAdding(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setIsAdding(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({ title: "", items: "" });
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
                        <h1 className="text-3xl font-mono font-bold text-gray-900 dark:text-white">Manage Skills</h1>
                    </div>
                    <button
                        onClick={() => {
                            if (isAdding) handleCancel();
                            else setIsAdding(true);
                        }}
                        className="btn-sharp bg-black text-white dark:bg-white dark:text-black px-4 py-2 flex items-center gap-2"
                    >
                        <Plus size={16} /> {isAdding ? "Cancel" : "Add Category"}
                    </button>
                </div>

                {isAdding && (
                    <div className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 mb-8 shadow-sm transition-colors">
                        <h2 className="text-lg font-bold font-mono mb-4 text-gray-900 dark:text-white">{editId ? "Edit Category" : "Add New Category"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Category Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Languages, Cloud"
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Skills (comma separated)</label>
                                <input
                                    type="text"
                                    placeholder="Python, JavaScript, Go"
                                    required
                                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                    value={formData.items}
                                    onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={handleCancel} className="btn-sharp border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white">Cancel</button>
                                <button type="submit" className="btn-sharp bg-black text-white dark:bg-white dark:text-black">{editId ? "Update" : "Save"} Category</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skills && skills.map((cat) => (
                        <div key={cat.id} className="bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 relative group transition-colors cursor-pointer hover:shadow-md" onClick={() => handleEdit(cat)}>
                            <h3 className="font-bold font-mono text-lg mb-4 border-b border-gray-100 dark:border-gray-700 pb-2 text-gray-900 dark:text-white">{cat.title}</h3>
                            <div className="flex flex-wrap gap-2">
                                {cat.items && cat.items.map((item, i) => (
                                    <span key={i} className="bg-gray-50 dark:bg-gray-700 text-xs px-2 py-1 border border-gray-100 dark:border-gray-600 text-gray-700 dark:text-gray-300">{item}</span>
                                ))}
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteDocument(cat.id);
                                }}
                                className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-all"
                                title="Delete"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageSkills;
