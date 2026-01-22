"use client";
import React from "react";
import SubmittedFormsList from "@/components/superAdmin/SubmittedFormsList";
import ReportsOverview from "@/components/superAdmin/ReportsOverview"; // Keeping existing if useful

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen text-black">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Submissions</h1>
          <p className="text-sm text-gray-500">
            Review weekly reports and forms submitted by BNS workers.
          </p>
        </div>
      </div>

      {/* Overview Stats (if you have them) */}
      {/* <ReportsOverview /> */}

      {/* Main Content: Submitted Forms List */}
      <SubmittedFormsList />
    </div>
  );
}