import mongoose from "mongoose";

const BnsAdminScheme = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    number: {
      type: String,
    },
    municipality: {
      type: String,
    },
    position: {
      type: String,
    },
    province: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    approve: {
      type: Boolean,
    },
    imgUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Check if model already exists before creating
const BnsAdmin =
  mongoose.models.BnsAdmin || mongoose.model("BnsAdmin", BnsAdminScheme);

export default BnsAdmin;
