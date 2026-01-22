import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import generateReport from "@/model/GenerateReport";
import reportType from "@/model/ReportType";

// get all generated report
export async function GET(request) {
	try {
		await connectToDatabase();

		const reports = await generateReport
			.find()
			.sort({ createdAt: -1 }) // newest first
			.populate("reportTypeId") // optional: populate report type details
			.lean();

		return NextResponse.json(reports, { status: 200 });
	} catch (error) {
		console.error("Error fetching reports:", error);
		return NextResponse.json(
			{ error: "Failed to fetch reports" },
			{ status: 500 }
		);
	}
}
