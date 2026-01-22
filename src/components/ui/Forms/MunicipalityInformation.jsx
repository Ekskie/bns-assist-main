"use client";
import { useState } from "react";

export default function MunicipalityInformationForm() {
	const [formData, setFormData] = useState({
		municipalityName: "San Juan",
		province: "Lagune",
		region: "CALABARZON",
		populationCount: "9999",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Submitted Data:", formData);
		// Optionally call API to update profile here
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-6 rounded-lg shadow w-full"
		>
			<h2 className="text-2xl font-bold text-gray-800 mb-1">
				Municipality Information
			</h2>
			<p className="text-sm text-gray-500 mb-6">
				Update your municipality details.
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Municipality Name */}
				<div>
					<label
						htmlFor="municipalityName"
						className="block text-sm font-medium text-gray-700"
					>
						Municipality Name
					</label>
					<input
						type="text"
						id="municipalityName"
						name="municipalityName"
						value={formData.municipalityName}
						onChange={handleChange}
						className="mt-1 block w-full rounded border border-gray-300 text-sm p-2"
					/>
				</div>

				{/* Province */}
				<div>
					<label
						htmlFor="province"
						className="block text-sm font-medium text-gray-700"
					>
						Province
					</label>
					<input
						type="text"
						id="province"
						name="province"
						value={formData.province}
						onChange={handleChange}
						className="mt-1 block w-full rounded border border-gray-300 text-sm p-2"
					/>
				</div>

				{/* Region */}
				<div>
					<label
						htmlFor="region"
						className="block text-sm font-medium text-gray-700"
					>
						Region
					</label>
					<input
						type="text"
						id="region"
						name="region"
						value={formData.region}
						onChange={handleChange}
						className="mt-1 block w-full rounded border border-gray-300 text-sm p-2"
					/>
				</div>

				{/* Population Count */}
				<div>
					<label
						htmlFor="populationCount"
						className="block text-sm font-medium text-gray-700"
					>
						Phone Number
					</label>
					<input
						type="number"
						id="populationCount"
						name="populationCount"
						value={formData.populationCount}
						onChange={handleChange}
						className="mt-1 block w-full rounded border border-gray-300 text-sm p-2"
					/>
				</div>
			</div>

			<div className="mt-6">
				<button
					type="submit"
					className="px-5 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700"
				>
					Save Changes
				</button>
			</div>
		</form>
	);
}
