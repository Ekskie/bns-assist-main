"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetFormsByIdQuery } from "@/service/forms/formsApiSlice";
import ReactMarkdown from "react-markdown";
import { useGetChildrenNutritionDataQuery } from "@/service/childrenNutritionData/childrenNurtritionDataApiSlice";
import remarkGfm from "remark-gfm";

const PageGoogleSheetEmbed = () => {
  const childData = useGetChildrenNutritionDataQuery();
  const pathname = usePathname();
  const { id } = useParams();

  const formById = useGetFormsByIdQuery(id);

  const [view, setView] = useState("form");

  const linkClasses = (path) =>
    `text-[14px] font-medium py-1.5 px-3 rounded-md cursor-pointer
        ${
          view === path
            ? "bg-white text-black"
            : "bg-transparent text-[#64748b] "
        }`;

  return (
    <div className="w-full h-screen pt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">
        {formById?.data?.formName ? formById?.data?.formName : "Loading"}
      </h1>

      {/* Mini Nav */}
      <div className="bg-[#F1F5F9] rounded-md p-2 inline-block mb-[24px] mr-8">
        <button className={linkClasses("form")} onClick={() => setView("form")}>
          Forms
        </button>
        <button
          className={linkClasses("Documentation")}
          onClick={() => setView("Documentation")}
        >
          Documentation
        </button>{" "}
        <button className={linkClasses("data")} onClick={() => setView("data")}>
          Data
        </button>
      </div>

      <div className="bg-[#F1F5F9] rounded-md p-2 inline-block mb-[24px]">
        <Link
          href={`/forms/bnsUser/voiceReport/nutritionistForm`}
          className={linkClasses("")}
        >
          Back to Forms
        </Link>
      </div>

      <div className="h-[700px] w-full">
        {view === "form" ? (
          <>
            <iframe
              src={`${formById?.data?.embeddedLink}`}
              className="h-full w-full"
            ></iframe>
          </>
        ) : (
          <>
            {view === "Documentation" ? (
              <>
                <h1 className="text-2xl font-bold mb-4">Documentation</h1>

                <div className="prose max-w-none p-4 bg-white rounded-lg shadow">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {formById?.data?.mdeText || "No Documentation Available"}
                  </ReactMarkdown>
                </div>
              </>
            ) : (
              <>
                {" "}
                <h1 className="text-2xl font-bold mb-4">Data Table</h1>
                <p className="text-[16px] text-[#64748b] mb-2 ">
                  you can COPY and PASTE the data in table format to your
                  preferred application (e.g., Excel, Google Sheets).
                </p>
                <ChildrenTable data={childData?.data || []} />{" "}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
const setBg = (status) => {
  switch (status) {
    case "normal":
      return "#22c55e"; // green
    case "overweight":
      return "#f59e0b"; // yellow
    case "severely underweight":
      return "#ef4444"; // red
    default:
      return "#6b7280"; // gray
  }
};
const ChildrenTable = ({ data }) => {
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US");
  };

  // 🔹 Creates formatted table for one child
  const formatChildTable = (child, index) => {
    console.log(child);

    const rows = child?.information[child.information.length - 1];

    const copy = `${index + 1}\t${child.address}\t${child.mother}\t${
      child.name
    }\tNO\t${child.gender === "male" ? "M" : "F"}\t${formatDate(
      child.birthDate
    )}\t${formatDate(rows.date)}\t${rows.weightKg}\t${rows.heightCm}\t${
      child.ageMonths
    }\t${rows.status}\t${rows.muacCm}`;

    return copy;
  };

  // 🔹 Copy one child's report
  const handleCopy = (child, index) => {
    const text = formatChildTable(child, index);
    navigator.clipboard.writeText(text);
    toast.success(`Copied report for ${child.name}`);
  };

  // 🔹 Copy all children’s reports
  const handleCopyAll = () => {
    const allText = data.map(formatChildTable).join("\n");
    navigator.clipboard.writeText(allText);
    toast.success("Copied all reports!");
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleCopyAll}
          className="bg-green-600 text-white text-[13px] px-3 py-2 rounded hover:bg-green-700"
        >
          Copy All Reports
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-300 bg-gray-100 text-left text-sm">
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Age (Months)</th>
            <th className="py-3 px-4">Gender</th>
            <th className="py-3 px-4">Weight</th>
            <th className="py-3 px-4">Height</th>
            <th className="py-3 px-4">MUAC</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((child, index) => {
            const latest = child.information[child.information.length - 1];
            return (
              <tr className="border-b border-gray-200" key={child._id}>
                <td className="py-[16px] px-[16px]">
                  {child.name}
                  <br />
                  <span className="text-[12px] text-[#64748b]">
                    Mother: {child.mother}
                  </span>
                </td>
                <td className="py-[16px]">{child.ageMonths}</td>
                <td className="py-[16px] capitalize">{child.gender}</td>
                <td className="py-[16px]">{latest?.weightKg}</td>
                <td className="py-[16px]">{latest?.heightCm}</td>
                <td className="py-[16px]">{latest?.muacCm}</td>
                <td className="py-[16px]">
                  <p
                    className="rounded-full text-white px-2 py-1 text-[10px] inline-block"
                    style={{ backgroundColor: setBg(latest?.status) }}
                  >
                    {latest?.status || "N/A"}
                  </p>
                </td>
                <td className="py-[16px]">
                  {new Date(child.createdAt).toLocaleDateString()}
                </td>
                <td className="py-[16px] px-[16px] text-center">
                  <button
                    onClick={() => handleCopy(child, index)}
                    className="bg-blue-600 text-white text-[12px] px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Copy Report
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PageGoogleSheetEmbed;
