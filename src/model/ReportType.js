import mongoose from "mongoose";
const reportTypeSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		frequency: {
			type: String,
			enum: ["monthly", "quarterly", "annual"],
			required: true,
		},
		formTemplateUrl: { type: String, required: true }, // direct link to the uploaded form
		// assignedToType: {
		// 	type: String,
		// 	enum: ["all", "barangay", "user"],
		// 	default: "all",
		// },
		// sa ngayon wala pato, pag nag ka meron yung admin account mag adadd sya ng barangay code na sakop nya tapos lahat ng andon sa code base dunsa barangay code ay yun lang masesendan
		active: { type: Boolean, default: true }, // pwede sya di i activate pero bawal i delete
	},
	{ timestamps: true }
);
const ReportType =
	mongoose.models.ReportType || mongoose.model("ReportType", reportTypeSchema);
export default ReportType;
