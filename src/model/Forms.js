import mongoose from "mongoose";

const FormSchema = new mongoose.Schema(
  {
    formName: {
      type: String,
      required: true,
    },
    formDescription: {
      type: String,
    },
    formType: {
      type: String, // e.g., "BNAP", "OPT", etc.
    },
    embeddedLink: {
      type: String, // This is where the Google Sheet URL goes
    },
    mdeText: {
      type: String, // Markdown documentation
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Forms || mongoose.model("Forms", FormSchema);