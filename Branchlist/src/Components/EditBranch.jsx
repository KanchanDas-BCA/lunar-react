import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBranch = () => {
  const { id } = useParams(); // Get branch ID from the URL
  const navigate = useNavigate();
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API URLs
  const fetchUrl = `https://office.lunarit.com.np/api/Branch/Get/${id}`; // Replace with the actual API URL for fetching a single branch
  const updateUrl = `https://office.lunarit.com.np/api/Branch/Update`; // Replace with the actual API URL for updating branch details

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const response = await fetch(fetchUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMSIsIkRpc3BsYXlOYW1lIjoiQWRtaW4gQWRtaW4iLCJPZmZpY2VJZCI6IjEiLCJCcmFuY2hJZCI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiIiwic3ViIjoiMSIsImV4cCI6MTczNDU4NzU0NiwiaXNzIjoiaHR0cHM6Ly9sdW5hcml0LmNvbS5ucCIsImF1ZCI6Ikx1bmFyQ2xpZW50In0.8bcSID_aI3RYTQvTMDP2m3m8puZeqPbiUxvqgATc5pI`, // Add your authorization token
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch branch details");
        }

        const data = await response.json();
        setBranch(data); // Set the branch details in state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBranch();
  }, [fetchUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBranch((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(updateUrl, {
        method: "PUT", // Adjust the HTTP method if needed
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer `, // Add your authorization token
        },
        body: JSON.stringify(branch), // Send the updated branch details
      });

      if (!response.ok) {
        throw new Error("Failed to update branch details");
      }

      alert("Branch details updated successfully!");
      navigate("/"); // Redirect to the branch list page after successful update
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Edit Branch Details
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="branchaddress">
              Branch Address
            </label>
            <input
              type="text"
              id="branchaddress"
              name="branchaddress"
              value={branch.branchaddress || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="branchphoneprimary">
              Primary Phone
            </label>
            <input
              type="text"
              id="branchphoneprimary"
              name="branchphoneprimary"
              value={branch.branchphoneprimary || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="branchPhoneSecondary">
              Secondary Phone
            </label>
            <input
              type="text"
              id="branchPhoneSecondary"
              name="branchPhoneSecondary"
              value={branch.branchPhoneSecondary || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="isActive">
              Is Active
            </label>
            <select
              id="isActive"
              name="IsActive"
              value={branch.IsActive ? "true" : "false"}
              onChange={(e) =>
                setBranch((prev) => ({ ...prev, IsActive: e.target.value === "true" }))
              }
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2" htmlFor="OfficeName">
              Office Name
            </label>
            <input
              type="text"
              id="OfficeName"
              name="OfficeName"
              value={branch.OfficeName || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBranch;
