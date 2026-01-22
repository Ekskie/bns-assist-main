import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Forms from "@/model/Forms";

export async function GET(request, { params }) {
  const { userType, id } = params;
  await connectToDatabase();
  const forms = await Forms.findById(id).lean();

  return NextResponse.json(forms);
}
