"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Children, useState } from "react";
import {
  LayoutDashboard,
  Users2,
  CheckSquare,
  Activity,
  FileText,
  MessageSquare,
  Settings,
  Menu,
  ChevronLeft,
  PersonStanding,
  Paperclip,
} from "lucide-react";
import clsx from "clsx";

function SuperAdminSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    {
      href: "/superAdmin",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
    {
      href: "/superAdmin/approvals",
      icon: <CheckSquare size={20} />,
      label: "BNS Users",
    },
    // {
    // 	href: "/superAdmin/beneficiaryApprovals",
    // 	icon: <PersonStanding size={20} />,
    // 	label: "Beneficiary Users",
    // },
    {
      href: "/superAdmin/diary",
      icon: <Activity size={20} />,
      label: "Daily Diary",
    },
    // {
    // 	href: "/superAdmin/reports",
    // 	icon: <FileText size={20} />,
    // 	label: "Reports",
    // },
    {
      href: "/superAdmin/feedback",
      icon: <MessageSquare size={20} />,
      label: "Feedback & Surveys",
    },
    // {
    // 	href: "/superAdmin/settings",
    // 	icon: <Settings size={20} />,
    // 	label: "Settings",
    // },
  ];

  return (
    <aside
      className={clsx(
        "bg-green-800 text-white h-screen p-4 flex flex-col justify-start sticky top-0 transition-all duration-500",
        isSidebarOpen ? "w-64" : "w-16"
      )}
    >
      {/* Top header & toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-2xl font-bold whitespace-nowrap">
          {isSidebarOpen ? "BNS ASSIST" : "B"}
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white hover:text-gray-300"
        >
          {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map(({ href, icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 p-2 rounded transition-all",
                isActive
                  ? "bg-white font-semibold text-green-700"
                  : "hover:bg-green-700"
              )}
            >
              {icon}
              {isSidebarOpen && <span className="text-sm">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="flex flex-1 flex-col items-center justify-end">
        {isSidebarOpen && (
          <div className="text-xs text-center mt-6">© 2025 BNS ASSIST</div>
        )}
      </div>
    </aside>
  );
}

export default SuperAdminSidebar;
