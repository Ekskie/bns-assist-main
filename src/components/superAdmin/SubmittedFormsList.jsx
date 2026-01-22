"use client";
import { useState, useEffect } from "react";
import { FileText, Eye, Download, Calendar } from "lucide-react";

export default function SubmittedFormsList() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    fetchForms();
  }, []);

  if (loading) return <div className="p-4 text-center text-gray-500">Loading submitted forms...</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <FileText size={18} className="text-blue-600" />
          Submitted Reports
        </h3>
        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border">
          Total: {forms.length}
        </span>
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
            {forms.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-400">
                  No reports submitted yet.
                </td>
              </tr>
            ) : (
              forms.map((form) => (
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
                    <a
                      href={form.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 text-xs font-medium transition-colors"
                    >
                      <Eye size={14} /> View File
                    </a>
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