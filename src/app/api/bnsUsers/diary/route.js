import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import BnsUserDiary from "@/model/BnsUserDiary";
import { generateTasksForDay } from "./utils";

// CREATE diary (auto-generate when user clicks button)
export async function POST(req) {
  try {
    await connectToDatabase();
    const { userId } = await req.json();
    if (!userId) throw new Error("UserId is required");

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    const dayName = today
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();

    // Prevent weekend diary creation
    if (dayName === "saturday" || dayName === "sunday") {
      return NextResponse.json(
        { success: false, message: "No diary on weekends" },
        { status: 400 }
      );
    }

    // Check if diary already exists
    let diary = await BnsUserDiary.findOne({ userId, date: formattedDate });
    if (diary) {
      return NextResponse.json({
        success: true,
        diary,
        message: "Diary already exists for today",
      });
    }

    // Generate tasks for today
    const tasks = generateTasksForDay(dayName);

    diary = await BnsUserDiary.create({
      userId,
      date: formattedDate,
      diary: { title: "", content: "" },
      tasks,
    });
    console.log(diary)

    return NextResponse.json({
      success: true,
      diary,
      message: "Diary created for today",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// READ diary entries (optional date filter)
export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const date = searchParams.get("date"); // optional

    if (!userId) throw new Error("UserId is required");

    const query = { userId };
    if (date) query.date = date;

    const diaries = await BnsUserDiary.find(query).sort({ date: -1 });

    return NextResponse.json({ success: true, diaries });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// UPDATE diary (update diary content, regular tasks, or special tasks)
export async function PATCH(req) {
  try {
    await connectToDatabase();
    const { diaryId, diary, tasks, specialTasks } = await req.json();
    if (!diaryId) throw new Error("DiaryId is required");

    const updateData = { updatedAt: Date.now() };

    if (diary) updateData.diary = diary;
    if (tasks) updateData.tasks = tasks;
    if (specialTasks) updateData.specialTasks = specialTasks;

    const updatedDiary = await BnsUserDiary.findByIdAndUpdate(
      diaryId,
      updateData,
      { new: true }
    );

    return NextResponse.json({ success: true, diary: updatedDiary });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
