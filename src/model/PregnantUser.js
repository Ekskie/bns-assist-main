import mongoose from "mongoose";

const PregnantUserScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    expectedDelivery: {
      type: String,
      required: true,
    },
    pregnancyAge: {
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
    pregnantinformation: [
      {
        bloodPressure: {
          type: String,
        },
        weightKg: {
          type: Number,
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
        note: {
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
const PregnantUser =
  mongoose.models.PregnantUser ||
  mongoose.model("PregnantUser", PregnantUserScheme);

export default PregnantUser;
