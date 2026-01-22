import { NextResponse } from "next/server";
import BnsUser from "@/model/BnsUser";
import connectToDatabase from "@/lib/mongoose";
//approved and reject bns worker
export async function PUT(request) {
	await connectToDatabase();

	const body = await request.json();

	const { id, type } = body;

	if (!id || !type) {
		return NextResponse.json(
			{ message: "All Fields are Mandatory!" },
			{ status: 400 }
		);
	}

	const bnsWorkerData = await BnsUser.findById({
		_id: id,
	}).exec();

	if (bnsWorkerData && type === "approve") {
		bnsWorkerData.approve = true;

		const updatedbnsWorkerData = await bnsWorkerData.save();

		if (updatedbnsWorkerData) {
			return NextResponse.json(
				{ message: `Bns worker ${bnsWorkerData.fullName} Approve !` },
				{ status: 201 }
			);
		} else {
			return NextResponse.json({ message: "Invalid Update" });
		}
	} else if (bnsWorkerData && type === "decline") {
		const result = await bnsWorkerData.deleteOne();

		if (result) {
			return NextResponse.json(
				{ message: `Bns worker ${bnsWorkerData.fullName} Decline !` },
				{ status: 201 }
			);
		} else {
			return NextResponse.json({ message: "Invalid Decline" });
		}
	}
}
