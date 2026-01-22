import useAuth from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import { useGetAllRequestQuery } from "@/service/request/requestApiSlice";
import {
  CalendarIcon,
  Check,
  Circle,
  CircleAlert,
  Clock,
  MapPin,
  Pen,
} from "lucide-react";

const ReqList = () => {
  const { name } = useAuth();

  const reqData = useGetAllRequestQuery();

  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (reqData?.data) {
      /*  const filtered = reqData.data.filter(
        (req) => req.requestedBy === name && req.isdone === false
      ); */
      setFilterData(reqData?.data);
    }
  }, [reqData]);

  return (
    <div className="w-full flex flex-col gap-4  max-h-[200px] overflow-y-auto ">
      {filterData?.map((item) => (
        <div
          key={item._id}
          className={`p-4 mb-[10px] rounded-md border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            item?.isdone ? "border-green-500" : "border-yellow-500"
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`p-2 rounded-full  ${
                item?.isdone
                  ? "text-green-500 bg-green-100 "
                  : "text-yellow-500 bg-yellow-100 "
              }`}
            >
              {item?.isdone ? (
                <Check className="h-5 w-5" />
              ) : (
                <Clock className="h-5 w-5" />
              )}
            </div>
            <div>
              <h4 className="font-medium">
                {item?.requestedBy}{" "}
                {!item?.isdone || (
                  <span className=" text-green-500 text-[11px]">
                    Please go to the Office
                  </span>
                )}
              </h4>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-[12px] text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <CircleAlert className="h-3 w-3" />
                  <span>{item?.reqtype}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Pen className="h-3 w-3" />
                  <span>{item?.content}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReqList;
