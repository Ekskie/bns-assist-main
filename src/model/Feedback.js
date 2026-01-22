import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    rate: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    isProgramFeedback: {
      type: Boolean,
      required: true,
    },
    programId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  },
  {
    timestamps: true,
  }
);

const Feedback =
  mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);

export default Feedback;
