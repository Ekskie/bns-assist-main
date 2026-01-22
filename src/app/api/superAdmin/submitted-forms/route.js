import { NextResponse } from "next/server";
import SubmittedForm from "@/model/SubmittedForm";
import BnsUser from "@/model/BnsUser"; // Ensure model is registered
import connectToDatabase from "@/lib/mongoose";

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectToDatabase();
  try {
    // Fetch all submitted forms, populate the submitter's info
    const forms = await SubmittedForm.find({})
      .populate("submittedBy", "fullName barangay")
      .sort({ submissionDate: -1 });

    return NextResponse.json(forms, { status: 200 });
  } catch (error) {
    console.error("Error fetching submitted forms:", error);
    return NextResponse.json({ message: "Error fetching forms" }, { status: 500 });
  }
}