import { NextResponse } from "next/server";
import ChildrenNutritionData from "@/model/ChildrenNutritionData";
import connectToDatabase from "@/lib/mongoose";

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectToDatabase();
  try {
    // We need to aggregate data to find the latest status for each child
    // Since 'information' is an array, we take the last element ($last)
    
    const stats = await ChildrenNutritionData.aggregate([
      {
        $project: {
          name: 1,
          address: 1, // Assumed to be Barangay
          latestInfo: { $arrayElemAt: ["$information", -1] } // Get the most recent record
        }
      },
      {
        $group: {
          _id: "$address", // Group by Barangay
          totalChildren: { $sum: 1 },
          normalCount: { 
            $sum: { $cond: [{ $eq: ["$latestInfo.status", "Normal"] }, 1, 0] } 
          },
          underweightCount: { 
            $sum: { $cond: [{ $or: [{ $eq: ["$latestInfo.status", "Underweight"] }, { $eq: ["$latestInfo.status", "Severely Underweight"] }] }, 1, 0] } 
          },
          overweightCount: { 
            $sum: { $cond: [{ $or: [{ $eq: ["$latestInfo.status", "Overweight"] }, { $eq: ["$latestInfo.status", "Obese"] }] }, 1, 0] } 
          },
          // Collect specific names for the "List" requirement
          malnourishedList: {
            $push: {
              $cond: [
                 { $ne: ["$latestInfo.status", "Normal"] },
                 { name: "$name", status: "$latestInfo.status" },
                 "$$REMOVE"
              ]
            }
          }
        }
      }
    ]);

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching stats" }, { status: 500 });
  }
}