"use client";

import useAuth from "@/hooks/useAuth";
import { useGetChildrenNutritionDataQuery } from "@/service/childrenNutritionData/childrenNurtritionDataApiSlice";
import { useGetEventQuery } from "@/service/eventSched/eventApiSlice";

import Link from "next/link";

const BnsUser = () => {
  const { name, barangay } = useAuth();

  const getTodayFormatted = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };
  const event = useGetEventQuery();
  const children = useGetChildrenNutritionDataQuery();

  const getMalnourishedCountThisMonth = (data) => {
    const malnourishedStatuses = ["underweight", "severely underweight"];

    if (!data || !Array.isArray(data)) return 0;

    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthIndex = lastMonth.getMonth();
    const lastMonthYear = lastMonth.getFullYear();

    let count = 0;

    data.forEach((child) => {
      child?.information?.forEach((info) => {
        const status = (info?.status || "").toLowerCase();
        const date = new Date(info.date);
        if (
          malnourishedStatuses.includes(status) &&
          date.getMonth() === lastMonthIndex &&
          date.getFullYear() === lastMonthYear
        ) {
          count++;
        }
      });
    });

    return count;
  };
  const getUpcomingEventsCount = (events) => {
    if (!events || !Array.isArray(events)) return 0;

    const today = new Date();

    const count = events.filter((event) => {
      const eventDate = new Date(event.eventDate);
      // Compare only the date (not the time)
      return eventDate >= today;
    }).length;

    return count;
  };

  return (
    <div className="h-full w-full max-w-[1220px] max-h-[1000px]  mx-auto px-4 py-6 ">
      {/* Welcome Box */}
      <div className="w-full flex justify-between mb-[32px] ">
        <div>
          <h1 className="text-3xl font-bold ">Dashboard</h1>
          <p className="text-[16px] text-[#64748b] mb-2 ">
            {getTodayFormatted()}
          </p>
        </div>

        <div>
          <h4 className="text-xl font-regular">
            Welcome back, <b> {name}</b>
          </h4>
          <p className="text-[16px] text-[#64748b] text-right ">
            {" "}
            {barangay} • BNS
          </p>
        </div>
      </div>
      {/* <div className="w-full">
        <HeatMap />
      </div> */}
      {/* /* MINI DASHBOARD BOX */}
      <div className="grid grid-cols-2 gap-4 mb-[32px]">
        <div className="w-full  p-2">
          <div className="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm p-6 space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Total Children
            </h3>
            <div className="text-3xl font-bold text-[#4CAF50]">
              {children?.data?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Registered children under 5 years
            </p>
          </div>
        </div>

        <div className="w-full  p-2">
          <div className="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm p-6 space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Undernourished
            </h3>
            <div className="text-3xl font-bold text-[#EF5350]">
              {getMalnourishedCountThisMonth(children?.data) || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Children requiring nutritional intervention
            </p>
          </div>
        </div>

        <div className="w-full  p-2">
          <div className="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm p-6 space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Upcoming Events
            </h3>
            <div className="text-3xl font-bold text-[#FFC107]">
              {getUpcomingEventsCount(event?.data) || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Events in the next 7 days
            </p>
          </div>
        </div>

        <div className="w-full  p-2">
          <div className="rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm p-6 space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Total Event
            </h3>
            <div className="text-3xl font-bold text-[#4CAF50]">
              {event?.data?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Program participation rate
            </p>
          </div>
        </div>
      </div>
      {/* Lower Dash */}
      <div className="w-full flex gap-6 ">
        {/* Task & Schedule */}
        <div className="w-[60%] border border-gray-200 rounded-lg">
          <div className="w-full p-4 flex justify-between">
            <h3 className="text-[24px] font-semibold">Task & Schedule</h3>

            <Link
              href={"/bnsUser/taskandschedule"}
              className=" px-[12px] flex justify-center items-center cursor-pointer text-[14px] border border-gray-200 gap-4 rounded-sm duration-200  hover:bg-[#FFC105]  hover:text-black"
            >
              <i className="bi bi-calendar"></i> View All
            </Link>
          </div>

          <div className="w-full p-[12px] bg-[#F5F5F5]">
            <p className="text-[14px]"> Today&lsquo;s Task (0)</p>
          </div>

          <div className="w-full p-[12px]">
            <p className="text-[14px] w-full text-center text-[#64748b] ">
              No tasks scheduled for today
            </p>
          </div>

          <div className="w-full p-[12px]  bg-[#F5F5F5]">
            <p className="text-[14px]"> Upcoming Task</p>
          </div>

          <div className="w-full p-[12px] text-[#4CAF50] ">
            <button className="text-[14px] py-2 rounded-sm w-full text-center cursor-pointer duration-200  hover:bg-[#FFC105]  hover:text-black">
              <i className="bi bi-check"></i> Mark as Complete
            </button>
          </div>
        </div>

        {/* Quick Action */}

        <div className="w-[40%] p-6 border border-gray-200 rounded-lg">
          <h3 className="text-[18px] font-semibold mb-[24px]">Quick Action</h3>

          <div className="w-full flex gap-3  mb-3">
            {/* Action List */}

            <Link
              href={"/bnsUser/voiceReport"}
              className="flex flex-col justify-center items-center w-[33.33%] border border-gray-200 py-[16px] rounded-md"
            >
              <span className="w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#4CAF50]">
                <i className="bi bi-mic text-[12px] text-white"></i>
              </span>
              <p className="text-[12px] text-wrap text-center">Record Report</p>
            </Link>

            <div className="flex flex-col justify-center items-center w-[33.33%] border border-gray-200 py-[16px] rounded-md">
              <span className="w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#2196F3]">
                <i className="bi bi-file-earmark text-[12px] text-white"></i>
              </span>
              <p className="text-[12px] text-wrap text-center">
                Add Nutrition Data
              </p>
            </div>

            <Link
              href={"/bnsUser/taskandschedule"}
              className="flex flex-col justify-center items-center w-[33.33%] border border-gray-200 py-[16px] rounded-md"
            >
              <span className="w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#FFC107]">
                <i className="bi bi-calendar text-[12px] text-white"></i>
              </span>
              <p className="text-[12px] text-wrap text-center">Schedule Task</p>
            </Link>
          </div>

          <div className="w-full flex gap-3 ">
            {/* Action List */}

            <Link
              href={"/bnsUser/nutritionData"}
              className="flex flex-col justify-center items-center w-[33.33%] border border-gray-200 py-[16px] rounded-md"
            >
              <span className="w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#2196F3]">
                <i className="bi bi-person text-[12px] text-white"></i>
              </span>
              <p className="text-[12px] text-wrap text-center">
                Add Beneficiary
              </p>
            </Link>

            <Link
              href={"/bnsUser/voiceReport"}
              className="flex flex-col justify-center items-center w-[33.33%] border border-gray-200 py-[16px] rounded-md"
            >
              <span className="w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#4CAF50]">
                <i className="bi bi-clipboard text-[12px] text-white"></i>
              </span>
              <p className="text-[12px] text-wrap text-center">
                Record Attendance
              </p>
            </Link>

            <Link
              href={"/bnsUser/reminders"}
              className="flex flex-col justify-center items-center w-[33.33%] border border-gray-200 py-[16px] rounded-md"
            >
              <span className="w-[28px] h-[28px] flex items-center justify-center rounded-full bg-[#EF5350]">
                <i className="bi bi-plus   text-[12px] text-white"></i>
              </span>
              <p className="text-[12px] text-wrap text-center">New Feeding</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-[24px]"></div>
    </div>
  );
};

export default BnsUser;
