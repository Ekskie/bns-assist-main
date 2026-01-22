"use client";
import React from "react";
import UpdateRecordPregnant from "@/components/bnsUser/pregnantData/UpdateRecordPregnant";
import { useGetOneDataPregnantQuery } from "@/service/pregnantData/pregnantDataApiSlice";

const SpecificDataPage = ({ params }) => {
  const { id } = React.use(params);

  const getOne = useGetOneDataPregnantQuery(id);

  console.log(getOne?.data);

  return (
    <div className="h-full w-full max-w-[1220px] max-h-[1000px]  mx-auto px-4 py-6 ">
      {/* Name Title*/}
      <div className="w-full flex flex-col mb-[32px] ">
        <h1 className="text-3xl font-bold ">Update/Upload Data Records</h1>
        <p className="text-[16px] text-[#64748b] mb-2 ">
          Edit and Add ne Record for Monthly Checkups
        </p>
      </div>

      <UpdateRecordPregnant updateData={getOne?.data} />
    </div>
  );
};

export default SpecificDataPage;
