"use client";
import UserAccessRequests from "@/components/superAdmin/UserAccessRequest";
import NewBnsModal from "@/components/ui/modals/NewBnsModal";
import {
  useGetAllRequestQuery,
  useUpdateRequestMutation,
} from "@/service/request/requestApiSlice";
import { Check, CircleAlertIcon, Clock, Pen, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function SuperAdminUserApprovalPage() {
  const { data, refetch } = useGetAllRequestQuery(); 

  const [apprroveData] = useUpdateRequestMutation();

  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (data?.data) {
      const filtered = data?.data.filter((req) => req?.isdone === false);
      setFilterData(filtered);
    }
  }, [data]);

  const approve = async (id) => {
    if (id) {
      try {
        const res = await apprroveData({ id, isdone: true }).unwrap(); 
        if (res) {
          toast.success("Request approved successfully");
          refetch(); 
        }
      } catch (err) {
        toast.error("Failed to approve");
      }
    }
  };

  return (
    <div className="text-black">
      <div className="flex justify-between items-center">
        <div className="">
          <p className="text-2xl font-bold">Bns Users</p>
          <p className="text-gray-500">Manage BNS users</p>
        </div>
        <div>
          <button
            className="btn-sm flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-[#28a745] text-white font-medium hover:opacity-90 transition"
            onClick={() => document.getElementById("addBns").showModal()}
          >
            <UserPlus size={16} />
            <span className="text-sm">Add New BNS</span>
          </button>
        </div>
      </div>

      <UserAccessRequests />

      <div className="flex justify-between items-center mb-4 mt-8">
        <div className="">
          <p className="text-2xl font-bold">Pending Requests</p>
          <p className="text-gray-500">Approve requests from beneficiaries and users</p>
        </div>
      </div>

      <div className="w-full flex flex-col px-4">
        {filterData?.map((item) => (
          <div
            key={item._id}
            className={`p-4 mb-[10px] w-full rounded-md border flex flex-col md:flex-row md:items-center justify-between gap-4 border-yellow-500 bg-white shadow-sm`}
          >
            <div className="flex items-center gap-4 w-full">
              <div
                className={`p-2 rounded-full text-yellow-500 bg-yellow-100 `}
              >
                <Clock className="h-5 w-5" />
              </div>
              <div className="w-full">
                {/* Logic to display Name if populated, or ID/String if not */}
                <h4 className="font-medium">
                  {typeof item?.requestedBy === 'object' 
                    ? item?.requestedBy?.fullName 
                    : item?.requestedBy || "Unknown User"}
                </h4>
                
                {/* Optionally show Barangay if available from population */}
                {typeof item?.requestedBy === 'object' && item?.requestedBy?.barangay && (
                   <span className="text-xs text-gray-500 block -mt-1 mb-1">{item.requestedBy.barangay}</span>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-[12px] text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <CircleAlertIcon className="h-3 w-3" />
                    <span className="font-semibold">{item?.reqtype}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Pen className="h-3 w-3" />
                    <span>{item?.content}</span>
                  </div>
                </div>
              </div>

              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm whitespace-nowrap hover:bg-yellow-600 transition"
                onClick={() => approve(item?._id)}
              >
                Accept / Approve
              </button>
            </div>
          </div>
        ))}
        {filterData?.length === 0 && (
            <p className="text-center text-gray-400 italic py-4">No pending requests.</p>
        )}
      </div>
    </div>
  );
}

export default SuperAdminUserApprovalPage;