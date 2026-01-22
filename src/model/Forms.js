import mongoose from "mongoose";

const FormsSchema = new mongoose.Schema(
  {
    formName: {
      type: String,
      required: true,
    },
    embeddedLink: {
      type: String,
      required: true,
    },
    mdeText: {
      type: String,
      required: true,
    },
    formType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Forms = mongoose.models.Forms || mongoose.model("Forms", FormsSchema);

export default Forms;
