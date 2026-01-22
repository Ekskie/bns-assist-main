import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import ChildrenNutritionData from "@/model/ChildrenNutritionData";

export async function GET() {
  try {
    await connectToDatabase();

    // Fetch all children who have at least one record
    const children = await ChildrenNutritionData.find().lean();

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Prepare result object for all 12 months
    const results = monthNames.map((m) => ({
      month: m,
      Underweight: 0,
      Normal: 0,
      Overweight: 0,
    }));

    // Loop through each child
    children.forEach((child) => {
      (child.information || []).forEach((record) => {
        if (!record.date || !record.status) return;

        const monthIndex = new Date(record.date).getMonth();
        const status = record.status;

        // Match the record to one of the categories
        if (status.toLowerCase() === "underweight") {
          results[monthIndex].Underweight++;
        } else if (status.toLowerCase() === "normal") {
          results[monthIndex].Normal++;
        } else if (status.toLowerCase() === "overweight") {
          results[monthIndex].Overweight++;
        }
      });
    });

    return NextResponse.json({
      success: true,
      data: results,
    });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      { success: false, message: "Server error", details: err.message },
      { status: 500 }
    );
  }
}
