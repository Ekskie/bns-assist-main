import { connection, NextResponse } from "next/server";
import BnsUser from "@/model/BnsUser";
import connectToDatabase from "@/lib/mongoose";

export async function GET(request, context) {
  await connectToDatabase();

  const { userId } = context?.params;

  if (!userId) {
    return NextResponse.json(
      { message: "All Fields are Mandatory!" },
      { status: 400 }
    );
  }

  const user = await BnsUser.findOne({ _id: userId }).select("-password");

  if (user) {
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ message: "No user found" }, { status: 401 });
  }
}
