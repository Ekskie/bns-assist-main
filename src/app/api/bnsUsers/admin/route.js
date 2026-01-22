import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import BnsUser from "@/model/BnsUser";
import BnsUserDiary from "@/model/BnsUserDiary";

export async function GET() {
  try {
    await connectToDatabase();

    const bnsUsers = await BnsUser.find({
      approve: true,
    }).lean();

    const totalBnsUsers = bnsUsers.length;

    if (!bnsUsers.length) {
      return NextResponse.json({
        rows: [],
        activeBarangays: 0,
        reportThisMonthCount: 0,
        totalBnsUsers: 0,
      });
    }

    const barangayMap = {};
    bnsUsers.forEach((user) => {
      const brgy = user.barangay || "Unknown";
      if (!barangayMap[brgy]) barangayMap[brgy] = [];
      barangayMap[brgy].push(user._id.toString());
    });

    const now = Date.now();
    const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;

    const rows = [];
    let reportThisMonthCount = 0;
    let activeBarangays = 0;

    for (const barangay of Object.keys(barangayMap)) {
      const userIds = barangayMap[barangay];

      const diaries = await BnsUserDiary.find({
        userId: { $in: userIds },
      }).lean();

      const totalUsers = userIds.length;

      // Diaries in the last 30 days
      const diariesLast30 = diaries.filter(
        (d) => now - d.createdAt <= THIRTY_DAYS
      );

      const last30Count = diariesLast30.length;
      reportThisMonthCount += last30Count;

      if (last30Count > 0) {
        activeBarangays++;
      }

      const activityPct = Math.min(
        100,
        Math.round((last30Count / (totalUsers * 30)) * 100)
      );

      // Compliance
      let totalTasks = 0;
      let completedTasks = 0;
      diaries.forEach((d) => {
        const allTasks = { ...(d.tasks || {}), ...(d.specialTasks || {}) };
        totalTasks += Object.keys(allTasks).length;
        completedTasks += Object.values(allTasks).filter(Boolean).length;
      });

      const compliancePct =
        totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      // Recency
      let recencyDays = 30;
      if (diaries.length > 0) {
        const latest = Math.max(...diaries.map((d) => d.createdAt));
        recencyDays = Math.round((now - latest) / (1000 * 60 * 60 * 24));
      }

      const recencyScore = Math.max(0, 100 - recencyDays * 10);

      rows.push({
        barangay,
        bnsAssigned: totalUsers,
        activityPct,
        compliancePct,
        recencyDays,
        recencyScore,
        last30Count,
        completedTasks,
        totalTasks,
      });
    }

    return NextResponse.json({
      rows,
      activeBarangays,
      reportThisMonthCount,
      totalBnsUsers,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500 }
    );
  }
}
