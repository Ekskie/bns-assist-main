import { NextResponse } from "next/server";
import ChildrenNutritionData from "@/model/ChildrenNutritionData";
import connectToDatabase from "@/lib/mongoose";
import bcrypt from "bcrypt";

/* HELPER FUNCTION TO GENERATE UNIQUE LOGIN CODE */
async function generateUniqueCode() {
  const generateBns_code = () =>
    `BNS-${Math.floor(1000 + Math.random() * 9000)}`;
  let bns_code;
  let exists = true;

  while (exists) {
    bns_code = generateBns_code();
    exists = await PregnantUser.findOne({ bns_code }).maxTimeMS(30000);
  }

  return bns_code;
}

/* GET ALL DATA OF CHILDREN NUTRITION DATA */
export async function GET() {
  connectToDatabase();

  const childrenNutritionData = await ChildrenNutritionData.find().lean();

  if (childrenNutritionData) {
    return NextResponse.json(childrenNutritionData);
  } else {
    return NextResponse.json(
      { message: "No NutritionData Found!" },
      { status: 400 }
    );
  }
}

/* ADD NEW DATA */
export async function POST(request) {
  connectToDatabase();

  const body = await request.json();

  const {
    name,
    mother,
    ageMonths,
    gender,
    status,
    dateRecorded,
    address,
    email,
    number,
    birthDate,
    weightKg,
    heightCm,
    muacCm,
    bmi,
    recommendation,
  } = body;

  if (!name || !status || !mother) {
    return NextResponse.json(
      { message: "All Fields are Mandatory!" },
      { status: 400 }
    );
  }

  const duplicate = await ChildrenNutritionData.findOne({ name }).maxTimeMS(
    30000
  );

  if (duplicate) {
    return NextResponse.json(
      { message: "Child Has already Have Record " },
      { status: 401 }
    );
  }

  if (!weightKg || !heightCm || !muacCm) {
    return NextResponse.json(
      { message: "Missing  measurement  data" },
      { status: 401 }
    );
  }

  const nutritionData = await ChildrenNutritionData.create({
    name,
    mother,
    ageMonths,
    gender,
    dateRecorded,
    address,
    birthDate,
    email,
    number,
    bmi,
    type: "children",
    approve: true,
    bns_code: generateUniqueCode(),
    information: [
      {
        status,
        weightKg,
        heightCm,
        muacCm,
        date: new Date(),
        recommendation,
      },
    ],
  });

  if (nutritionData) {
    return NextResponse.json(nutritionData, { status: 201 });
  } else {
    return NextResponse.json({ message: "Invalid Register" });
  }
}

/*APPROVE / DECLINE NEW CHILDREN DATA  */
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

  const nutritionData = await ChildrenNutritionData.findById({
    _id: id,
  }).exec();

  if (nutritionData && type === "approve") {
    nutritionData.approve = true;

    const updatedNutritionData = await nutritionData.save();

    if (updatedNutritionData) {
      return NextResponse.json(
        { message: `NutritionData ${nutritionData.name} Approve !` },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "Invalid Update" });
    }
  } else if (nutritionData && type === "decline") {
    const result = await nutritionData.deleteOne();

    if (result) {
      return NextResponse.json(
        { message: `NutritionData ${nutritionData.name} Decline !` },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "Invalid Decline" });
    }
  }
}
