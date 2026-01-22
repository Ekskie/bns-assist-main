"use client";
import { useState } from "react";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    fullName: "Maria Andres",
    email: "maria.andres@example.gov.ph",
    position: "Municipal Nutritionist",
    phone: "+63 912 345 6789",
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
      <h2 className="text-2xl font-bold text-gray-800 mb-1">Profile Information</h2>
      <p className="text-sm text-gray-500 mb-6">
        Update your account profile information.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 block w-full rounded border border-gray-300 text-sm p-2"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded border border-gray-300 text-sm p-2"
          />
        </div>

        {/* Position */}
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="mt-1 block w-full rounded border border-gray-300 text-sm p-2"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
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
