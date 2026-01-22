import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema(
  {
    reqtype: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isdone: {
      required: true,
      type: Boolean,
    },
    requestedBy: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Check if model already exists before creating
const Request =
  mongoose.models.Request || mongoose.model("Request", RequestSchema);

export default Request;
