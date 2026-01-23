import dbConnect from "@/lib/mongoose";
import BnsUser from "@/model/BnsUser";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status");
    const barangay = searchParams.get("barangay");

    const query = {};

    // Filter by status
    // CRITICAL FIX: If status is "All", we do NOT set the query.status field.
    // This ensures we fetch Active, Inactive, Pending, and any other status.
    if (status && status !== "All") {
      query.status = status;
    }

    // Filter by barangay
    if (barangay && barangay !== "All") {
      query.barangay = barangay;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { firstname: { $regex: search, $options: "i" } },
        { lastname: { $regex: search, $options: "i" } },
        { emailAddress: { $regex: search, $options: "i" } },
        { bnsnumber: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    // Fetch users with pagination
    const users = await BnsUser.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by newest first

    const totalUsers = await BnsUser.countDocuments(query);

    return NextResponse.json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      totalUsers,
    });
  } catch (error) {
    console.error("Error fetching BNS users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}