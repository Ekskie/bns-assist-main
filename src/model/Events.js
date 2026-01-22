import mongoose from "mongoose";

const EventScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    eventStart: {
      type: String,
      required: true,
    },
    eventEnd: {
      type: String,
    },
    eventDate: {
      type: String,
    },
    location: {
      type: String,
    },
    joined: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "joined.userModel", // 👈 Dynamic reference
        },
        userModel: {
          type: String,
          enum: ["LactatingUser", "PregnantUser", "ChildrenNutritionData"], // 👈 must mat
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ✅ Check if model already exists before creating
const Event = mongoose.models.Event || mongoose.model("Event", EventScheme);

export default Event;
