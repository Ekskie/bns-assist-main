import mongoose from "mongoose";

const generatedReportSchema = new mongoose.Schema(
	{
		reportTypeId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ReportType",
			required: true,
		},
		title: { type: String, required: true, trim: true },
		period: { type: String, required: true, trim: true }, // e.g. "June 2025"
		dueDate: { type: Date, required: true },
		frequency: {
			type: String,
			enum: ["monthly", "quarterly", "annual"],
			required: true,
		},
		submissions: [
			{
				userId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
				submittedAt: { type: Date, default: Date.now },
				fileUrl: { type: String, required: true, trim: true },
				textContent: { type: String, trim: true },
			},
		],
	},
	{ timestamps: true }
);

const generateReport =
	mongoose.models.generateReport ||
	mongoose.model("generateReport", generatedReportSchema);

export default generateReport;
