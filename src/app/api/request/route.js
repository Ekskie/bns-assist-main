import { NextResponse } from "next/server";
import Request from "@/model/Request";
import BnsUser from "@/model/BnsUser"; // Import BnsUser for population
import connectToDatabase from "@/lib/mongoose";

export async function GET(req) {
  await connectToDatabase();
  try {
    // Populate 'requestedBy' to get user details (fullName, barangay)
    const reqRequest = await Request.find({})
      .populate("requestedBy", "fullName barangay") 
      .sort({ createdAt: -1 });

    return NextResponse.json({ data: reqRequest }, { status: 200 }); 
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch reqRequest" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await connectToDatabase();
  try {
    const body = await req.json();

    if (body.content == "" || body.reqtype == "" || body.requestedBy == "") {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const reqRequest = await Request.create(body);

    return NextResponse.json(reqRequest, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to create reqRequest" },
      { status: 500 }
    );
  }
}

/*APPROVE REQUEST */
export async function PUT(request) {
  await connectToDatabase();

  const body = await request.json();

  const { id } = body;

  if (!id) {
    return NextResponse.json(
      { message: "All Fields are Mandatory!" },
      { status: 400 }
    );
  }

  const requestResult = await Request.findById({
    _id: id,
  }).exec();

  if (requestResult) {
    requestResult.isdone = true;

    const updatedrequest = await requestResult.save();

    if (updatedrequest) {
      return NextResponse.json(
        { message: `request ${requestResult._id} Approve !` },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "Invalid Update" });
    }
  }
}