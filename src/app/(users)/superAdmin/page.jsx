"use client";
import { Users, UserPlus, Calendar } from "lucide-react";
import NutritionChart from "@/components/superAdmin/NutritionChart";
import ServiceSatisfactionCard from "@/components/superAdmin/ServiceSatisfactionCard";
import BarangayHeatmap from "@/components/superAdmin/BarangayPerformanceHeatmap";

// 🔹 NEW COMPONENTS
import DailyAccomplishments from "@/components/superAdmin/DailyAccomplishments";
import InventoryManagement from "@/components/superAdmin/InventoryManagement";
import MalnutritionAnalytics from "@/components/superAdmin/MalnutritionAnalytics";

// 🔹 API HOOKS
import { useGetHeatmapReportQuery } from "@/service/dailyDiary/dailyDiaryApiSlice";
import { useGetTableNutritionDataQuery } from "@/service/childrenNutritionData/childrenNurtritionDataApiSlice";
import { useGetAllPregnantDataQuery } from "@/service/pregnantData/pregnantDataApiSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function SuperAdminDashboard() {
  const { data } = useGetHeatmapReportQuery();
  // Check if data is nested inside another data property or is direct
  // Based on standard RTK Query, 'data' is the response body.
  // The previous code used data?.data?.property, which implies the response had a 'data' field.
  // The API route returns { totalBnsUsers, ... } directly.
  // So we should use data?.totalBnsUsers.
  
  const dashboardStats = data?.data || data; // Fallback to handle both structures if uncertain

  const { data: dataTrends } = useGetTableNutritionDataQuery();
  
  const {
    data: pregnantData = [],
    isLoading,
    isError,
  } = useGetAllPregnantDataQuery();

  // 🔹 Extract Barangay from address
  const extractBarangay = (address = "") => {
    const match = address.match(/Brgy\.?\s*([^,]+)|Barangay\s*([^,]+)/i);
    return match ? (match[1] || match[2]).trim() : "Unknown";
  };

  // 🔹 Count pregnant women per barangay
  const barangayCount = pregnantData.reduce((acc, person) => {
    if (person.type !== "pregnant") return acc;

    const barangay = extractBarangay(person.address);
    acc[barangay] = (acc[barangay] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(barangayCount).map(([barangay, total]) => ({
    barangay,
    total,
  }));

  return (
    <div className="text-black p-6 space-y-8 bg-gray-50 min-h-screen">
      
      {/* 1. HEADER */}
      <div>
        <strong className="text-2xl text-gray-900">Super Admin Dashboard</strong>
        <p className="text-gray-500">
          Welcome back! Here's what's happening across the municipality.
        </p>
      </div>

      {/* 2. KEY METRICS (EXISTING) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total BNS Users */}
        <div className="flex justify-between items-center bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div>
            <h4 className="text-sm text-gray-500 font-medium">Total BNS Users</h4>
            <p className="text-2xl font-bold text-gray-900">
              {dashboardStats?.totalBnsUsers || 0}
            </p>
          </div>
          <div className="bg-green-100 p-2 rounded-xl">
            <Users className="text-green-600 w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Active Barangays */}
        <div className="flex justify-between items-center bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div>
            <h4 className="text-sm text-gray-500 font-medium">Active Barangays</h4>
            <p className="text-2xl font-bold text-gray-900">
              {dashboardStats?.activeBarangays || 0}
            </p>
          </div>
          <div className="bg-green-100 p-2 rounded-xl">
             <UserPlus className="text-green-600 w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Reports This Month */}
        <div className="flex justify-between items-center bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div>
            <h4 className="text-sm text-gray-500 font-medium">Reports This Month</h4>
            <p className="text-2xl font-bold text-gray-900">
              {dashboardStats?.reportThisMonthCount || 0}
            </p>
          </div>
          <div className="bg-green-100 p-2 rounded-xl">
            <Calendar className="text-green-600 w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3. NEW OPERATIONS SECTION (Daily Tasks + Inventory) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Daily Accomplishments (Time In/Out + Tasks) */}
        <div className="xl:col-span-2">
            <DailyAccomplishments />
        </div>
        
        {/* Right: Vitamin Inventory */}
        <div className="xl:col-span-1">
            <InventoryManagement />
        </div>
      </div>

      {/* 4. DATA TRENDS & SATISFACTION (EXISTING) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full">
           {dataTrends?.data ? (
             <NutritionChart data={dataTrends?.data?.data} />
           ) : (
             <div className="h-64 flex items-center justify-center bg-white rounded-xl shadow-sm">Loading Chart...</div>
           )}
        </div>
        <div className="w-full">
           <ServiceSatisfactionCard />
        </div>
      </div>

      {/* 5. FEEDING PROGRAM LIST (NEW) & HEATMAP */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
         {/* New: List of Malnourished / Feeding Candidates */}
         <div className="w-full">
            <MalnutritionAnalytics />
         </div>
         
         {/* Existing: Heatmap */}
         <div className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            {dashboardStats?.rows ? (
              <BarangayHeatmap rows={dashboardStats?.rows} />
            ) : (
              <div className="h-64 flex items-center justify-center">Loading Heatmap...</div>
            )}
         </div>
      </div>

      {/* 6. PREGNANT DASHBOARD (EXISTING) */}
      <div className="w-full bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="mb-6">
          <strong className="text-2xl text-gray-900">Pregnant Dashboard</strong>
          <p className="text-gray-500">
            View pregnant analytics and reports across the municipality.
          </p>
        </div>

        <div className="w-full h-[400px]">
          <h3 className="mb-4 font-semibold text-gray-700">Pregnant Women per Barangay</h3>
          {chartData.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">No pregnant data available</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="barangay" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis allowDecimals={false} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                />
                <Bar dataKey="total" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

    </div>
  );
}

export default SuperAdminDashboard;