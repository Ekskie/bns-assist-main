"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  MessageCircle,
  Bell,
  Menu,
  ChevronLeft,
  User,
  ClipboardList
} from "lucide-react";
import clsx from "clsx";

export default function PortalSideBar({ isSidebarOpen, setIsSidebarOpen }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menuItems = [
    {
      href: "/beneficiary",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
    {
      href: "/beneficiary/appointments",
      icon: <Calendar size={20} />,
      label: "Appointments",
    },
    {
        href: "/beneficiary/nutritionRecords",
        icon: <ClipboardList size={20} />,
        label: "Nutrition Records",
    },
    {
      href: "/beneficiary/chatAssistance",
      icon: <MessageCircle size={20} />,
      label: "Chat Assistance",
    },
    {
      href: "/beneficiary/notifications",
      icon: <Bell size={20} />,
      label: "Notifications",
    },
    {
        href: "/beneficiary/guardianProfile",
        icon: <User size={20} />,
        label: "Guardian Profile",
    },
  ];

  // Prevent hydration mismatch by rendering a consistent server-side version first
  // Or simply defer rendering the toggle-dependent parts until mounted.
  // Ideally, the sidebar width transition should be CSS-only or use a consistent default.
  // Here we'll stick to 'isSidebarOpen' passed from layout but safeguard dependent renders.

  return (
    <aside
      className={clsx(
        "bg-[#FAFAFA] text-gray-700 h-screen p-4 flex flex-col justify-start sticky top-0 transition-all duration-300 border-r border-gray-200",
        // Only apply width change if mounted or default to open on server to match layout
        (mounted ? isSidebarOpen : true) ? "w-64" : "w-20"
      )}
    >
      {/* Top header & toggle */}
      <div className="flex items-center justify-between mb-8 px-2">
        <div className={clsx("flex items-center gap-2 overflow-hidden transition-all", (mounted ? isSidebarOpen : true) ? "w-auto" : "w-0")}>
           <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">B</div>
           <span className="font-bold text-lg whitespace-nowrap">Beneficiary</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-500 hover:text-gray-900 p-1 rounded hover:bg-gray-100"
        >
          {(mounted ? isSidebarOpen : true) ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 flex-1">
        {menuItems.map(({ href, icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 p-3 rounded-lg transition-colors whitespace-nowrap group relative",
                isActive
                  ? "bg-green-50 text-green-700 font-medium"
                  : "hover:bg-gray-100 text-gray-600"
              )}
              title={!(mounted ? isSidebarOpen : true) ? label : ""}
            >
              <div className={clsx("shrink-0", isActive ? "text-green-600" : "text-gray-500 group-hover:text-gray-900")}>
                  {icon}
              </div>
              <span className={clsx("text-sm transition-opacity duration-300", (mounted ? isSidebarOpen : true) ? "opacity-100" : "opacity-0 w-0 hidden")}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Child Profile Section - Fixed Hydration Error */}
      {mounted && isSidebarOpen && (
        <div
            className="w-full mt-4 cursor-pointer p-3 rounded-lg hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
            onClick={() => router.push("/beneficiary/childProfile/123")}
        >
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">
                    JD
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 truncate">John Doe (Child)</p>
                    <p className="text-xs text-gray-500">View Profile</p>
                </div>
            </div>
        </div>
      )}
    </aside>
  );
}