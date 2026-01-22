"use client";

import Persist from "@/components/auth/persist/Persist";
import BnsNav from "@/components/bnsUser/BnsNav";
import NotifBnsUser from "@/components/bnsUser/nav-components/NotifBnsUser";
import UserAccount from "@/components/bnsUser/nav-components/UserAccount";
import useAuth from "@/hooks/useAuth";
import { useGetOneBnsWorkerQuery } from "@/service/auth/autApiSlice";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const BnsMainLayout = ({ children }) => {
  const { type, name, barangay, id, imgUrl } = useAuth();

  const user = useGetOneBnsWorkerQuery(id);
  const router = useRouter();

  const [notifOpen, setnotifOpen] = useState(false);
  const [userAccountOpen, setuserAccountOpen] = useState(false);

  useEffect(() => {
    if (type !== "bns-worker") {
      if (type === "bns-admin") {
        router.replace("/superAdmin");
      } else if (type === "bns-beneficiary") {
        router.replace("/beneficiary");
      }
    }
  }, [router, type]);

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
    <Persist>
      {" "}
      <div className="h-screen w-screen flex flex-row items-center justify-start bg-[#f9fafb] text-black">
        {/* SIDE NAV */}
        <BnsNav />

        <div className="w-full h-full flex flex-col  ">
          {/* Main Header */}
          <header className="w-full h-[64px] min-h-[64px]  border-b border-gray-200 flex justify-between items-center p-4">
            <h2 className="font-semibold text-bns-primary text-lg text-[#4CAF50]">
              BNS ASSIST
            </h2>

            <div className="flex justify-center items-center gap-4 ">
              <div
                className="relative cursor-pointer"
                onClick={() => {
                  setnotifOpen((prev) => !prev);
                  setuserAccountOpen(false);
                }}
              >
                <NotifBnsUser notifOpen={notifOpen} />
                {/*   <i className="bi bi-bell text-lg"></i> */}
              </div>

              <div className="relative">
                <h1 className="font-medium text-bns-primary text-[16px] text-right ">
                  {name ? name : "User Not Found"}
                </h1>

                <h5 className="text-[12px] text-[#64748b] text-right">
                  {barangay ? barangay : "Undefined Barangay"}
                </h5>
              </div>

              <div
                className=" h-[40px] w-[40px] bg-green-400 rounded-full relative"
                onClick={() => {
                  setuserAccountOpen((prev) => !prev);
                  setnotifOpen(false);
                }}
              >
                <UserAccount userAccountOpen={userAccountOpen} />

                {user?.data?.imgUrl ? (
                  <></>
                ) : (
                  <div className="w-full h-full rounded-full flex justify-center items-center text-xl">
                    {getInitials(user?.data?.fullName)}
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="w-full h-full overflow-auto flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </Persist>
  );
};

export default BnsMainLayout;
