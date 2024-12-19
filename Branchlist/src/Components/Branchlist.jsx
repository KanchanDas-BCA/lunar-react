import React, { useState, useEffect } from "react";

const Branchlist = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API URL for office management system
  const apiUrl = "https://office.lunarit.com.np/api/Branch/GetList"; // Replace with the actual API URL

  useEffect(() => {
    // Fetch the data from the API
    const fetchBranches = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add your authorization token if needed
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMSIsIkRpc3BsYXlOYW1lIjoiQWRtaW4gQWRtaW4iLCJPZmZpY2VJZCI6IjEiLCJCcmFuY2hJZCI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiIiwic3ViIjoiMSIsImV4cCI6MTczNDU4NzU0NiwiaXNzIjoiaHR0cHM6Ly9sdW5hcml0LmNvbS5ucCIsImF1ZCI6Ikx1bmFyQ2xpZW50In0.8bcSID_aI3RYTQvTMDP2m3m8puZeqPbiUxvqgATc5pI`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setBranches(data); // Assuming the response is an array of branch objects
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [apiUrl]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Branch Details
        </h1>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 text-left">Branch ID</th>
              <th className="py-2 px-4 text-left">Branch Address</th>
              <th className="py-2 px-4 text-left">Primary Phone</th>
              <th className="py-2 px-4 text-left">Secondary Phone</th>
              <th className="py-2 px-4 text-left">Is Active</th>
              <th className="py-2 px-4 text-left">Office Name</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
           <tr key={`${branch.branchid}-${branch.OfficeName}`} className="border-t">
                <td className="py-2 px-4">{branch.branchid}</td>
                <td className="py-2 px-4">{branch.branchaddress}</td>
                <td className="py-2 px-4">{branch.branchphoneprimary}</td>
                <td className="py-2 px-4">{branch.branchPhoneSecondary || "N/A"}</td>
                <td className="py-2 px-4">{branch.IsActive ? "Yes" : "No"}</td>
                <td className="py-2 px-4">{branch.OfficeName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Branchlist;
