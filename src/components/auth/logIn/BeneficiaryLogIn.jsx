"use client";
import {
  useLoginAdminMutation,
  useLoginBeneciaryMutation,
} from "@/service/auth/autApiSlice";
import { setToken } from "@/service/auth/authSlice";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

const BeneficiaryLogIn = () => {
  /* API FUNCTION LOGIN */
  const [loginBNF, { isSuccess, error, isError }] = useLoginBeneciaryMutation();

  const [barangayDropDown, setBarangayDropDown] = useState(false);

  const [logInData, setlogInData] = useState({
    bns_code: "",
  });

  const [typeOfLogin, setTypeOfLogIn] = useState("");

  /*  AUTH HANDLER*/

  const dispatch = useDispatch();

  /* Dynamic On Change  */
  const setChangeData = (e) => {
    const { value, name } = e.target;

    setlogInData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const logInUser = async () => {
    if (logInData?.bns_code) {
      const res = await loginBNF({
        bns_code: logInData?.bns_code,
        usertype: typeOfLogin,
      });

      if (isError && res) {
        console.log(res);

        toast.error("Id not existing", {
          duration: 3000,
        });
      } else {
        if (res?.data?.accessToken) {
          console.log(res?.data?.accessToken);

          dispatch(setToken({ accessToken: res?.data?.accessToken }));

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }
    }
  };

  console.log({
    bns_code: logInData?.bns_code,
    usertype: typeOfLogin,
  });

  return (
    <div className="p-[24px]">
      <h3 className="text-2xl font-semibold mb-[6px]">Beneficiary Access </h3>{" "}
      <p className="text-sm text-gray-600 mb-[8px]">
        Access your family's nutrition records and appointments
      </p>
      {/* Beneficiary or ID Number*/}
      <div className="w-full  items-center mb-4  ">
        <label
          htmlFor="bns_code"
          className="text-sm font-medium mb-2 inline-block text-nowrap"
        >
          Beneficiary ID
        </label>
        <div className="w-full flex gap-4">
          <input
            type="text"
            id="bns_code"
            className="h-10 px-[8px] py-[12px] w-1/2 outline-none rounded-md border border-gray-200  text-black text-[14px]  focus:ring-1 focus:ring-[#4CAF50] focus:ring-offset-2"
            name="bns_code"
            placeholder="BNF-12345 or 09XX-XXX-XXXX"
            onChange={(e) => setChangeData(e)}
          />

          {/* DROPDOWN */}
          <div
            id="barangay"
            name="barangay"
            className="px-[8px] py-[6px] w-1/2 flex justify-between outline-none rounded-md border border-gray-200 text-[14px] relative focus:ring-[#4CAF50] focus:ring-offset-2 "
            onClick={() => setBarangayDropDown((prev) => !prev)}
          >
            {typeOfLogin ? typeOfLogin : "Select Account Type"}
            <i className="bi bi-chevron-down"></i>
            <div
              className={`p-2 w-full overflow-auto gap-2 flex-col outline-none rounded-md border border-gray-200 text-[14px] absolute top-[120%] left-0 bg-[#f9fafb] ${
                barangayDropDown ? "flex" : "hidden"
              } `}
            >
              {/* DROPDOWN DATA */}
              <div
                className={`px-[8px] py-[8px] w-full outline-none rounded-md border  border-gray-200 text-[14px] relative duration-200 hover:bg-[#FFC105] cursor-pointer flex   ${
                  typeOfLogin === "children" ? "bg-[#ffc105]" : ""
                }`}
                onClick={() => setTypeOfLogIn("children")}
              >
                <i
                  className={`bi bi-check mr-2 ${
                    typeOfLogin === "children" ? "block" : "hidden"
                  } `}
                ></i>
                Children Account
              </div>
              <div
                className={`px-[8px] py-[8px] w-full outline-none rounded-md border border-gray-200 text-[14px] relative duration-200 hover:bg-[#FFC105] cursor-pointe flex  ${
                  typeOfLogin === "pregnantwomen" ? "bg-[#ffc105]" : ""
                } `}
                onClick={() => setTypeOfLogIn("pregnantwomen")}
              >
                <i
                  className={`bi bi-check mr-2 ${
                    typeOfLogin === "pregnantwomen" ? "block" : "hidden"
                  } `}
                ></i>
                Pregnant Mother
              </div>
              <div
                className={`px-[8px] py-[8px] w-full outline-none rounded-md border border-gray-200 text-[14px] relative duration-200 hover:bg-[#FFC105] cursor-pointe flex  ${
                  typeOfLogin === "lactatingmother" ? "bg-[#ffc105]" : ""
                } `}
                onClick={() => setTypeOfLogIn("lactatingmother")}
              >
                <i
                  className={`bi bi-check mr-2 ${
                    typeOfLogin === "lactatingmother" ? "block" : "hidden"
                  } `}
                ></i>
                Lactating Mother
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-[24px]">
        Use your benefiary id to login
      </p>
      <button
        className="w-full text-[14px] bg-[#4CAF50] text-white py-[12px] px-[8px] rounded-md hover:opacity-50 mb-4"
        onClick={() => logInUser()}
      >
        Continue
      </button>
    </div>
  );
};

export default BeneficiaryLogIn;
