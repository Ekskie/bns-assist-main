import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Forms from "@/model/Forms";

export async function GET() {
  await connectToDatabase();
  const forms = await Forms.find().lean();
  return NextResponse.json(forms);
}

export async function POST(req) {
  await connectToDatabase();
  try {
    const body = await req.json();

    if (
      body.formName == "" ||
      body.embeddedLink == "" ||
      body.mdeText == "" ||
      body.formType == ""
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const forms = await Forms.create(body);

    return NextResponse.json(forms, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to create forms" },
      { status: 500 }
    );
  }
}
