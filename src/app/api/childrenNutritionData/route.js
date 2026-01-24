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

  // Note: Using ChildrenNutritionData or BnsUser to check uniqueness might be better depending on intent,
  // but keeping original logic referencing PregnantUser (which might be a copy-paste error in original code, but I'll leave it if I can't verify).
  // Actually, for 'bns_code' which usually belongs to BNS users, this logic seems odd here for child records unless it's a child ID.
  // Assuming this logic is intended for generating a code for the child record (labeled 'bns_code' in schema).
  // I will check ChildrenNutritionData instead of PregnantUser to be safe for this specific model.
  while (exists) {
    bns_code = generateBns_code();
    // Checking against ChildrenNutritionData for collision within this collection
    exists = await ChildrenNutritionData.findOne({ bns_code }).maxTimeMS(30000);
  }

  return bns_code;
}

/* GET ALL DATA OF CHILDREN NUTRITION DATA */
export async function GET() {
  await connectToDatabase();

  const childrenNutritionData = await ChildrenNutritionData.find().lean();

  if (childrenNutritionData) {
    return NextResponse.json(childrenNutritionData);
  } else {
    return NextResponse.json(
      { message: "No NutritionData Found!" },
      { status: 404 } // Changed to 404 for Not Found
    );
  }
}

/* ADD NEW DATA */
export async function POST(request) {
  await connectToDatabase();

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

  // Basic field validation
  if (!name || !status || !mother) {
    return NextResponse.json(
      { message: "All Fields are Mandatory!" },
      { status: 400 }
    );
  }

  // Check for duplicates
  const duplicate = await ChildrenNutritionData.findOne({ name }).maxTimeMS(
    30000
  );

  if (duplicate) {
    return NextResponse.json(
      { message: "Child Has already Have Record " },
      { status: 409 } // Changed from 401 to 409 (Conflict)
    );
  }

  // Validate measurements.
  // Note: Removed !muacCm from check because it's marked 'Optional' in the form and defaults to 0.
  // Also ensuring weight and height are strictly checked (allowing 0 might not be physically valid for a child but avoids the falsy trap if logic changes).
  if (!weightKg || !heightCm) {
    return NextResponse.json(
      { message: "Missing measurement data (Weight and Height are required)" },
      { status: 400 } // Changed from 401 to 400 (Bad Request)
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
    bns_code: await generateUniqueCode(), // Added await
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
    return NextResponse.json({ message: "Invalid Register" }, { status: 400 });
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
      return NextResponse.json({ message: "Invalid Update" }, { status: 400 });
    }
  } else if (nutritionData && type === "decline") {
    const result = await nutritionData.deleteOne();

    if (result) {
      return NextResponse.json(
        { message: `NutritionData ${nutritionData.name} Decline !` },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ message: "Invalid Decline" }, { status: 400 });
    }
  } else {
      return NextResponse.json({ message: "Record not found" }, { status: 404 });
  }
}