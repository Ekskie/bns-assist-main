"use client";

import FillUpModal from "@/components/bnsUser/voiceReports/FillUpModal";
import { useGetFormsQuery } from "@/service/forms/formsApiSlice";
import Link from "next/link";
import { useState } from "react";

const NutritionForm = () => {
  const forms = useGetFormsQuery();

  const [view, setView] = useState("BNAP");
  const [modalFormOpen, setModalFormOpen] = useState(false);

  const [formInfo, setFormInfo] = useState({
    formTitle: "",
    formDescription: "",
    formType: "",
  });

  const linkClasses = (path) =>
    `text-[14px] font-medium py-1.5 px-3 rounded-md pointer-cursor w-[25%] cursor-pointer
        ${
          view === path
            ? "bg-white text-black"
            : "bg-transparent text-[#64748b] "
        }`;

  const downloadPdf = async (pdfUrl) => {
    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "filename.pdf";
    link.click();

    window.URL.revokeObjectURL(url); // Cleanup
  };

  /* FORM OPENFING FUNCTION */

  const openForm = (formTitle, formDescription, formType) => {
    setFormInfo({ formTitle, formDescription, formType });

    setModalFormOpen(true);
  };

  const setViewRender = () => {
    if (forms?.data) {
      return forms.data.map((form) => (
        <div
          className="w-full p-[24px] border border-gray-200 rounded-md mb-4"
          key={form._id}
        >
          {/* TITLE */}
          <div className="flex justify-between items-center w-full">
            <h3 className=" font-semibold text-[18px]">
              <i className="bi bi-file-earmark-text mr-[8px] text-[#F05656]"></i>
              {form?.formName}
            </h3>
            <span className="text-[12px] py-0.5 px-2.5 bg-[#4CAF50] text-white rounded-full">
              {form?.formName?.slice(0, 3)?.toUpperCase()}
            </span>
          </div>

          {/* CONTENT */}
          <p className="text-[14px]  text-[#64748b] mb-[8px]">
            Uploaded by BNS Assist on {form?.createdAt?.slice(0, 10)}
          </p>
          <p className="text-[14px]  text-[#64748b] mb-[24px]">
            Log form for nutrition education sessions conducted
          </p>

          <div className="w-full flex gap-5 justify-end items-center">
            <Link
              href={`/bnsUser/forms/${form?._id}`}
              className="py-[8px] px-[12px] cursor-pointer font-semibold border border-gray-200 rounded-md flex justify-center items-center gap-4 min-w-min text-nowrap text-[14px]  duration-200  hover:bg-[#FFC105]  hover:text-black"
            >
              <i className="bi bi-file-earmark-text"></i>
              View Forms
            </Link>
          </div>
        </div>
      ));
    }
  };
  /* RENDERING THE FORM */

  return (
    <>
      <FillUpModal
        modalFormOpen={modalFormOpen}
        setModalFormOpen={setModalFormOpen}
        {...formInfo}
      />
      <div className="w-full p-[24px] border border-gray-200  bg-white rounded-md ">
        <h3 className="text-[24px] font-semibold ">Nutritionist Forms</h3>
        <p className="text-[16px] text-[#64748b] mb-4 ">
          Edit and Download the Automated Forms Data
        </p>

        {/* FORM LIST */}
        <div>{setViewRender()}</div>
      </div>
    </>
  );
};

export default NutritionForm;
