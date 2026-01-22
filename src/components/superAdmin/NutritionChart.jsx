"use client";

import { useGetTableNutritionDataQuery } from "@/service/childrenNutritionData/childrenNurtritionDataApiSlice";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function NutritionChart({ data }) {
  console.log("This is the data")
  console.log(data);
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 w-full border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Child Nutrition Status Trends
          </h2>
          <p className="text-sm text-gray-500">
            Children aged 0–5 years monitored monthly
          </p>
        </div>
        <div className="flex gap-4 items-center text-sm mt-1">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-gray-700">Underweight</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-gray-700">Normal</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-400" />
            <span className="text-gray-700">Overweight</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="underweight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F87171" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#F87171" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="normal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ADE80" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#4ADE80" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="overweight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FACC15" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#FACC15" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Underweight"
            stroke="#EF4444"
            fill="url(#underweight)"
            strokeWidth={1.5}
          />
          <Area
            type="monotone"
            dataKey="Normal"
            stroke="#22C55E"
            fill="url(#normal)"
            strokeWidth={1.5}
          />
          <Area
            type="monotone"
            dataKey="Overweight"
            stroke="#EAB308"
            fill="url(#overweight)"
            strokeWidth={1.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
