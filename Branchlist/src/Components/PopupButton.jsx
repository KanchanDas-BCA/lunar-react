import React, { useState } from "react";

const PopupButton = () => {
  // State to toggle popup visibility
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the popup
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Button to open the popup */}
      <button
        onClick={togglePopup}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Open Popup
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-900 bg-opacity-50">
          <div className="bg-white w-96 p-6 rounded shadow-md relative">
            {/* Close Button */}
            <button
              onClick={togglePopup}
              className="absolute top-2 right-2 text-gray-700 hover:text-red-500"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            {/* Popup Content */}
            <h2 className="text-2xl font-bold mb-4">Popup Title</h2>
            <p className="text-gray-600 mb-4">
              This is the content inside the popup.
            </p>
            <button
              onClick={togglePopup}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Close Popup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupButton;
