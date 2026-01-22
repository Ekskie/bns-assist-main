import mongoose from "mongoose";

const SubmittedFormSchema = new mongoose.Schema(
  {
    formTitle: {
      type: String,
      required: true,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BnsUser",
      required: true,
    },
    barangay: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Archived"],
      default: "Pending",
    },
    submissionDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const SubmittedForm = mongoose.models.SubmittedForm || mongoose.model("SubmittedForm", SubmittedFormSchema);
export default SubmittedForm;