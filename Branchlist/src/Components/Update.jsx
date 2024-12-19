import React, { useState } from 'react';

const UpdateData = () => {
  const [data, setData] = useState({ title: '', body: '' });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const updateData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT', // Use PUT or PATCH based on the API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update data');
      }

      const result = await response.json();
      setResponse(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Update Data</h2>

      {/* Input Fields */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Title:</label>
        <input
          type="text"
          name="title"
          value={data.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Body:</label>
        <textarea
          name="body"
          value={data.body}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Update Button */}
      <button
        onClick={updateData}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Update
      </button>

      {/* Loading, Error, and Response Messages */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="font-bold text-lg">Response:</h2>
          <pre className="text-sm">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UpdateData;
