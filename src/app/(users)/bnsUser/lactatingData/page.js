"use client";

import BeneficiariesAddForm from "@/components/bnsUser/benefeciaries/BeneficiariesAddForm";
import { useEffect, useState } from "react";
import { useGetAllLactatingDataQuery } from "@/service/lactatingData/lactatingDataApiSlice";
import Link from "next/link";
import ModalLactatingInfo from "@/components/bnsUser/benefeciaries/ModalLactatingInfo";
import AddingDataForm from "@/components/bnsUser/lactatingData/AddingDataForm";

const Beneficiaries = ({}) => {
  const [filterData, setFilterData] = useState([]);
  const [open, setOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const { data: lactatingMotherData } = useGetAllLactatingDataQuery();
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [formUpdateData, setFormUpdateData] = useState({
    name: "",
    age: 0,
    childAge: 0,
    address: "",
    birthDate: "",
    approve: false,
    email: "",
    number: "",
    bns_code: "",
    type: "",
    imgUrl: "",
    lactatinginformation: [
      {
        weightKg: 0,
        breestFeedStatus: "sample",
        muacCm: 0,
        pregnacyRisk: "sample",
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
  });

  /* Search Function */
  const searchData = (searchQuery) => {
    setFilterData(
      lactatingMotherData?.filter(
        (lactating) =>
          lactating.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lactating.address?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };
  useEffect(() => {
    setFilterData(lactatingMotherData);
  }, [lactatingMotherData]);

  console.log(lactatingMotherData);

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

  const renderChildrenData = filterData?.map((data, index) => {
    return (
      <tr className="border-b border-gray-200" key={index}>
        <td className="font-regular py-[16px] px-[16px]">
          {data?.name} <br />
          <span className="text-[12px] text-[#64748b] ">
            {data?.age} yrs old
          </span>
        </td>

        <td className="font-regular py-[16px]">{data?.childAge}</td>
        <td className="font-regular py-[16px]">{data?.address}</td>

        <td className="font-regular py-[16px]">
          {data?.lactatinginformation?.[data?.lactatinginformation?.length - 1]
            ?.breestFeedStatus || "N/A"}
        </td>
        <td className="font-regular py-[16px]">
          {data?.lactatinginformation?.[
            data.lactatinginformation?.length - 1
          ]?.date?.slice(0, 10) || "N/A"}
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
            href={`/bnsUser/lactatingData/${data?._id}`}
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
      <ModalLactatingInfo
        modalInfoOpen={modalInfoOpen}
        setModalInfoOpen={setModalInfoOpen}
        {...formUpdateData}
      />
      <div className="h-full w-full max-w-[1220px] max-h-[1000px]  mx-auto px-4 py-6 ">
        {/* Nutrition Data Title Box */}
        <div className="w-full flex flex-col mb-[32px] ">
          <h1 className="text-3xl font-bold ">Lactating Data Records</h1>
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
            {/*  */}

            <div className="w-full mb-4 flex justify-center items-center cursor-pointer gap-4">
              <div className="w-1/2">
                <h3 className="text-[16px] font-semibold mb-[12px]">For You</h3>
                <div className=" flex w-full gap-[12px] overflow-auto rounded-md mb-4">
                  <div className="flex p-4 justify-between w-full items-center border border-gray-200 rounded-md ">
                    <p className="text-[16px]  gap-[-22px]">
                      Visit Task to view if you have task for{" "}
                      <b>Lactating Beneficiaries</b>
                      <br />
                      <span className="text-primary-color text-[12px]">
                        View Task Info
                      </span>
                    </p>
                    <Link
                      href={"bnsUser/taskandschedule"}
                      className="text-[12px] bg-[#4CAF50] text-white px-[12px] py-2 rounded-full"
                    >
                      <i className="bi bi-arrow-right"></i>
                    </Link>
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
                      <b className="text-primary-color">
                        {" "}
                        Post an Event for Lactating Beneficiaries
                      </b>
                      <br />
                      to make an event for the lactating beneficiaries <br />
                      <span className="text-[12px]">monthly schedule</span>
                    </p>
                    <Link
                      href={"bnsUser/reminders"}
                      className=" primary-btn text-white text-[12px] cursor-pointer hover:opacity-50"
                    >
                      Go to Events
                    </Link>
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
                    Lactating Data Records
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
                  <h3 className="text-[16px] font-semibold mb-[12px]">
                    Given Birth
                  </h3>

                  <div className="w-full flex items-center justify-between   border border-gray-200 p-4 rounded-md">
                    <div>
                      <h3 className="text-[16px] font-medium text-primary-color">
                        👩‍🍼 Empowering Mothers, Nourishing Generations
                      </h3>
                      <p className="text-[12px] font-medium ">
                        Track and support the nutritional health of lactating
                        mothers in your community. Regular checkups help ensure
                        both mother and child thrive during this critical stage.
                      </p>
                    </div>
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
                      Children Age
                    </th>
                    <th className="text-[#64748b]  font-medium text-left py-[8px]">
                      Address
                    </th>
                    <th className="text-[#64748b]  font-medium text-left py-[8px]">
                      Status
                    </th>
                    <th className="text-[#64748b]  font-medium text-left py-[8px]">
                      Last Checkup
                    </th>
                    <th className="text-[#64748b]  font-medium text-left py-[8px]">
                      Preview
                    </th>
                    <th className="text-[#64748b]  font-medium text-left py-[8px]"></th>
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
