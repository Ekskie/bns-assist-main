import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      default: "Vitamin", // Vitamin, Medicine, Equipment
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    unit: {
      type: String, 
      default: "box", // box, bottle, pcs
    },
    description: {
      type: String,
    },
    distributedCount: {
      type: Number,
      default: 0, // Track how many have been given out total
    }
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.models.Inventory || mongoose.model("Inventory", InventorySchema);
export default Inventory;