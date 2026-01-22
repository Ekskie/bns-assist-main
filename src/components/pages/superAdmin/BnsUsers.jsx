"use client";
import PaginatedUserTable from "@/components/superAdmin/PaginatedUserTable";
import { useState } from "react";

const BARANGAY_OPTIONS = [
	"Barangay San Isidro",
	"Barangay Malinis",
	"Barangay Poblacion",
	"Barangay Mabini",
	"Barangay Dalandanan",
];

export default function SuperAdminBnsUsersPage() {
	const [isViewing, setIsViewing] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [userData, setUserData] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};
	console.log(userData);
	return (
		<div className="text-black">
			<div className="">
				<p className="text-2xl font-bold">ALL BNS Users</p>
				<p className="text-gray-500">
					Manage all Barangay Nutrition Scholar (BNS) users in the system.
				</p>
			</div>
			{!isViewing && !isEditing && (
				<>
					<PaginatedUserTable
						setEditing={setIsEditing}
						setViewing={setIsViewing}
						setUserDatas={setUserData}
					/>
				</>
			)}

			{isViewing && (
				<>
					<div className="bg-white p-6 rounded-xl shadow my-6">
						{userData && (
							<>
								<h2 className="text-xl font-bold text-gray-800 mb-4">
									BNS User Details
								</h2>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
									<div>
										<span className="font-medium">First Name:</span>{" "}
										{userData.firstname}
									</div>
									<div>
										<span className="font-medium">Last Name:</span>{" "}
										{userData.lastname}
									</div>
									<div>
										<span className="font-medium">Email:</span>{" "}
										{userData.emailAddress}
									</div>
									<div>
										<span className="font-medium">Contact Number:</span>{" "}
										{userData.number}
									</div>
									<div>
										<span className="font-medium">Barangay:</span>{" "}
										{userData.barangay}
									</div>
									<div>
										<span className="font-medium">BNS Number:</span>{" "}
										{userData.bnsnumber}
									</div>
									<div>
										<span className="font-medium">Type:</span> {userData.type}
									</div>
									<div>
										<span className="font-medium">Status:</span>{" "}
										<span
											className={`inline-block px-2 py-1 rounded text-xs ${
												userData.status === "Active"
													? "bg-green-100 text-green-700"
													: "bg-gray-200 text-gray-600"
											}`}
										>
											{userData.status}
										</span>
									</div>
								</div>
							</>
						)}
					</div>
					<div className="">
						<button
							className="bg-gray-500 btn border-none px-6"
							onClick={() => {
								setIsViewing(false);
								setUserData({});
							}}
						>
							Back
						</button>
					</div>
				</>
			)}
			{isEditing && (
				<>
					<form className="bg-white shadow rounded-xl p-6 w-full space-y-4 mt-6">
						<h2 className="text-xl font-bold text-gray-800 mb-2">
							Edit BNS User
						</h2>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
							<div className="bg-white">
								<label className="font-medium text-gray-700">First Name</label>
								<input
									type="text"
									name="firstname"
									value={userData.firstname}
									onChange={handleChange}
									className="input input-bordered w-full mt-1 bg-white border border-gray-500"
								/>
							</div>
							<div>
								<label className="font-medium text-gray-700">Last Name</label>
								<input
									type="text"
									name="lastname"
									value={userData.lastname}
									onChange={handleChange}
									className="input input-bordered w-full mt-1 bg-white border border-gray-500"
								/>
							</div>
							<div>
								<label className="font-medium text-gray-700">Email</label>
								<input
									type="email"
									name="emailAddress"
									value={userData.emailAddress}
									onChange={handleChange}
									className="input input-bordered w-full mt-1 bg-white border border-gray-500"
								/>
							</div>
							<div>
								<label className="font-medium text-gray-700">
									Contact Number
								</label>
								<input
									type="text"
									name="number"
									value={userData.number}
									onChange={handleChange}
									className="input input-bordered w-full mt-1 bg-white border border-gray-500"
								/>
							</div>
							<div>
								<label className="font-medium text-gray-700">Barangay</label>
								<select
									name="barangay"
									value={userData.barangay}
									onChange={handleChange}
									className="select select-bordered w-full mt-1 bg-white border border-gray-500"
								>
									<option value="">Select Barangay</option>
									{BARANGAY_OPTIONS.map((brgy) => (
										<option key={brgy} value={brgy}>
											{brgy}
										</option>
									))}
								</select>
							</div>
							
			
							<div>
								<label className="font-medium text-gray-700">Status</label>
								<select
									name="status"
									value={userData.status}
									onChange={handleChange}
									className="select select-bordered w-full mt-1 bg-white border border-gray-500"
								>
									<option value="Active">Active</option>
									<option value="Inactive">Inactive</option>
								</select>
							</div>
						</div>

						<div className="flex justify-end gap-2 mt-4">
							<button
								type="button"
								className="btn btn-ghost border-gray-300"
								onClick={()=>{
									setIsEditing(false)
									setUserData({})
								}}
							>
								Cancel
							</button>
							<button type="submit" className="btn bg-[#28a745] text-white">
								Save
							</button>
						</div>
					</form>
				</>
			)}
		</div>
	);
}
