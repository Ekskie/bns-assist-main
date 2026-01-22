"use client";

import { useState } from "react";
import { Filter, Search, UserPlus } from "lucide-react";
import NewBnsModal from "../ui/modals/NewBnsModal";

const USERS = [
	{
		firstname: "Juan",
		lastname: "Dela Cruz",
		emailAddress: "juan.delacruz@example.com",
		bnsnumber: "BNS12345678",
		number: "09171234567",
		barangay: "Barangay San Isidro",
		password: "SecureP@ssw0rd",
		confirmPassword: "SecureP@ssw0rd",
		status: "Active",
		type: "bns-worker",
	},
];

const ITEMS_PER_PAGE = 5;

export default function PaginatedUserTable({
	setViewing,
	setEditing,
	setUserDatas,
}) {
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);

	const filteredUsers = USERS.filter(
		(u) =>
			u.firstname.toLowerCase().includes(search.toLowerCase()) ||
			u.lastname.toLowerCase().includes(search.toLowerCase())
	);

	const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
	const startIndex = (page - 1) * ITEMS_PER_PAGE;
	const paginatedUsers = filteredUsers.slice(
		startIndex,
		startIndex + ITEMS_PER_PAGE
	);

	return (
		<div className="bg-white p-6 rounded-xl shadow my-6">
			{/* Header */}
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-bold text-gray-800">All BNS Users</h2>
				<div className="flex gap-2 items-center">
					<div className="relative w-full h-9">
						<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
							<Search size={16} />
						</span>
						<input
							type="text"
							placeholder="Search users..."
							className="w-full h-full pl-10 pr-4 py-2 rounded-lg bg-white text-sm outline-none border border-gray-200"
							value={search}
							onChange={(e) => {
								setPage(1); // reset to page 1 when searching
								setSearch(e.target.value);
							}}
						/>
					</div>
					<div className="flex items-center justify-center h-9 w-9 px-2 rounded-lg border border-gray-200 ">
						<Filter size={16} />
					</div>

					<button
						className="w-[250px] flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-[#28a745] text-white font-medium hover:opacity-90 transition"
						onClick={() => document.getElementById("addBns").showModal()}
					>
						<UserPlus size={16} />
						<span className="text-sm">Add New BNS</span>
					</button>
				</div>
			</div>

			{/* Table */}
			<div className="overflow-x-auto">
				<table className="table w-full">
					<thead>
						<tr className=" text-gray-500 font-light">
							<th>Name</th>
							<th>Barangay</th>
							<th>Status</th>

							<th className="text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{paginatedUsers.map((user, index) => (
							<tr key={index} className="hover:bg-gray-50 text-sm">
								<td className="font-medium text-gray-800">
									{user.firstname} {" "} {user.lastname}
								</td>
								<td>{user.barangay}</td>
								<td>
									<span
										className={`badge border-none ${
											user.status === "Active"
												? "badge-success bg-green-100 text-green-700"
												: "badge-neutral bg-gray-300 text-gray-600"
										}`}
									>
										{user.status}
									</span>
								</td>

								<td className="text-right">
									<button
										className="btn btn-ghost btn-xs border-none text-gray-500 hover:bg-[#28a745] hover:text-white"
										onClick={() => {
											setViewing(true);
											setUserDatas({ ...user });
										}}
									>
										View
									</button>
									<button
										className="btn btn-ghost btn-xs border-none text-gray-500  hover:bg-[#28a745] hover:text-white"
										onClick={() => {
											setEditing(true);
											setUserDatas({ ...user });
										}}
									>
										Edit
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			<div className="flex justify-end items-center gap-3 mt-4">
				<button
					className="btn btn-sm bg-[#28a745] border-none text-white shadow-none"
					onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
					disabled={page === 1}
				>
					Previous
				</button>
				<span className="text-sm">
					Page {page} of {totalPages}
				</span>
				<button
					className="btn btn-sm bg-[#28a745] border-none text-white shadow-none"
					onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
					disabled={page === totalPages}
				>
					Next
				</button>
			</div>
			<NewBnsModal id={"addBns"} />
		</div>
	);
}
