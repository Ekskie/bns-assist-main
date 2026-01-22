"use client";

import AddingNutritionForm from "@/components/bnsUser/nutritionData/AddingNutritionForm";
import NutritionDataForm from "@/components/bnsUser/nutritionData/NutritionDataForm";
import { useEffect, useState, useMemo } from "react";
import { useGetChildrenNutritionDataQuery } from "../../../../service/childrenNutritionData/childrenNurtritionDataApiSlice";
import AddScheduleEventForm from "@/components/bnsUser/nutritionData/AddScheduleEventForm";
import AddingNotif from "@/components/bnsUser/eventnNotif/AddingNotif";
import Link from "next/link";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const childrenData = [
  {
    name: "loading",
    mother: "loading",
    ageMonths: 0,
    gender: "loading",
    status: "loading",
    address: "loading",
    birthDate: "loading",
    createdAt: "loading",
    information: {
      date: "loading",
      weightKg: 0,
      heightCm: 0,
      muacCm: 0,
      recommendation: [
        {
          title: "loading",
          description: "loading",
        },
      ],
    },
  },
];

const GraphMalnourish = ({ data }) => {
  const malnourishedStatuses = ["underweight", "severely underweight"];

  const chartData = useMemo(() => {
    const monthCounts = {};

    data?.forEach((child) => {
      child?.information?.forEach((info) => {
        const status = (info?.status || "").toLowerCase();
        if (malnourishedStatuses.includes(status)) {
          const date = new Date(info.date);
          const monthKey = date.toLocaleString("default", {
            month: "short",
            year: "numeric",
          });
          monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
        }
      });
    });

    const labels = Object.keys(monthCounts).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    return {
      labels,
      datasets: [
        {
          label: "Malnourished Children",
          data: labels.map((label) => monthCounts[label]),
          backgroundColor: "rgba(76, 175, 80, 0.25)",
          borderColor: "#277C2B",
          borderWidth: 1,
        },
      ],
    };
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom", display: false },
      title: {
        display: false,
        text: "Malnourishment Rate per Month",
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="w-full h-[250px]">
      <Bar options={options} data={chartData} />
    </div>
  );
};

const UserNutriotionData = ({}) => {
  /* API FUNCTION */
  const cnData = useGetChildrenNutritionDataQuery();

  const [filterData, setFilterData] = useState(childrenData);
  const [open, setOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  const [openReminders, setOpenReminders] = useState(false);

  useEffect(() => {
    setFilterData(
      cnData?.data?.filter((data) => {
        return data?.approve === true;
      })
    );
  }, [cnData?.isSuccess, cnData?.data]);

  const [formUpdateData, setFormUpdateData] = useState({
    name: "",
    mother: "",
    ageMonths: 0,
    gender: "",
    status: "",
    birthDate: "",
    information: {
      weightKg: 0,
      heightCm: 0,
      muacCm: 0,
      date: "",
      recommendation: [],
    },
  });

  /* Search Function */
  const searchData = (searchQuery) => {
    setFilterData(
      cnData?.data?.filter(
        (child) =>
          child.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          child.mother?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          child.status?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  /* BG Status Setter */

  const setBg = (txt) => {
    if (txt?.toLowerCase() === "normal") {
      return "#4CAF50";
    } else if (txt?.toLowerCase() === "underweight") {
      return "#FFC107";
    } else if (txt?.toLowerCase() === "overweight") {
      return "#2196F3";
    } else if (txt?.toLowerCase() === "severely underweight") {
      return "#EF5350";
    } else {
      return "#ffffff";
    }
  };

  console.log(filterData);

  const renderChildrenData = filterData?.map((data, index) => {
    return (
      <tr className="border-b border-gray-200" key={index}>
        <td className="font-regular py-[16px] px-[16px]">
          {data?.name} <br />
          <span className="text-[12px] text-[#64748b] ">
            Mother: {data?.mother}
          </span>
        </td>
        <td className="font-regular py-[16px]">{data?.ageMonths}</td>
        <td className="font-regular py-[16px]">{data?.gender}</td>
        <td className="font-regular py-[16px]">
          {data?.information[data?.information?.length - 1]?.weightKg}
        </td>
        <td className="font-regular py-[16px]">
          {data?.information[data?.information?.length - 1]?.heightCm}
        </td>
        <td className="font-regular py-[16px]">
          {data?.information[data?.information?.length - 1]?.muacCm}
        </td>
        <td className={`font-regular py-[16px] flex  `}>
          <p
            className={`bg-[${setBg(
              data?.information[0]?.status
            )}] rounded-full text-white px-2 text-[10px] mt-[16px] `}
          >
            {data?.information[0]?.status}
          </p>
        </td>
        <td className="font-regular py-[16px] ">
          {data?.createdAt?.slice(0, 10)}
        </td>
        <td className="font-regular py-[16px] px-[16px]">
          {/*   <i
            className="bi bi-file-earmark cursor-pointer p-2 rounded-md  duration-200  hover:bg-[#FFC105]  "
            onClick={() => {
              setOpen(true);
              setFormUpdateData(data);
              setFormStatus("update");
            }}
          ></i> */}

          <button
            className=" primary-btn text-white text-[12px] cursor-pointer hover:opacity-50"
            onClick={() => {
              setOpen(true);
              setFormUpdateData(data);
              setFormStatus("update");
            }}
          >
            Edit / Record
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="h-full w-full max-w-[1220px] max-h-[1000px]  mx-auto px-4 py-6 ">
      {/* Nutrition Data Title Box */}
      <div className="w-full flex flex-col mb-[32px] ">
        <h1 className="text-3xl font-bold ">Children Nutrition Data</h1>
        <p className="text-[16px] text-[#64748b] mb-2 ">
          Manage and monitor children &apos;s nutritional status
        </p>
      </div>

      {open ? (
        formStatus === "update" ? (
          <>
            <NutritionDataForm
              formUpdateData={formUpdateData}
              setOpen={setOpen}
              formStatus={formStatus}
            />
          </>
        ) : (
          <>
            <AddingNutritionForm setOpen={setOpen} />
          </>
        )
      ) : (
        <>
          <div className="w-full mb-4 flex justify-center items-start cursor-pointer gap-4">
            <div className="w-1/2">
              <h3 className="text-[16px] font-semibold mb-[12px]">
                Malnourished Tracker
              </h3>
              <div className=" flex w-full gap-[12px] overflow-auto rounded-md mb-4">
                {/* DATA HERE GRAPH */}
                <GraphMalnourish data={cnData?.data} />
              </div>
            </div>
            <div className="w-1/2">
              <h3 className="text-[16px] font-semibold mb-[12px]">
                Beneficiary Reminder
              </h3>
              <div className=" flex flex-col gap-[12px] overflow-auto rounded-md mb-4">
                <div className="flex border border-gray-200 p-4 justify-between w-full items-center  ">
                  <p className="text-[16px]  gap-[-22px]">
                    <b className="text-primary-color">
                      {" "}
                      Post Event for Children
                    </b>{" "}
                    <br />
                    Made an Event relevant for Health and Nutrition
                  </p>
                  <Link
                    href={"bnsUser/reminders"}
                    className=" primary-btn text-white text-[12px] cursor-pointer hover:opacity-50"
                  >
                    Go to Events
                  </Link>
                </div>
              </div>

              <h3 className="text-[16px] font-semibold mb-[12px]">
                Forms Management
              </h3>
              <div className=" flex flex-col gap-[12px] overflow-auto rounded-md mb-4">
                <div className="flex border border-gray-200 p-4 justify-between w-full items-center  ">
                  <p className="text-[16px]  gap-[-22px]">
                    <b className="text-primary-color"> View Form for Reports</b>{" "}
                    <br />
                    click to view the forms for your reports
                  </p>
                  <Link
                    href={"bnsUser/voiceReport/nutritionistForm"}
                    className=" primary-btn text-white text-[12px] cursor-pointer hover:opacity-50"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Table */}
          <div className="w-full p-[24px] border border-gray-200  rounded-md">
            <div className="w-full flex justify-between items-center mb-[24px]">
              {/* TITLE */}
              <div className="flex flex-col ">
                <h3 className="text-[24px] font-semibold">Nutritions Record</h3>
                <p className="text-[14px]  text-[#64748b] ">
                  Manage and monitor children&lsquo;s nutritional status
                </p>
              </div>

              {/* MINI DASH */}
              <div className="w-1/2 ">
                <div className="w-full flex justify-between gap-8 ">
                  <p className="text-[12px] border border-gray-200 p-2 rounded-[7px] w-full">
                    total count <br />
                    <b className="text-[16px] font-bold text-primary-color ">
                      24
                    </b>
                  </p>
                  <p className="text-[12px] border border-gray-200   p-2 rounded-[7px] w-full ">
                    check up this month
                    <br />
                    <b className="text-[16px] font-bold text-secondary-color ">
                      09 +
                    </b>
                  </p>
                  <p className="text-[12px]  border border-gray-200  p-2 rounded-[7px] w-full">
                    Normal
                    <br />
                    <b className="text-[16px] font-bold text-[#2196F3] ">09</b>
                  </p>
                </div>
              </div>
            </div>

            {/* Search and Exports */}
            <div className="w-full flex gap-4 mb-[32px]">
              {/* Input */}
              <div className="border border-gray-200 w-full flex p-[8px] rounded-md gap-4">
                <i className="bi bi-search"></i>
                <input
                  type="search"
                  name=""
                  id=""
                  className=" w-full text-[14px]  outline-none border-none placeholder:text-[14px]"
                  placeholder="Search By Name, Parent, or Address..."
                  onChange={(e) => searchData(e.target.value)}
                />
              </div>

              <button
                className="py-[8px] px-[12px] cursor-pointer font-semibold bg-[#4CAF50] text-white  rounded-md flex justify-center items-center gap-4 min-w-min text-nowrap text-[14px]  duration-200  hover:opacity-50"
                onClick={() => {
                  setOpen(true);
                  setFormStatus("add");
                }}
              >
                <i className="bi bi-plus "></i>
                Add New
              </button>
            </div>
            {/* TABLE */}
            <div className="w-full max-h-[500px] overflow-auto">
              <table className="text-[14px] w-full border border-gray-200 rounded-md ">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-[#64748b]  font-medium text-left py-[8px]   px-[16px] ">
                      Name
                    </th>
                    <th className="text-[#64748b]  font-medium text-left py-[8px]">
                      Age (months)
                    </th>
                    <th className="text-[#64748b]  font-medium text-left py-[8px]">
                      Gender
                    </th>
                    <th className="text-[#64748b]  font-medium text-left py-[8px]">
                      Weight(kg)
                    </th>
                    <th className="text-[#64748b]  font-medium text-left py-[8px]">
                      Height(cm)
                    </th>
                    <th className="text-[#64748b]  font-medium text-left py-[8px]">
                      MUAC(cm)
                    </th>
                    <th className="text-[#64748b]  font-medium text-left py-[8px]">
                      Status
                    </th>
                    <th className="text-[#64748b]  font-medium text-left py-[8px]">
                      Date Record
                    </th>
                  </tr>
                </thead>
                <tbody>{renderChildrenData}</tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <div className="h-[24px]"></div>
    </div>
  );
};

export default UserNutriotionData;
