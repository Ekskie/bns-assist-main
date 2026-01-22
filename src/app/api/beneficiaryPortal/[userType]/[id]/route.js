import { connection, NextResponse } from "next/server";
import ChildrenNutritionData from "@/model/ChildrenNutritionData";
import PregnantUser from "@/model/PregnantUser";
import LactatingUser from "@/model/LactatingUser";
import connectToDatabase from "@/lib/mongoose";

export async function GET(request, { params }) {
  await connectToDatabase();

  const { userType, id } = params;

  if (!userType) {
    return NextResponse.json(
      { message: "All Fields are Mandatory!" },
      { status: 400 }
    );
  }

  if (userType === "children") {
    const user = await ChildrenNutritionData.findOne({ _id: id }).select(
      "-password"
    );

    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ message: "No user found" }, { status: 401 });
    }
  } else if (userType === "pregnant") {
    const user = await PregnantUser.findOne({ _id: id }).select("-password");

    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ message: "No user found" }, { status: 401 });
    }
  } else if (userType === "lactating") {
    const user = await LactatingUser.findOne({ _id: id }).select("-password");

    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ message: "No user found" }, { status: 401 });
    }
  } else {
    return NextResponse.json({ message: "No user found" }, { status: 401 });
  }
}
