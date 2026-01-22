import mongoose from "mongoose";

const LactatingUserScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    childAge: {
      type: Number,
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
    type: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
    lactatinginformation: [
      {
        weightKg: {
          type: Number,
        },
        breestFeedStatus: {
          type: String,
        },
        muacCm: {
          type: Number,
        },
        pregnacyRisk: {
          type: String,
        },
        supplement: {
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
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ✅ Check if model already exists before creating
const LactatingUser =
  mongoose.models.LactatingUser ||
  mongoose.model("LactatingUser", LactatingUserScheme);

export default LactatingUser;
