import { connection, NextResponse } from "next/server";
import PregnantUser from "@/model/PregnantUser";
import connectToDatabase from "@/lib/mongoose";

export async function GET(request, context) {
  await connectToDatabase();

  const { id } = context?.params;

  if (!id) {
    return NextResponse.json(
      { message: "All Fields are Mandatory!" },
      { status: 400 }
    );
  }

  const user = await PregnantUser.findOne({ _id: id }).select("-password");

  if (user) {
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ message: "No user found" }, { status: 401 });
  }
}
