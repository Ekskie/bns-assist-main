"use client";

import dynamic from "next/dynamic";

const SuperAdminDashboard = dynamic(
  () => import("@/components/pages/superAdmin/Dashboard"),
  { ssr: false }
);

export default function DashboardPage() {
  return <SuperAdminDashboard />;
}
