"use client";
import { useState, useEffect, useMemo } from "react";
import { FileText, Eye, Download, Calendar, Filter, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function SubmittedFormsList() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("All");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await fetch("/api/superAdmin/submitted-forms");
        if (res.ok) {
          const data = await res.json();
          setForms(data);
        }
      } catch (error) {
        console.error("Failed to fetch forms", error);
        toast.error("Failed to load submitted forms");
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, []);

  // Extract unique form titles for the filter dropdown
  const formTypes = useMemo(() => {
    const types = new Set(forms.map((form) => form.formTitle));
    return ["All", ...Array.from(types)];
  }, [forms]);

  // Filter forms based on selected type
  const filteredForms = useMemo(() => {
    if (filterType === "All") return forms;
    return forms.filter((form) => form.formTitle === filterType);
  }, [forms, filterType]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this report? This action cannot be undone.")) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/superAdmin/submitted-forms?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setForms((prev) => prev.filter((form) => form._id !== id));
        toast.success("Report deleted successfully");
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message || "Error deleting report");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="p-4 text-center text-gray-500">Loading submitted forms...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <FileText size={18} className="text-blue-600" />
          Submitted Reports
          <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border ml-2">
            Total: {filteredForms.length}
          </span>
        </h3>
        
        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="docFilter" className="text-xs font-medium text-gray-500 flex items-center gap-1">
            <Filter size={14} /> Filter:
          </label>
          <div className="relative flex-1 sm:flex-none">
            <select
              id="docFilter"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full sm:w-48 pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            >
              {formTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3">Report Title</th>
              <th className="px-4 py-3">Submitted By</th>
              <th className="px-4 py-3">Barangay</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredForms.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-400">
                  {filterType === "All" ? "No reports submitted yet." : `No reports found for "${filterType}".`}
                </td>
              </tr>
            ) : (
              filteredForms.map((form) => (
                <tr key={form._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {form.formTitle}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {form.submittedBy?.fullName || "Unknown User"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {form.barangay || form.submittedBy?.barangay}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(form.submissionDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <a
                        href={form.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 text-xs font-medium transition-colors"
                        title="View Report"
                      >
                        <Eye size={14} /> View
                      </a>
                      <button
                        onClick={() => handleDelete(form._id)}
                        disabled={deletingId === form._id}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 text-xs font-medium transition-colors disabled:opacity-50"
                        title="Delete Report"
                      >
                        {deletingId === form._id ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          <>
                            <Trash2 size={14} /> Delete
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}