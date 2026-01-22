import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    diary: {
      content: { type: String, default: "" },
      imageUrl: { type: String, default: "" },
    },
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

const bnsUserDiarySchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: 'BnsUser' }, // Added ref for population
  date: { type: String, required: true }, // YYYY-MM-DD
  
  // New Fields for Attendance
  timeIn: { type: Date },
  timeOut: { type: Date },
  
  diary: {
    title: { type: String, default: "" },
    content: { type: String, default: "" },
  },
  tasks: {
    type: Map,
    of: taskSchema,
    default: {},
  },
  specialTasks: {
    type: Map,
    of: taskSchema,
    default: {},
  },
  createdAt: { type: Number, default: () => Date.now() },
  updatedAt: { type: Number, default: () => Date.now() },
});

bnsUserDiarySchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.models.BnsUserDiary ||
  mongoose.model("BnsUserDiary", bnsUserDiarySchema);