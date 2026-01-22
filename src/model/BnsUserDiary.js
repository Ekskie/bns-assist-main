import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    diary: {
      content: { type: String, default: "" },
      imageUrl: { type: String, default: "" },
    },
    completed: { type: Boolean, default: false }, // optional but recommended
  },
  { _id: false }
);

const bnsUserDiarySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
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

// Ensure only one diary per user per day
bnsUserDiarySchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.models.BnsUserDiary ||
  mongoose.model("BnsUserDiary", bnsUserDiarySchema);
