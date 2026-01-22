"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  ChartArea,
  File,
  Home,
  ChevronLeft,
  Menu,
  HomeIcon,
  PanelLeft,
  Bell,
  Power,
} from "lucide-react";
import clsx from "clsx";
import useAuth from "@/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/service/auth/authSlice";
import { selectBeneficiary } from "@/service/beneficiaryPortal/beneficiaryPortalSlice";

export default function PortalSideBar({ isSidebarOpen, setIsSidebarOpen }) {
  const dispatch = useDispatch();
  const userData = useSelector(selectBeneficiary);
  const { user_type, name } = useAuth();

  console.log(user_type, "aseasdasd");

  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      href: "/beneficiary",
      icon: <Home size={18} />,
      label: "Dashboard",
    },
    {
      href: "/beneficiary/nutritionRecords",
      icon: <File size={18} />,
      label: "Nutrition Records",
    },

    {
      href: "/beneficiary/appointments",
      icon: <Calendar size={18} />,
      label: "Appointments",
    },
    {
      href: "/beneficiary/notifications",
      icon: <Bell size={18} />,
      label: "Notifications",
    },
    {
      href: "/beneficiary/chatAssistance",
      icon: <ChartArea size={18} />,
      label: "Chat Assistance",
    },
  ];

  return (
    <aside
      className={clsx(
        "bg-[#FAFAFA]   text-gray-800 h-screen flex flex-col justify-between sticky top-0 transition-all duration-500 ease-in-out border-r border-gray-200 max-[640px]:w-0 max-[640px]:fixed max-[640px]:z-99",
        isSidebarOpen
          ? "min-w-[250px] p-4 w-[250px]"
          : "w-0 p-0 overflow-hidden"
      )}
    >
      {/* Top Logo and Toggle */}
      <div
        className={clsx(
          "transition-opacity duration-300 ease-in-out",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="w-full flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <div className="bg-green-500 text-white font-bold text-sm px-2 py-1 rounded">
              BNS
            </div>
            <div>
              <p className="text-green-600 font-semibold">BNS Assist</p>
              <p className="text-xs text-gray-400">Beneficiary Portal</p>
            </div>
          </div>

          <button onClick={() => setIsSidebarOpen(false)}>
            <i className="bi bi-x text-lg"></i>
          </button>
        </div>

        {/* Menu Title */}
        <p className="text-xs text-gray-500 mb-6">Menu</p>

        {/* Navigation */}
        <nav className="space-y-2 w-full">
          {menuItems.map(({ href, icon, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-full text-sm transition",
                  isActive
                    ? "bg-green-100 text-green-600"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {icon}
                {isSidebarOpen && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {user_type === "children" ? (
          <>
            {/* Child Profile */}
            {isSidebarOpen && (
              <div
                className=" w-full h-full flex flex-col justify-end"
                onClick={() => router.push("/beneficiary/childProfile/123")}
              >
                <p className="text-xs text-gray-500 mb-2">Child Profile</p>
                <div className="flex items-center gap-3 mb-4 cursor-pointer">
                  <div className="w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center text-xs text-green-500">
                    👦
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {userData?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Age: {userData?.ageMonths} months
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>

      {/* Guardian Footer */}
      {isSidebarOpen ? (
        <div className="border-t border-gray-200 pt-4 w-full">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-xs text-gray-400 flex items-center justify-center">
              👤
            </div>
            {isSidebarOpen && (
              <div
                className="flex-1"
                onClick={() => router.push("/beneficiary/guardianProfile")}
              >
                <p className="text-sm font-medium text-gray-800">{name}</p>
                <p className="text-xs text-gray-500">
                  {user_type === "children" ? "Gurdian" : "Beneifciary"}
                </p>
              </div>
            )}

            <Power
              size={18}
              className="text-gray-400"
              onClick={() => {
                dispatch(logOut());
                window.location.reload();
              }}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </aside>
  );
}
