import mongoose from "mongoose";

const ChildrenDataScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mother: {
      type: String,
      required: true,
    },
    ageMonths: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    approve: {
      type: Boolean,
    },
    email: {
      type: String,
    },
    number: {
      type: String,
    },
    bns_code: {
      type: String,
    },
    bmi: {
      type: Number,
    },
    type: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
    information: [
      {
        weightKg: {
          type: Number,
          required: true,
        },
        heightCm: {
          type: Number,
          required: true,
        },
        muacCm: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
        },
        recommendation: [
          {
            title: {
              type: String,
            },
            description: {
              type: String,
            },
          },
        ],
        date: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ✅ Check if model already exists before creating to prevent overwrite errors in dev
const ChildrenNutritionData =
  mongoose.models.ChildrenNutritionData ||
  mongoose.model("ChildrenNutritionData", ChildrenDataScheme);

export default ChildrenNutritionData;