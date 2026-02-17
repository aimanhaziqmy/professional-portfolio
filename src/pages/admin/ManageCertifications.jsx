import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { Trash2, Plus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ManageCertifications = () => {
    const { documents: certifications, error } = useCollection("certifications", ["order", "desc"]);
    const { addDocument, deleteDocument, updateDocument } = useFirestore("certifications");

    const [isAdding, setIsAdding] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        organization: "",
        credentialId: "",
        dateReceived: "",
        dateExpired: "",
        url: "",
        order: 0
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const certData = {
            ...formData,
            order: parseInt(formData.order) || 0
        };

        if (editId) {
            await updateDocument(editId, certData);
            setEditId(null);
        } else {
            await addDocument(certData);
        }

        setIsAdding(false);
        resetForm();
    };

    const handleEdit = (cert) => {
        setEditId(cert.id);
        setFormData({
            title: cert.title,
            organization: cert.organization,
            credentialId: cert.credentialId || "",
            dateReceived: cert.dateReceived || "",
            dateExpired: cert.dateExpired || "",
            url: cert.url || "",
            order: cert.order || 0
        });
        setIsAdding(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setIsAdding(false);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            title: "",
            organization: "",
            credentialId: "",
            dateReceived: "",
            dateExpired: "",
            url: "",
            order: 0
        });
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
                        <h1 className="text-3xl font-mono font-bold text-gray-900 dark:text-white">Manage Certifications</h1>
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
                        <h2 className="text-lg font-bold font-mono mb-4 text-gray-900 dark:text-white">{editId ? "Edit Certification" : "Add New Certification"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Certification Title</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Issuing Organization</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                        value={formData.organization}
                                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Credential ID</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                        value={formData.credentialId}
                                        onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Credential URL</label>
                                    <input
                                        type="url"
                                        className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Date Received</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Jan 2024"
                                        className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                        value={formData.dateReceived}
                                        onChange={(e) => setFormData({ ...formData, dateReceived: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Date Expired (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Jan 2027"
                                        className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                        value={formData.dateExpired}
                                        onChange={(e) => setFormData({ ...formData, dateExpired: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-mono mb-1 text-gray-700 dark:text-gray-300">Display Order</label>
                                    <input
                                        type="number"
                                        className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-2 focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={handleCancel} className="btn-sharp border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white">Cancel</button>
                                <button type="submit" className="btn-sharp bg-black text-white dark:bg-white dark:text-black">{editId ? "Update" : "Save"} Certification</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors">
                    {certifications && certifications.map((cert) => (
                        <div key={cert.id} className="p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 flex justify-between items-start hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer" onClick={() => handleEdit(cert)}>
                            <div>
                                <h3 className="font-bold font-mono text-lg text-gray-900 dark:text-white">{cert.title}</h3>
                                <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">{cert.organization}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1 flex gap-4">
                                    {cert.dateReceived && <span>Issued: {cert.dateReceived}</span>}
                                    {cert.dateExpired && <span>Expires: {cert.dateExpired}</span>}
                                    {cert.credentialId && <span>ID: {cert.credentialId}</span>}
                                </div>
                                <div className="mt-1 text-xs text-gray-400">Order: {cert.order || 0}</div>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteDocument(cert.id);
                                }}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                title="Delete"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                    {certifications && certifications.length === 0 && (
                        <div className="p-8 text-center text-gray-400 dark:text-gray-500 font-mono">No certifications found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageCertifications;
