"use client";
import React from "react";
import { useGetOneLactatingDataQuery } from "@/service/lactatingData/lactatingDataApiSlice";
import UpdateRecordLactating from "@/components/bnsUser/lactatingData/UpdateRecordLactating";
function Page({ params }) {
	const { id } = React.use(params);
	const { data: lactatingUser } = useGetOneLactatingDataQuery(id);
	console.log(lactatingUser);
	return (
		<div className="h-full w-full max-w-[1220px] max-h-[1000px]  mx-auto px-4 py-6 ">
			{/* Name Title*/}
			<div className="w-full flex flex-col mb-[32px] ">
				<h1 className="text-3xl font-bold ">Update/Upload Data Records</h1>
				<p className="text-[16px] text-[#64748b] mb-2 ">
					Edit and Add ne Record for Monthly Checkups
				</p>
			</div>
			<UpdateRecordLactating data={lactatingUser} />
		</div>
	);
}

export default Page;
