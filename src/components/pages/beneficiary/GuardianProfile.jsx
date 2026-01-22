"use client";
import useAuth from "@/hooks/useAuth";
import {
  useGetuserAccountDataQuery,
  useUpdateBeneficiaryDataMutation,
} from "@/service/beneficiaryPortal/beneficiaryApiSlice";
import { selectBeneficiary } from "@/service/beneficiaryPortal/beneficiaryPortalSlice";
import {
  User,
  Phone,
  Mail,
  MapPin,
  FileEdit,
  Save,
  SquarePen,
  Calendar,
  UserRound,
  FileText,
  Clipboard,
} from "lucide-react";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function GuardianProfilePage() {
  const { type, user_type, id } = useAuth();

  /* API CALL */
  const beneficiaryData = useGetuserAccountDataQuery({ id, user_type });

  const [updateUser, { isSuccess, isError, error }] =
    useUpdateBeneficiaryDataMutation();

  const [editMode, setEditMode] = useState(false);

  const [userData, setuserData] = useState("");

  useEffect(() => {
    if (beneficiaryData?.data) {
      setuserData(beneficiaryData?.data);
    }
  }, [beneficiaryData?.data]);

  const formateDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const splitFullName = (fullName) => {
    const parts = fullName.trim().split(/\s+/); // split by any whitespace
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ") || ""; // in case there's no last name
    return { firstName, lastName };
  };

  const onChangeValue = (e) => {
    const { value, name } = e.target;

    console.log(value, name);

    setuserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const hasChanges =
    userData.name !== beneficiaryData?.data?.name ||
    userData.address !== beneficiaryData?.data?.address ||
    userData.number !== beneficiaryData?.data?.number ||
    userData.email !== beneficiaryData?.data?.email;

  const updateNow = async () => {
    if (hasChanges) {
      const res = await updateUser({
        address: userData?.address,
        email: userData?.email,
        name: userData?.name,
        number: parseInt(userData?.number),
        id,
        user_type,
      });

      if (res && !isError && !error) {
        console.log({
          address: userData?.address,
          email: userData?.email,
          name: userData?.name,
          number: userData?.number,
          id,
          user_type,
        });

        console.log(res);

        toast.success("Updated Data !", {
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        });

        window.location.reload();
      } else {
        toast.error(error?.status, {
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      }
    }
  };

  return (
    <div className="text-black">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center ">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {user_type === "children"
              ? "Guardian Profile"
              : "Beneficiary Profile"}
          </h1>
          <p className="text-muted-foreground">
            Your personal information and account details
          </p>
        </div>
      </div>

      {/*Guardian Profile */}
      <div className="p-6 bg-white my-6 rounded-2xl shadow">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="relative">
            <div className="h-24 w-24 border-bns-primary rounded-full overflow-hidden">
              {userData?.imgUrl ? (
                <img
                  src={userData?.imgUrl}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="/asset/default-dp.jpg"
                  className="w-full h-full object-cover scale-[1.2]"
                />
              )}
            </div>
          </div>

          <div className="flex-1 space-y-2 text-center md:text-left">
            <div>
              <h2 className="text-2xl font-bold">{userData?.name}</h2>
              <p className="text-muted-foreground">ID: {userData?._id}</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {user_type === "children" ? (
                <>
                  <div
                    variant="outline"
                    className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    Primary Guardian
                  </div>
                  <div
                    variant="outline"
                    className="bg-green-50 text-green-700 hover:bg-green-100"
                  >
                    Mother
                  </div>
                  <div
                    variant="outline"
                    className="bg-purple-50 text-purple-700 hover:bg-purple-100"
                  >
                    Active
                  </div>
                </>
              ) : (
                <>
                  {user_type === "pregnant" ? (
                    <>
                      <div
                        variant="outline"
                        className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                      >
                        Pregnant
                      </div>

                      <div
                        variant="outline"
                        className="bg-purple-50 text-purple-700 hover:bg-purple-100"
                      >
                        Active
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="bg-blue-50 px-4 py-2 rounded-md">
              <p className="text-sm text-blue-700">Account Created</p>
              <p className="font-medium text-blue-900">
                {formateDate(userData?.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 max-[640px]:flex-col">
        {/*Personal Information */}
        <div className="bg-white p-6 rounded-2xl shadow w-5/10  max-[640px]:w-full">
          <div>
            <div className="flex items-center gap-2 text-2xl font-semibold">
              <User className="h-5 w-5 text-green-500" />
              Personal Information
            </div>
            <div className="text-gray-500">
              Your personal details and contact information
            </div>
          </div>

          <div className="space-y-4 mt-6">
            {/*  */}
            <div className="flex w-full gap-4">
              <div className="space-y-2 w-full">
                <label htmlFor="name" className="font-semibold ">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="px-[8px] py-[12px] w-full outline-none rounded-md border border-gray-200  text-black text-[14px]  focus:ring-1 focus:ring-[#4CAF50] focus:ring-offset-2"
                  name="name"
                  placeholder="Enter Report Title"
                  value={userData ? userData?.name : "loadng"}
                  onChange={(e) => onChangeValue(e)}
                />
              </div>
            </div>
            {/*  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-1 font-semibold">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  Phone Number
                </label>
                <input
                  type="text"
                  id="number"
                  className="px-[8px] py-[12px] w-full outline-none rounded-md border border-gray-200  text-black text-[14px]  focus:ring-1 focus:ring-[#4CAF50] focus:ring-offset-2"
                  name="number"
                  placeholder="Enter Report Title"
                  value={userData ? userData?.number : "loading"}
                  onChange={(e) => onChangeValue(e)}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1 font-semibold">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email Address
                </label>
                <input
                  type="text"
                  id="email"
                  className="px-[8px] py-[12px] w-full outline-none rounded-md border border-gray-200  text-black text-[14px]  focus:ring-1 focus:ring-[#4CAF50] focus:ring-offset-2"
                  name="email"
                  placeholder="Enter Report Title"
                  value={userData ? userData?.email : "loadng"}
                  onChange={(e) => onChangeValue(e)}
                />
              </div>
            </div>

            {/*  */}

            <div className="w-full flex  gap-4">
              <div className="space-y-2 w-full">
                <label htmlFor="municipality" className="font-semibold">
                  Municipality
                </label>
                <input
                  type="text"
                  id="reportTitle"
                  className="px-[8px] py-[12px] w-full outline-none rounded-md border border-gray-200  text-black text-[14px]  focus:ring-1 focus:ring-[#4CAF50] focus:ring-offset-2"
                  name="reportTitle"
                  placeholder="Enter Report Title"
                  value={""}
                  /*   onChange={(e) => setTitle(e?.target?.value)} */
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-1 font-semibold">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Home Address
              </label>
              <input
                type="text"
                id="address"
                className="px-[8px] py-[12px] w-full outline-none rounded-md border border-gray-200  text-black text-[14px]  focus:ring-1 focus:ring-[#4CAF50] focus:ring-offset-2"
                name="address"
                placeholder="Enter Report Title"
                value={userData ? userData?.address : "loadng"}
                onChange={(e) => onChangeValue(e)}
              />
            </div>

            <button
              variant={editMode ? "default" : "outline"}
              className={`flex gap-2 bg-green-500 text-white py-2 px-6 rounded justify-center items-center cursor-pointer ${
                hasChanges ? "" : "opacity-50"
              }`}
              onClick={updateNow}
            >
              {!hasChanges ? (
                <>
                  <FileEdit className="h-4 w-4" />
                  Edit Profile
                </>
              ) : (
                <>
                  <SquarePen className="h-4 w-4" />
                  Update Changes
                </>
              )}
            </button>
          </div>
        </div>
        {/*family information */}
        <div className="bg-white w-5/10 p-6 rounded-2xl shadow max-[640px]:w-full">
          <div>
            <div className="flex items-center gap-2 text-2xl font-semibold">
              <UserRound className="h-5 w-5 text-green-500" />
              Family Information
            </div>
            <div className="text-gray-500">
              Details about your accounts and important information
            </div>
          </div>
          <div className="space-y-4 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-md font-medium">
                  {user_type === "children"
                    ? "Registered Children"
                    : "Registered Beneficiary"}
                </h3>
                <div className="bg-blue-50 text-blue-700 px-2 rounded-2xl">
                  {user_type === "children" ? "1 Child" : ""}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 flex items-center justify-center">
                    {userData?.name?.slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-medium">{userData?.name}</h4>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />

                        {user_type === "children" ? (
                          <span>
                            {userData?.ageMonths} months old (DOB:
                            {formateDate(userData?.birthDate)})
                          </span>
                        ) : (
                          <span>{formateDate(userData)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {user_type !== "children" || (
              <div className="space-y-2">
                <label className="font-semibold">Relationship to Child</label>

                <p className="text-sm py-2">Mother</p>
              </div>
            )}

            <div>
              <h3 className="text-md font-medium mb-2">Recent Activity</h3>
              <div className="space-y-2">
                <div className="bg-muted/30 p-2 rounded-md flex justify-between items-center">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm">Viewed nutrition records</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Today, 10:30 AM
                  </span>
                </div>

                <div className="bg-muted/30 p-2 rounded-md flex justify-between items-center">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-purple-500 mr-2" />
                    <span className="text-sm">Scheduled an appointment</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Yesterday, 02:15 PM
                  </span>
                </div>

                <div className="bg-muted/30 p-2 rounded-md flex justify-between items-center">
                  <div className="flex items-center">
                    <Clipboard className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Updated contact information</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    May 02, 2025
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuardianProfilePage;
