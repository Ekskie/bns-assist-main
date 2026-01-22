import mongoose from "mongoose";

const NotificationsSchema = new mongoose.Schema(
  {
    notif_type: {
      type: String,
      required: true,
    },
    barangay: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notifications =
  mongoose.models.Notifications ||
  mongoose.model("Notifications", NotificationsSchema);

export default Notifications;
