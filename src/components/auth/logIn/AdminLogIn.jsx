"use client";
"use client";
import {
  useLoginAdminMutation,
  useLoginMutation,
} from "@/service/auth/autApiSlice";
import { setToken } from "@/service/auth/authSlice";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const AdminLogIn = () => {
  /* API FUNCTION LOGIN */
  const [logInBnsAdmin, { isSuccess, error, isError }] =
    useLoginAdminMutation();

  const [logInData, setlogInData] = useState({
    email: "",
    password: "",
  });

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
    if (logInData?.email && logInData?.password) {
      const res = await logInBnsAdmin({ ...logInData });

      if (isError && res) {
        console.log(res);

        toast.error("Wrong Email or Password!", {
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

  console.log(logInData);

  return (
    <div className="p-[24px]">
      <h3 className="text-2xl font-semibold mb-[6px]">Admin Login</h3>{" "}
      <p className="text-sm text-gray-600 mb-[8px]">
        Enter your credentials to access the administration portal
      </p>
      {/* Email or ID Number*/}
      <div className="w-full  items-center mb-4  ">
        <label
          htmlFor="email"
          className="text-sm font-medium mb-2 inline-block text-nowrap"
        >
          Email or ID Number
        </label>
        <input
          type="text"
          id="email"
          className="h-10 px-[8px] py-[12px] w-full outline-none rounded-md border border-gray-200  text-black text-[14px]  focus:ring-1 focus:ring-[#4CAF50] focus:ring-offset-2"
          name="email"
          placeholder="bns.worker@example.com"
          onChange={(e) => setChangeData(e)}
        />
      </div>
      {/* Password */}
      <div className="w-full  items-center mb-[24px]  ">
        <div className="w-full flex justify-between">
          <label
            htmlFor="password"
            className="text-sm font-medium mb-2 inline-block text-nowrap"
          >
            Password
          </label>{" "}
          <Link
            href={""}
            className="text-sm text-[#4CAF50] font-regular mb-2 inline-block text-nowrap hover:underline"
          >
            Forgot Password ?
          </Link>
        </div>

        <input
          type="password"
          id="password"
          className="h-10 px-[8px] py-[12px] w-full outline-none rounded-md border border-gray-200  text-black text-[14px]  focus:ring-1 focus:ring-[#4CAF50] focus:ring-offset-2"
          name="password"
          placeholder="**********"
          onChange={(e) => setChangeData(e)}
        />
      </div>
      <button
        className="w-full text-[14px] bg-[#4CAF50] text-white py-[12px] px-[8px] rounded-md hover:opacity-50 mb-4"
        onClick={() => logInUser()}
      >
        Sign In as Admin
      </button>
    </div>
  );
};

export default AdminLogIn;
