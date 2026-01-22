"use client";

import BeneficiariesAddForm from "@/components/bnsUser/benefeciaries/BeneficiariesAddForm";
import ModalInfo from "@/components/bnsUser/benefeciaries/ModalInfo";
import NutritionDataForm from "@/components/bnsUser/nutritionData/NutritionDataForm";
import AddingDataForm from "@/components/bnsUser/pregnantData/AddingDataForm";
import { useGetAllPregnantDataQuery } from "@/service/pregnantData/pregnantDataApiSlice";
import Link from "next/link";
import { useEffect, useState } from "react";

const Beneficiaries = ({}) => {
  /* API  */

  const pregData = useGetAllPregnantDataQuery();

  const [filterData, setFilterData] = useState([
    {
      name: "",
      expectedDevlivery: "",
      pregnancyAge: 0,
      address: "",
      birthDate: "",
      email: "",
      number: "",
      type: "",
      pregnantinformation: [
        {
          bloodPressure: "",
          weightKg: 0,
          muacCm: 0,
          pregnacyRisk: "",
          supplement: "",
          recommendation: [
            {
              title: "",
              description: ".",
            },
          ],
          date: "",
        },
      ],
      createdAt: "",
      updatedAt: "",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  const [modalInfoOpen, setModalInfoOpen] = useState(false);

  const [formUpdateData, setFormUpdateData] = useState({
    name: "",
    expectedDevlivery: "",
    pregnancyAge: 0,
    address: "",
    birthDate: "",
    email: "",
    number: "",
    type: "",
    pregnantinformation: [
      {
        bloodPressure: "",
        weightKg: 0,
        muacCm: 0,
        pregnacyRisk: "",
        supplement: "",
        recommendation: [
          {
            title: "",
            description: "",
          },
        ],
        date: "",
      },
    ],
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    if (pregData?.data) {
      setFilterData(pregData?.data);
    }
  }, [pregData?.data]);

  /* Search Function */
  const searchData = (searchQuery) => {
    setFilterData(
      pregData?.data?.filter(
        (child) =>
          child.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          child.street?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          child.barangay?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  /* BG Status Setter */

  const setBg = (txt) => {
    if (txt?.toLowerCase() === "low") {
      return "#4CAF50";
    } else if (txt?.toLowerCase() === "moderate") {
      return "#FFC107";
    } else if (txt?.toLowerCase() === "high") {
      return "#2196F3";
    } else if (txt?.toLowerCase() === "very high") {
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
            {data?.pregnancyAge} mos
          </span>
        </td>
        <td className="font-regular py-[16px]">{data?.expectedDelivery}</td>
        {/*  <td className="font-regular py-[16px]">{data?.email}</td> */}
        <td className="font-regular py-[16px]">
          {data?.address} <br />
          {/*  <span className="text-[12px] text-[#64748b] ">
           
            Barangay: {data?.barangay}
          </span> */}
        </td>

        <td className={`font-regular py-[16px] flex  `}>
          <p
            className={`bg-[${setBg(
              data?.pregnantinformation[data?.pregnantinformation?.length - 1]
                ?.pregnacyRisk
            )}] rounded-full text-white px-2 text-[10px] mt-[16px] `}
          >
            {
              data?.pregnantinformation[data?.pregnantinformation?.length - 1]
                ?.pregnacyRisk
            }
          </p>
        </td>
        <td className="font-regular py-[16px] ">
          {data?.pregnantinformation[
            data?.pregnantinformation?.length - 1
          ]?.date?.slice(0, 10)}
        </td>
        <td className="font-regular py-[16px] px-[16px]">
          <i
            className="bi bi-file-earmark cursor-pointer p-2 rounded-md  duration-200  hover:bg-[#FFC105]  "
            onClick={() => {
              setModalInfoOpen(true);
              setFormUpdateData(data);
              setFormStatus("update");
            }}
          ></i>
        </td>

        <td className="font-regular py-[16px] px-[16px]">
          <Link
            href={`/bnsUser/pregnantData/${data?._id}`}
            className="primary-btn text-white text-[12px]"
          >
            Update/Upload
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <>
      <ModalInfo
        modalInfoOpen={modalInfoOpen}
        setModalInfoOpen={setModalInfoOpen}
        {...formUpdateData}
      />
      <div className="h-full w-full max-w-[1220px] max-h-[1000px]  mx-auto px-4 py-6 ">
        {/* Nutrition Data Title Box */}
        <div className="w-full flex flex-col mb-[32px] ">
          <h1 className="text-3xl font-bold ">Pregnant Data Records</h1>
          <p className="text-[16px] text-[#64748b] mb-2 ">
            Manage all beneficiaries in the system
          </p>
        </div>

        {open ? (
          <>
            <AddingDataForm setOpen={setOpen} formStatus={formStatus} />
          </>
        ) : (
          <>
            <div className="w-full mb-4 flex justify-center items-center cursor-pointer gap-4">
              <div className="w-1/2">
                <h3 className="text-[16px] font-semibold mb-[12px]">For You</h3>
                <div className=" flex w-full gap-[12px] overflow-auto rounded-md mb-4">
                  <div className="flex p-4 justify-between w-full items-center border border-gray-200 rounded-md ">
                    <p className="text-[16px]  gap-[-22px]">
                      Visit your Task to view if you have task for this Page
                      <br />
                      <span className="text-primary-color text-[12px]">
                        View Task Info
                      </span>
                    </p>
                    <h1 className="text-[12px] bg-[#4CAF50] text-white px-[9px] py-2 rounded-full">
                      01
                    </h1>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <h3 className="text-[16px] font-semibold mb-[12px]">
                  Beneficiary Reminder
                </h3>
                <div className=" flex flex-col gap-[12px] overflow-auto rounded-md mb-4">
                  <div className="flex border border-gray-200 p-4 justify-between w-full items-center  ">
                    <p className="text-[16px]  gap-[-22px]">
                      <b className="text-primary-color"> 03 Pregnant Women </b>
                      <br />
                      to remind for their monthly schedule <br />
                      <span className="text-[12px]">monthly schedule</span>
                    </p>
                    <button className=" primary-btn text-white text-[12px] cursor-pointer hover:opacity-50">
                      Remind All
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Main Table */}
            <div className="w-full p-[24px] border border-gray-200  rounded-md">
              {/* TITLE */}
              <div className="w-full flex gap-[24px] mb-7">
                <div className="w-1/2">
                  <h3 className="text-[24px] font-semibold">
                    Pregnant Nutrition Records
                  </h3>
                  <p className="text-[14px]  text-[#64748b] mb-[24px]">
                    Manage all beneficiaries in the system
                  </p>

                  {/* Mini Dash */}
                  <div className="w-full mb-[24px]">
                    <div className="w-full flex justify-between  ">
                      <p className="text-[12px] ">
                        total count <br />
                        <b className="text-[16px] font-bold text-primary-color ">
                          24
                        </b>
                      </p>
                      <p className="text-[12px] ">
                        check up this month
                        <br />
                        <b className="text-[16px] font-bold text-secondary-color ">
                          09 +
                        </b>
                      </p>
                      <p className="text-[12px] ">
                        Normal
                        <br />
                        <b className="text-[16px] font-bold text-[#2196F3] ">
                          09
                        </b>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="w-full flex justify-between">
                    <h3 className="text-[16px] font-semibold ">Given Birth</h3>{" "}
                    <span className="flex gap-4">
                      <button>{"<"}</button>
                      <button>{">"}</button>
                    </span>
                  </div>
                  <p className="text-[14px] text-[#64748b]  mb-3 ">
                    This is the Beneficiary who already give birth
                  </p>

                  <div className="w-full flex items-center justify-between   border border-gray-200 p-4 rounded-md">
                    <div>
                      <h3 className="text-[16px] font-medium text-primary-color">
                        Mika Salamanca
                      </h3>
                      <p className="text-[12px] font-medium ">2025, November</p>
                    </div>
                    <i className="bi bi-arrow-bar-right"></i>
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
                    placeholder="Search By Name, Address, or Barangay..."
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
                  Add New Beneficiaries
                </button>
              </div>

              {/* TABLE */}
              <table className="text-[14px] w-full border border-gray-200 rounded-md ">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-[#64748b]  font-medium text-left py-[8px]   px-[16px] ">
                      Name
                    </th>
                    <th className="text-[#64748b]  font-medium text-left py-[8px]">
                      Expected Delivery
                    </th>
                    <th className="text-[#64748b]  font-medium text-left py-[8px]">
                      Address
                    </th>
                    <th className="text-[#64748b]  font-medium text-left py-[8px]">
                      Pregnancy Risk
                    </th>
                    <th className="text-[#64748b]  font-medium text-left py-[8px]">
                      Last Checkup
                    </th>
                    <th className="text-[#64748b]  font-medium text-left py-[8px]">
                      Overview
                    </th>
                  </tr>
                </thead>
                <tbody>{renderChildrenData}</tbody>
              </table>
            </div>
          </>
        )}

        <div className="h-[24px]"></div>
      </div>
    </>
  );
};

export default Beneficiaries;
