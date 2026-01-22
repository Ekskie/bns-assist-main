import mongoose from "mongoose";

const BnsUserSchema = new mongoose.Schema(
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
		barangay: {
			type: String,
		},
		bio: {
			type: String,
		},
		bnsId: {
			type: String,
		},
		type: {
			type: String,
			required: true,
		},
		imgUrl: {
			type: String,
		},
		approve: {
			type: Boolean,
		},
		task: [
			{
				title: {
					type: String,
					required: true,
				},
				description: {
					type: String,
					required: true,
				},
				category: {
					type: String,
					required: true,
				},
				status: {
					type: String,
					required: true,
				},
				verificationImgUrl: { type: String },
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

// ✅ Check if model already exists before creating
const BnsUser =
	mongoose.models.BnsUser || mongoose.model("BnsUser", BnsUserSchema);

export default BnsUser;
