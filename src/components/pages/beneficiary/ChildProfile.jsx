"use client";
import {
  User,
  Calendar,
  Ruler,
  Weight,
  Activity,
  Heart,
  Syringe,
  Apple,
  AlertCircle,
  FileText,
  Clock,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { growthData } from "@/data/bnsUserSampleData";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectBeneficiary } from "@/service/beneficiaryPortal/beneficiaryPortalSlice";

// Helper to format date to "MMM YYYY"
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};
const TABS = ["Overview", "Growth Chart", "Immunization", "Nutrition"];

function ChildProfilePage() {
  const [tab, setTab] = useState("Overview");

  const userData = useSelector(selectBeneficiary);

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    const initials = words
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join("");
    return initials;
  };
  return (
    <div className="space-y-6 text-black">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Child Profile</h1>
          <p className="text-muted-foreground">
            View and manage Juan's health information
          </p>
        </div>
        <button className="flex gap-2 justify-center items-center bg-green-500 p-2 rounded text-white">
          <FileText className="h-4 w-4" />
          Export Health Records
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start bg-white p-6 rounded-2xl shadow">
        <div className="h-24 w-24  border-1 border-gray-200 flex justify-center items-center  rounded-full bg-[#4CAF50]">
          <div src="/placeholder.svg" alt="Juan Dela Cruz" />
          <div className="text-4xl text-white">
            {getInitials(userData?.name)}
          </div>
        </div>

        <div className="flex-1 space-y-2 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold">{userData?.name}</h2>
            <p className="text-muted-foreground">
              Child ID: BNS-{userData?._id}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <div
              variant="outline"
              className="bg-blue-50 text-blue-700 hover:bg-blue-100"
            >
              {userData?.gender}
            </div>
            <div
              variant="outline"
              className="bg-green-50 text-green-700 hover:bg-green-100"
            >
              {userData?.ageMonths} months old
            </div>
            <div
              variant="outline"
              className="bg-purple-50 text-purple-700 hover:bg-purple-100"
            >
              {userData?.information[userData?.information?.length - 1]?.status}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="bg-blue-50 px-4 py-2 rounded-md">
            <p className="text-sm text-blue-700">Last Check-up</p>
            <p className="font-medium text-blue-900">April 28, 2025</p>
          </div>
          <div className="bg-gray-100 p-2 rounded">Edit Profile</div>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-[#f4f6f8] px-3 py-2 rounded-lg w-fit  my-6">
        {TABS.map((t) => {
          const isActive = tab === t;

          return (
            <button
              key={t}
              onClick={() => {
                setTab(t);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition ${
                isActive ? "bg-white shadow text-black" : "text-gray-500"
              }`}
            >
              <span>{t}</span>
            </button>
          );
        })}
      </div>

      {tab === "Overview" && (
        <>
          {/* overview content row 1 */}
          <div className="flex gap-6">
            <div className="bg-white p-6 shadow rounded-2xl w-3/10">
              <div className="flex items-center gap-2 mb-6 text-2xl font-semibold">
                <User className="h-5 w-5 text-green-500" />
                Basic Information
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">Juan Dela Cruz</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">April 15, 2022</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="font-medium">3 years, 1 month</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium">Male</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blood Type</p>
                  <p className="font-medium">O+</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Allergies</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <div
                      variant="outline"
                      className="bg-red-50 text-red-700 flex justify-center items-center px-2 rounded font-semibold"
                    >
                      Peanuts
                    </div>
                    <div
                      variant="outline"
                      className="bg-gray-100 flex justify-center items-center px-2 rounded font-semibold"
                    >
                      None
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 shadow rounded-2xl w-7/10">
              <div className="flex items-center gap-2 mb-6 text-2xl font-semibold">
                <Activity className="h-5 w-5 text-green-500" />
                Health Status
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div className="flex flex-col">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Weight</span>
                    <span className="font-medium">14.5 kg</span>
                  </div>

                  <div>
                    <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[75%] transition-all"></div>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">Normal for age</p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Height</span>
                    <span className="font-medium">95 cm</span>
                  </div>

                  <div>
                    <div className="h-2 bg-green-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[60%] transition-all"></div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">Above average</p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">BMI</span>
                    <span className="font-medium">16.1</span>
                  </div>
                  <div>
                    <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[60%] transition-all"></div>
                    </div>
                    <p className="text-xs text-amber-600 mt-1">
                      Acceptable range
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Recent Health Issues</h4>
                <div className="space-y-2">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        <span className="font-medium text-sm">Mild Fever</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        April 10, 2025
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 ml-6">
                      Treated with paracetamol, resolved in 2 days
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                        <span className="font-medium text-sm">Common Cold</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        March 22, 2025
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 ml-6">
                      Administered vitamin C, improved after 3 days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*overview row2 2 */}
          <div className="bg-white p-6 shadow rounded-2xl">
            <div className="flex items-center justify-between mb-6 ">
              <span className="flex items-center gap-2 text-2xl font-semibold">
                <Calendar className="h-5 w-5 text-green-500" />
                Recent Appointments
              </span>
              <div className="text-green-500 flex justify-center items-center font-semibold">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Weight className="h-4 w-4 text-green-600" />
                    <h4 className="font-medium text-green-800">
                      Regular Weighing
                    </h4>
                  </div>
                  <div className="flex items-center text-sm text-green-700 mb-1">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>April 28, 2025</span>
                  </div>
                  <p className="text-xs text-green-600">
                    Weight: 14.5kg, Height: 95cm
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="h-4 w-4 text-blue-600" />
                    <h4 className="font-medium text-blue-800">
                      Health Check-up
                    </h4>
                  </div>
                  <div className="flex items-center text-sm text-blue-700 mb-1">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>March 15, 2025</span>
                  </div>
                  <p className="text-xs text-blue-600">Overall health: Good</p>
                </div>

                <div className="bg-purple-50 border border-purple-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Syringe className="h-4 w-4 text-purple-600" />
                    <h4 className="font-medium text-purple-800">
                      Immunization
                    </h4>
                  </div>
                  <div className="flex items-center text-sm text-purple-700 mb-1">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>February 20, 2025</span>
                  </div>
                  <p className="text-xs text-purple-600">
                    Vaccine: Measles, no adverse reaction
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/*Overview row 3 */}
          <div className="bg-white p-6 shadow rounded-2xl">
            <div className="flex items-center gap-2 mb-6 text-2xl font-semibold">
              <Apple className="h-5 w-5 text-green-500" />
              Nutrition Status
            </div>

            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-md">
                <h4 className="font-medium text-green-800">Current Status</h4>
                <p className="text-sm text-green-700">
                  Juan is currently at a normal weight for his age and height.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Nutrition Recommendations</h4>
                <div className="space-y-2">
                  <div className="bg-blue-50 border-l-2 border-blue-500 p-3 rounded-md">
                    <p className="font-medium text-sm text-blue-800">
                      Continue balanced diet
                    </p>
                    <p className="text-xs text-blue-600">
                      Maintain current feeding practices with a mix of protein,
                      carbohydrates, and vegetables.
                    </p>
                  </div>

                  <div className="bg-amber-50 border-l-2 border-amber-500 p-3 rounded-md">
                    <p className="font-medium text-sm text-amber-800">
                      Increase iron intake
                    </p>
                    <p className="text-xs text-amber-600">
                      Add more iron-rich foods like spinach, beans, and lean
                      meat to prevent anemia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/*growth */}
      {tab === "Growth Chart" && (
        <>
          <div className="bg-white p-6 rounded-2xl shadow">
            <div>
              <div className="flex items-center gap-2 text-2xl font-semibold">
                <Ruler className="h-5 w-5 text-green-500" />
                Growth Chart
              </div>
              <div className="text-gray-500">
                Track Juan's growth patterns over time
              </div>
            </div>
            <div>
              <div className=" bg-gray-100 flex items-center justify-center rounded-md mt-6">
                <div className="bg-[#eaf3f9] p-6 rounded-xl w-full">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={formatDate}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        yAxisId="left"
                        label={{
                          value: "Weight (kg)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        label={{
                          value: "Height (cm)",
                          angle: -90,
                          position: "insideRight",
                        }}
                      />
                      <Tooltip
                        labelFormatter={(date) => {
                          const d = new Date(date);
                          return `${d.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}`;
                        }}
                      />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="weight"
                        name="Weight (kg)"
                        stroke="#8884d8"
                        dot
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="height"
                        name="Height (cm)"
                        stroke="#82ca9d"
                        dot
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2 text-sm">Weight-for-Age</h4>
                  <div className="space-y-2">
                    <div className="bg-gray-100 p-3 rounded-md flex justify-between">
                      <span className="text-sm">Current</span>
                      <span className="font-medium">14.5 kg</span>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-md flex justify-between">
                      <span className="text-sm">Expected Range</span>
                      <span className="font-medium">13.5 - 16.2 kg</span>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-md flex justify-between">
                      <span className="text-sm">Percentile</span>
                      <span className="font-medium">65th</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-sm">Height-for-Age</h4>
                  <div className="space-y-2">
                    <div className="bg-gray-100 p-3 rounded-md flex justify-between">
                      <span className="text-sm">Current</span>
                      <span className="font-medium">95 cm</span>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-md flex justify-between">
                      <span className="text-sm">Expected Range</span>
                      <span className="font-medium">91 - 98 cm</span>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-md flex justify-between">
                      <span className="text-sm">Percentile</span>
                      <span className="font-medium">75th</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/*Immunization */}
      {tab === "Immunization" && (
        <>
          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex items-center gap-2 font-semibold text-2xl mb-6">
              <Syringe className="h-5 w-5 text-green-500" />
              Immunization Records
            </div>

            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vaccine
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">BCG</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        April 16, 2022
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">1 day</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="bg-green-100 text-green-800 flex justify-center items-center rounded-2xl font-semibold text-sm p-1">
                          Completed
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        No adverse reaction
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Hepatitis B
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        April 16, 2022
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">1 day</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="bg-green-100 text-green-800 flex justify-center items-center rounded-2xl font-semibold text-sm p-1">
                          Completed
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        No adverse reaction
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">OPV 1</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        June 15, 2022
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">2 months</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="bg-green-100 text-green-800 flex justify-center items-center rounded-2xl font-semibold text-sm p-1">
                          Completed
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        No adverse reaction
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Measles</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        February 20, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        2 years, 10 months
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="bg-green-100 text-green-800 flex justify-center items-center rounded-2xl font-semibold text-sm p-1">
                          Completed
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        Slight fever for 1 day
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">MMR 2</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        June 15, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        3 years, 2 months
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="bg-amber-100 text-amber-800 flex justify-center items-center rounded-2xl font-semibold text-sm p-1">
                          Scheduled
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/*Nutrition Assessment */}
      {tab === "Nutrition" && (
        <>
          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex items-center gap-2 font-semibold text-2xl mb-6">
              <Apple className="h-5 w-5 text-green-500" />
              Nutrition Assessment
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="font-medium text-green-800 mb-2">
                  Current Nutritional Status
                </h3>
                <p className="text-sm text-green-700 mb-3">
                  Juan is currently at a normal weight for his age. His height
                  is slightly above average, indicating good growth.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-md border border-green-200">
                    <p className="text-xs text-muted-foreground">
                      Weight-for-Age
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <p className="font-medium">Normal</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-md border border-green-200">
                    <p className="text-xs text-muted-foreground">
                      Height-for-Age
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <p className="font-medium">Above Average</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-md border border-green-200">
                    <p className="text-xs text-muted-foreground">
                      Weight-for-Height
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                      <p className="font-medium">Acceptable</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Dietary Recommendations</h3>
                <div className="space-y-2">
                  <div className="bg-blue-50 border-l-2 border-blue-500 p-3 rounded-md">
                    <p className="font-medium text-sm text-blue-800">
                      Protein Intake
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Continue providing regular protein sources like eggs,
                      fish, and legumes.
                    </p>
                  </div>

                  <div className="bg-amber-50 border-l-2 border-amber-500 p-3 rounded-md">
                    <p className="font-medium text-sm text-amber-800">
                      Iron-Rich Foods
                    </p>
                    <p className="text-xs text-amber-600 mt-1">
                      Increase consumption of iron-rich foods like spinach,
                      beans, and lean meat to prevent anemia.
                    </p>
                  </div>

                  <div className="bg-green-50 border-l-2 border-green-500 p-3 rounded-md">
                    <p className="font-medium text-sm text-green-800">
                      Vegetables and Fruits
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      Maintain regular intake of various vegetables and fruits
                      for essential vitamins and minerals.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Supplementation</h3>
                <div className="space-y-2">
                  <div className="bg-gray-100 p-3 rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Vitamin A</p>
                        <p className="text-sm text-muted-foreground">
                          Last dose: March 15, 2025
                        </p>
                      </div>
                      <div className="bg-green-100 text-green-800 flex justify-center items-center px-2 rounded font-semibold">
                        Up to date
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 p-3 rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Iron Drops</p>
                        <p className="text-sm text-muted-foreground">
                          Currently not prescribed
                        </p>
                      </div>
                      <div className="bg-gray-50 text-gray-800 flex justify-center items-center px-2 rounded font-semibold">
                        Not needed
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 p-3 rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">Deworming</p>
                        <p className="text-sm text-muted-foreground">
                          Last dose: April 10, 2025
                        </p>
                      </div>
                      <div className="bg-green-100 text-green-800 flex justify-center items-center px-2 rounded font-semibold">
                        Up to date
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ChildProfilePage;
