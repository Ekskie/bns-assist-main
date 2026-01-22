"use client";
import { Users, /* BarChart */ UserPlus, Calendar } from "lucide-react";
import NutritionChart from "@/components/superAdmin/NutritionChart";
import ServiceSatisfactionCard from "@/components/superAdmin/ServiceSatisfactionCard";
import BarangayHeatmap from "@/components/superAdmin/BarangayPerformanceHeatmap";
import { useGetHeatmapReportQuery } from "@/service/dailyDiary/dailyDiaryApiSlice";
import { useGetTableNutritionDataQuery } from "@/service/childrenNutritionData/childrenNurtritionDataApiSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useGetAllPregnantDataQuery } from "@/service/pregnantData/pregnantDataApiSlice";

function SuperAdminDashboard() {
  const data = useGetHeatmapReportQuery();
  const dataTrends = useGetTableNutritionDataQuery();
  console.log(data);
  console.log(dataTrends);

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
    <div className="text-black ">
      <div>
        <strong className="text-2xl">Super Admin Dashboard</strong>
        <p className="text-gray-500">
          Welcome back! Here's what's happening across the municipality.{" "}
        </p>
      </div>
      <div className="flex gap-6 my-6">
        {/* Card 1: Total BNS Users */}
        <div className="flex justify-between items-center bg-white rounded-xl shadow-sm p-4 w-full ">
          <div>
            <h4 className="text-sm text-gray-500 font-medium">
              Total BNS Users
            </h4>
            <p className="text-2xl font-bold text-gray-900">
              {data?.data?.totalBnsUsers}
            </p>
          </div>
          <div className="bg-green-100 p-2 rounded-xl">
            <Users className="text-green-600 w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Active Barangays */}
        <div className="flex justify-between items-center bg-white rounded-xl shadow-sm p-4 w-full ">
          <div>
            <h4 className="text-sm text-gray-500 font-medium">
              Active Barangays
            </h4>
            <p className="text-2xl font-bold text-gray-900">
              {data?.data?.activeBarangays}
            </p>
          </div>
          <div className="bg-green-100 p-2 rounded-xl">
            {/*  <BarChart className="text-green-600 w-6 h-6" /> */}
          </div>
        </div>

        {/* Card 3: Pending Approvals */}
        {/* <div className="flex justify-between items-center bg-white rounded-xl shadow-sm p-4 w-full ">
					<div>
						<h4 className="text-sm text-gray-500 font-medium">
							Pending Approvals
						</h4>
						<p className="text-2xl font-bold text-gray-900">3</p>
					</div>
					<div className="bg-green-100 p-2 rounded-xl">
						<UserPlus className="text-green-600 w-6 h-6" />
					</div>
				</div> */}

        {/* Card 4: Reports This Month */}
        <div className="flex justify-between items-center bg-white rounded-xl shadow-sm p-4 w-full">
          <div>
            <h4 className="text-sm text-gray-500 font-medium">
              Reports This Month
            </h4>
            <p className="text-2xl font-bold text-gray-900">
              {data?.data?.reportThisMonthCount}
            </p>
          </div>
          <div className="bg-green-100 p-2 rounded-xl">
            <Calendar className="text-green-600 w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="flex gap-6 my-6">
        {dataTrends?.data ? (
          <NutritionChart data={dataTrends?.data?.data} />
        ) : (
          "Loading..."
        )}

        <ServiceSatisfactionCard />
      </div>

      <div className="my-6">
        {data?.data?.rows ? (
          <BarangayHeatmap rows={data?.data?.rows} />
        ) : (
          "Loading..."
        )}
      </div>

      {/* <div className="flex gap-6">
				<PendingUserApprovals />
				<RecentActivityList />
			</div> */}

      <div className="w-full">
        <div>
          <strong className="text-2xl">Pregnant Dashboard</strong>
          <p className="text-gray-500">
            View pregnant anayltics and reports across the municipality.
          </p>
        </div>

        <div classNamess="w-full">
          <div style={{ width: "100%", height: 400 }}>
            <h3>Pregnant Women per Barangay</h3>

            {chartData.length === 0 ? (
              <p>No data available</p>
            ) : (
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="barangay" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="total" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;
