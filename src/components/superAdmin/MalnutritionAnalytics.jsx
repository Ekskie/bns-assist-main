"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

export default function MalnutritionAnalytics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/superAdmin/analytics/malnutrition-stats")
      .then((res) => res.json())
      .then((data) => {
        // Transform for chart
        const formatted = data.map(d => ({
            name: d._id || "Unknown",
            Normal: d.normalCount,
            Malnourished: d.underweightCount + d.overweightCount,
            details: d.malnourishedList
        }));
        setData(formatted);
      });
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-800 mb-4">Malnutrition Cases per Barangay</h3>
      
      {/* Chart Section */}
      <div className="h-[300px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" fontSize={10} angle={-15} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Normal" stackId="a" fill="#4ade80" />
            <Bar dataKey="Malnourished" stackId="a" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Feeding Program Candidate List */}
      <div className="mt-4">
        <h4 className="font-semibold text-gray-700 mb-2 text-sm">Candidates for Feeding Program (Malnourished)</h4>
        <div className="max-h-[200px] overflow-y-auto border rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-2">Barangay</th>
                <th className="p-2">Child Name</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((brgy) => (
                 brgy.details && brgy.details.map((child, idx) => (
                   <tr key={`${brgy.name}-${idx}`} className="border-b last:border-0 hover:bg-gray-50">
                     <td className="p-2 text-gray-600">{brgy.name}</td>
                     <td className="p-2 font-medium">{child.name}</td>
                     <td className="p-2 text-red-500 text-xs">{child.status}</td>
                   </tr>
                 ))
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}